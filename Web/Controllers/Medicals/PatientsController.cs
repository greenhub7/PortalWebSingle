namespace Web.Controllers
{
    using CommonTasks.Data;
    using Domain;
    using Helpers;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Identity;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.Mvc.Rendering;
    using Microsoft.EntityFrameworkCore;
    using Models;
    using Persistence;
    using PsTools;
    using System;
    using System.Collections.Generic;
    using System.Data;
    using System.Linq;
    using System.Security.Claims;
    using System.Threading.Tasks;
    using Web.Services;

    [Authorize(Roles = "Medico,Secretaria")]
    public class PatientsController : PsBaseController
    {
        protected int AuthorId;



        public PatientsController(DataContext db, UserManager<ApplicationUser> userManager, IHttpContextAccessor httpContextAccessor) : base(db, userManager, httpContextAccessor)
        {
            var user = Db.Users.FirstOrDefault(p => p.Email == HttpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.Email));
            AuthorId = user.AuthorId;

        }

        [HttpGet]
        public async Task<JsonResult> GetPatientInfo(int id)
        {
            var pp = new string[1];
            var person = await PatientService.GetPerson(await GetAuthorId(), id);
            if (person == null) return Json(pp);
            pp[0] = person.FullName;
            return Json(pp);
        }



        #region PatientController

        public ActionResult MedHist()
        {
            return View("~/Views/Medicals/Patients/MedHist.cshtml");
        }

        public async Task<ActionResult> Index(string filter = "", int? ownerId = null)
        {
            var currentUser = await GetCurrentUser(); 

            var patientListViewModel = new PatientListViewModel
            {
                SearchTearm = filter,
                IsTenantRoot = currentUser.IsTenantRoot,
                IsUserType7 = currentUser.UserTypeId == 7
            };

            
            var patients = await PatientService.GetPatientsForIndex(
                currentUser.AuthorId,
                filter,
                ownerId,
                currentUser.IsTenantRoot,
                currentUser.UserTypeId == 7,
                currentUser.Author.TenantId
            );

            patientListViewModel.Patients = patients;

            
            if (currentUser.IsTenantRoot || currentUser.UserTypeId == 7)
            {
                var owners = await Db.Authors
                    .Where(a => (currentUser.IsTenantRoot ? true : a.TenantId == currentUser.Author.TenantId) && a.StatusId == 1)
                    .OrderBy(a => a.Name)
                    .ToListAsync();

                ViewBag.OwnerId = ownerId;
                ViewBag.Owners = owners.Select(a => new SelectListItem
                {
                    Value = a.AuthorId.ToString(),
                    Text = a.Name,
                    Selected = ownerId == a.AuthorId
                }).ToList();
            }

            return View("~/Views/Medicals/Patients/Index.cshtml", patientListViewModel);
        }

        [HttpGet]
        public async Task<ActionResult> AddOrUpdate(int id = 0)
        {
            try
            {
                var currentUser = await GetCurrentUser();  
                 
                var model = await PatientService.GetPatientForAddOrUpdate(
                    id,
                    currentUser.AuthorId,
                    currentUser.IsTenantRoot,
                    currentUser.UserTypeId == 7,
                    currentUser.Author?.TenantId);

                if (model == null && id != 0)
                    return View("Error");

             

                PopulateViewBags(model, currentUser);
                return View("~/Views/Medicals/Patients/AddOrUpdate.cshtml", model);

            }
            catch (Exception ex)
            {
                return View("Error");
            }
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> AddOrUpdate(PatientView model)
        {
            try
            {
                var currentUser = await GetCurrentUser();
                if (ModelState.IsValid)
                {
                    var authorId = await GetAuthorId();

                        if (currentUser.UserTypeId == 7 && model.PersonId == 0 && model.AuthorId == 0)
                    {
                        ModelState.AddModelError("AuthorId", "Debe seleccionar un Centro/Doctor para crear el paciente.");
                  
                        PopulateViewBags(model, currentUser);
                        return View("~/Views/Medicals/Patients/AddOrUpdate.cshtml", model);
                    }

                         if (model.PersonId > 0 && model.PatientId > 0)
                    {
                        var canEdit = await PatientService.GetPatientForAddOrUpdate(
                            model.PatientId,
                            authorId,
                            currentUser.IsTenantRoot,
                            currentUser.UserTypeId == 7,
                            currentUser.Author?.TenantId);

                        if (canEdit == null)
                        {
                            ModelState.AddModelError("", "No tiene permisos para editar este paciente.");
                            
                            PopulateViewBags(model, currentUser);
                            return View("~/Views/Medicals/Patients/AddOrUpdate.cshtml", model);
                        }
                    }

                    if ((currentUser.IsTenantRoot || currentUser.UserTypeId == 7) && model.PersonId == 0)
                    {
                        authorId = model.AuthorId > 0 ? model.AuthorId : authorId;
                    }

                    var result = await PatientService.SavePatient(model, GetUserId(), authorId);
                    if (result.Success)
                    { 
                        PatientService.InvalidatePatientCache(authorId, result.PatientId);
                         
                        if (currentUser.UserTypeId == 7)
                        {
                            return RedirectToAction("Index");
                        }
                        return RedirectToAction("Details", new { id = result.PatientId });
                    }
                    ModelState.AddModelError("", result.Message);
                }

             
                PopulateViewBags(model, currentUser);
                return View("~/Views/Medicals/Patients/AddOrUpdate.cshtml", model);

            }
            catch (Exception ex)
            {
                
                ModelState.AddModelError("", "Ha ocurrido un error al procesar la solicitud.");
                var user = await GetCurrentUser();
                PopulateViewBags(model, user);
                return View("~/Views/Medicals/Patients/AddOrUpdate.cshtml", model);
            }
        }
        private void PopulateViewBags(PatientView model = null, ApplicationUser currentUser = null)
        {
            
            ViewBag.Genders = new SelectList(
                Db.Genders.OrderBy(p => p.Name).ToList(),
                "GenderId",
                "Name",
                model?.GenderId
            );

            ViewBag.MaritalSituations = new SelectList(
                Db.MaritalSituations.OrderBy(p => p.Name).ToList(),
                "MaritalSituationId",
                "Name",
                model?.MaritalSituationId
            );

            ViewBag.SchoolLevels = new SelectList(
                Db.SchoolLevels.OrderBy(p => p.Name).ToList(),
                "SchoolLevelId",
                "Name",
                model?.SchoolLevelId
            );

            ViewBag.BloodTypes = new SelectList(
                Db.BloodTypes.OrderBy(p => p.Name).ToList(),
                "BloodTypeId",
                "Name",
                model?.BloodTypeId
            );

            
            ViewBag.CountryId = Db.Countries.OrderBy(p => p.Name)
                .ToSelectListItems(p => p.Name, p => p.CountryId.ToString(),
                    l => l.CountryId == (model?.CountryId ?? 0));

            ViewBag.InsuranceId = Db.Insurances.Where(p => !p.ForSpecial).OrderBy(p => p.Name)
                .ToSelectListItems(p => p.Name, p => p.InsuranceId.ToString(),
                    l => l.InsuranceId == (model?.InsuranceId ?? 0));

            ViewBag.OcupationId = Db.Ocupations.OrderBy(p => p.Name)
                .ToSelectListItems(p => p.Name, p => p.OcupationId.ToString(),
                    l => l.OcupationId == (model?.OcupationId ?? 0));

            ViewBag.ReligionId = Db.Religions.OrderBy(p => p.Name)
                .ToSelectListItems(p => p.Name, p => p.ReligionId.ToString(),
                    l => l.ReligionId == (model?.ReligionId ?? 0));

            
            if (currentUser != null && (currentUser.IsTenantRoot || currentUser.UserTypeId == 7))
            {
                var authorsQuery = Db.Authors.Where(a => a.StatusId == 1);

                
                if (!currentUser.IsTenantRoot)
                {
                    var tenantId = currentUser.Author.TenantId;
                    authorsQuery = authorsQuery.Where(a => a.TenantId == tenantId);
                }

                var authorsList = authorsQuery.OrderBy(a => a.Name).ToList();
                var selectListItems = new List<SelectListItem>
                {
                    new SelectListItem
                    {
                        Value = "0",
                        Text = "-- Seleccione un Cliente --",
                        Selected = (model == null || model.AuthorId == 0)
                    }
                };

                selectListItems.AddRange(authorsList.Select(a => new SelectListItem
                {
                    Value = a.AuthorId.ToString(),
                    Text = a.Name,
                    Selected = (model != null && model.AuthorId == a.AuthorId)
                }));

                ViewBag.AuthorId = selectListItems;
            }
        }

        public async Task<ActionResult> Details(int id)
        {
            var authorId = await GetAuthorId();
            var currentUser = await GetCurrentUser(); 

            var model = await PatientService.GetPatientView(
                authorId,
                id,
                personId: 0,
                isTenantRoot: currentUser.IsTenantRoot,
                isUserType7: currentUser.UserTypeId == 7,
                tenantId: currentUser.Author.TenantId
            );

            if (model == null)
                return View("Error");

            
            
            
            

            
            model.Alerts = new List<Application.Models.PatientAlert>();





            PopulateViewBags(model);

            return View("~/Views/Medicals/Patients/Details.cshtml", model);
        }
        private string GetASADescription(int asaLevel)
        {
            return asaLevel switch
            {
                1 => "Paciente sano normal",
                2 => "Paciente con enfermedad sistémica leve",
                3 => "Paciente con enfermedad sistémica grave",
                4 => "Paciente con enfermedad sistémica grave que es una amenaza constante para la vida",
                5 => "Paciente moribundo que no se espera que sobreviva sin la operación",
                6 => "Paciente declarado con muerte cerebral cuyos órganos están siendo extraídos para donación",
                _ => "No especificado"
            };
        }
        
        public ActionResult Create()
        {
            ViewBag.CountryId = Db.Countries.OrderBy(p => p.CountryId)
                .ToSelectListItems(p => p.Name, p => p.CountryId.ToString());
            ViewBag.GenderId = Db.Genders.OrderBy(p => p.GenderId)
                .ToSelectListItems(p => p.Name, p => p.GenderId.ToString());
            ViewBag.MaritalSituationId = Db.MaritalSituations
                .ToSelectListItems(p => p.Name, p => p.MaritalSituationId.ToString());
            ViewBag.OcupationId = Db.Ocupations
                .ToSelectListItems(p => p.Name, p => p.OcupationId.ToString());
            ViewBag.ReligionId = Db.Religions
                .ToSelectListItems(p => p.Name, p => p.ReligionId.ToString());
            ViewBag.BloodTypeId = Db.BloodTypes.OrderBy(p => p.BloodTypeId)
                .ToSelectListItems(p => p.Name, p => p.BloodTypeId.ToString());
            ViewBag.InsuranceId = Db.Insurances.Where(p => !p.ForSpecial)
                .ToSelectListItems(p => p.Name, p => p.InsuranceId.ToString());
            ViewBag.SchoolLevelId = Db.SchoolLevels
                .ToSelectListItems(p => p.Name, p => p.SchoolLevelId.ToString());


            var view = new PatientView() { AuthorId = AuthorId };

            return View("~/Views/Medicals/Patients/Create.cshtml", view);

        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Create(PatientView view)
        {
            var userId = GetUserId();


            if (view.Tel != null)
                view.Tel = Strings.RemoveCharacters(view.Tel);

            if (view.Cel != null)
                view.Cel = Strings.RemoveCharacters(view.Cel);

            if (view.CompanionRnc != null)
                view.CompanionRnc = Strings.RemoveCharacters(view.CompanionRnc);

            if (view.Rnc != null)
                view.Rnc = Strings.RemoveCharacters(view.Rnc);
            else
            {
                if (string.IsNullOrEmpty(view.Companion) && view.ConfirmationSave == false)
                {
                    view.ConfirmationSave = true;
                    ModelState.AddModelError(string.Empty, "Si no ha digitado una cedula, debe digital el nombre de un Tutor y en caso de estar facturando a una ARS, tambien debe digitar la cedula del tutor EN EL CAMPO CEDULA TUTOR... Presione guardar nuevamente si desea ignorar ");
                }
                if (view.InsuranceId > 1 && string.IsNullOrEmpty(view.CompanionRnc) && view.ConfirmationSave == false)
                {
                    view.ConfirmationSave = true;
                    ModelState.AddModelError(string.Empty, "Si ha seleccionado un Seguro o ARS, debe digitar la cedula del tutor EN EL CAMPO CEDULA TUTOR o la Cedula del paciente... Presione guardar nuevamente si desea ignorar ");
                }
            }

            if (!string.IsNullOrEmpty(view.Rnc) && !view.ConfirmationSave)
            {
                var pat = Db.People.Any(p => p.Rnc.ToUpper() == view.Rnc.ToUpper()
                                                && p.AuthorId == AuthorId && p.StatusId == 1);

                if (pat)
                {
                    ModelState.AddModelError(string.Empty, "Esta cedula ya esta registrada... Presione guardar nuevamente para ignorar");
                    view.ConfirmationSave = true;
                }
            }

            if (string.IsNullOrEmpty(view.Email) == false && view.ConfirmationSave == false)
            {
                var pat = Db.People.Any(p => p.Email.ToUpper() == view.Email.ToUpper()
                                                && p.AuthorId == AuthorId && p.StatusId == 1);

                if (pat)
                {
                    ModelState.AddModelError(string.Empty, "Este Email ya esta registrado... Presione guardar nuevamente para ignorar");
                    view.ConfirmationSave = true;
                }
            }

            if (string.IsNullOrEmpty(view.Nss) == false && view.ConfirmationSave == false)
            {
                var pat = Db.Patients.Any(p => p.Nss.ToUpper() == (view.Nss.ToUpper())
                                                 && p.Person.AuthorId == AuthorId && p.Person.StatusId == 1);

                if (pat)
                {
                    ModelState.AddModelError(string.Empty, "Esta Razon Social ya esta registrada... Presione guardar nuevamente para ignorar");
                    view.ConfirmationSave = true;
                }
            }

            if (string.IsNullOrEmpty(view.InsuranceNumber) == false && view.ConfirmationSave == false)
            {
                var pat = Db.Patients.Any(p => p.InsuranceNumber.ToUpper() == (view.InsuranceNumber.ToUpper())
                                                && p.Person.AuthorId == AuthorId && p.Person.StatusId == 1);

                if (pat)
                {
                    ModelState.AddModelError(string.Empty, "Este Numero de Seguro ya esta registrado.... Presione guardar nuevamente para ignorar");
                    view.ConfirmationSave = true;
                }
            }

            if (!string.IsNullOrEmpty(view.BornDateStr))
                view.BornDate = Dates.ConverToDate(view.BornDateStr, "es-DO");
            if (string.IsNullOrEmpty(view.Name) || string.IsNullOrEmpty(view.LastName))
                ModelState.AddModelError(string.Empty, "El Nombre y el Apellido son requeridos");

            if (ModelState.IsValid)
            {
                var pic = string.Empty;

              
                var patient = await PatientService.GeneratePerson(view, userId, AuthorId, pic);

                return RedirectToAction("Details", new { id = patient.PatientId });
            }

            ViewBag.CountryId = Db.Countries.OrderBy(p => p.Name)
                .ToSelectListItems(p => p.Name, p => p.CountryId.ToString(), l => l.CountryId == view.CountryId);
            ViewBag.GenderId = Db.Genders
                .ToSelectListItems(p => p.Name, p => p.GenderId.ToString(), l => l.GenderId == view.GenderId);
            ViewBag.MaritalSituationId = Db.MaritalSituations
                .ToSelectListItems(p => p.Name, p => p.MaritalSituationId.ToString(), l => l.MaritalSituationId == view.MaritalSituationId);
            ViewBag.OcupationId = Db.Ocupations
                .ToSelectListItems(p => p.Name, p => p.OcupationId.ToString(), l => l.OcupationId == view.OcupationId);
            ViewBag.ReligionId = Db.Religions.OrderBy(p => p.Name)
                .ToSelectListItems(p => p.Name, p => p.ReligionId.ToString(), l => l.ReligionId == view.ReligionId);
            ViewBag.BloodTypeId = Db.BloodTypes
                .ToSelectListItems(p => p.Name, p => p.BloodTypeId.ToString(), l => l.BloodTypeId == view.BloodTypeId);
            ViewBag.InsuranceId = Db.Insurances.Where(p => !p.ForSpecial).OrderBy(p => p.Name)
                .ToSelectListItems(p => p.Name, p => p.InsuranceId.ToString(), l => l.InsuranceId == view.InsuranceId);
            ViewBag.SchoolLevelId = Db.SchoolLevels.OrderBy(p => p.Name)
                .ToSelectListItems(p => p.Name, p => p.SchoolLevelId.ToString(), l => l.SchoolLevelId == view.SchoolLevelId);

            return View("~/Views/Medicals/Patients/Create.cshtml", view);

        }

    

     

        #endregion



    }
}
