using CommonTasks.Data;
using Domain;
using Domain.Enums;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using Persistence;
using PsTools;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Web.Helpers;
using Web.Models;

namespace Web.Services
{
    public class PatientService
    {
        private readonly DataContext Db;
        private readonly IMemoryCache _cache;
        private const int CacheExpirationMinutes = 30;

        public PatientService(DataContext db, IMemoryCache cache)
        {
            Db = db;
            _cache = cache;
        }

        #region Cache Helper Methods

        
        
        
        private string GetPatientsListCacheKey(int authorId, string filter, int? ownerId, Guid? tenantId)
        {
            return $"Patients_List_{authorId}_{filter ?? "all"}_{ownerId?.ToString() ?? "all"}_{tenantId?.ToString() ?? "none"}";
        }

        
        
        
        private string GetPatientCacheKey(int patientId, int authorId, Guid? tenantId)
        {
            return $"Patient_{patientId}_{authorId}_{tenantId?.ToString() ?? "none"}";
        }

        
        
        
        private string GetAuthorCachePattern(int authorId)
        {
            return $"Patients_List_{authorId}_";
        }

        
        
        
        public void InvalidatePatientCache(int authorId, int? patientId = null)
        {
            
            if (patientId.HasValue)
            {
                
                var keyPattern = $"Patient_{patientId.Value}_{authorId}_";
                
                
                _cache.Remove(keyPattern + "none");
            }

            
            
            
            var masterKey = $"PatientsCacheVersion_{authorId}";
            _cache.Remove(masterKey);
        }

        
        
        
        private string GetCacheVersion(int authorId)
        {
            var masterKey = $"PatientsCacheVersion_{authorId}";
            var version = _cache.GetOrCreate(masterKey, entry =>
            {
                entry.SlidingExpiration = TimeSpan.FromDays(1);
                return Guid.NewGuid().ToString();
            });
            return version;
        }

        
        
        
        private string GetVersionedCacheKey(string baseKey, int authorId)
        {
            var version = GetCacheVersion(authorId);
            return $"{baseKey}_v{version}";
        }

        #endregion

        public async Task<PatientView> GetPatientForAddOrUpdate(int id, int authorId, bool isTenantRoot = false, bool isUserType7 = false, Guid? tenantId = null)
        {
            if (id == 0)
            {
                
                
                var defaultAuthorId = (isTenantRoot || isUserType7) ? 0 : authorId;
                return new PatientView { AuthorId = defaultAuthorId };
            }

            
            var query = Db.Patients
                .Include(p => p.Person).ThenInclude(p => p.User).ThenInclude(u => u.Author)
                .Where(p => p.PatientId == id);

            
            if (!isTenantRoot)
            {
                
                if (isUserType7 && tenantId.HasValue)
                {
                    query = query.Where(p => p.Person.User.Author.TenantId == tenantId.Value);
                }
                else
                {
                    
                    query = query.Where(p => p.Person.AuthorId == authorId);
                }
            }

            var patient = await query.FirstOrDefaultAsync();

            if (patient == null)
                return null;

            return ToView(patient.Person, patient );
        }
    
        public async Task<(bool Success, string Message, int PatientId)> SavePatient(PatientView model, string userId, int authorId)
        {
            try
            {
                if (model.PatientId == 0)
                {
                    var patient = await GeneratePerson(model, userId, authorId, model.Imagen);
                    return (true, "Paciente creado exitosamente", patient.PatientId);
                }
                else
                {
                    var person = await Db.People.FindAsync(model.PersonId);
                    var patient = await Db.Patients.FindAsync(model.PatientId);

                    if (person == null || patient == null)
                        return (false, "Paciente no encontrado", 0);

                    UpdatePersonAndPatient(person, patient, model, userId);
                    await Db.SaveChangesAsync();

                    return (true, "Paciente actualizado exitosamente", patient.PatientId);
                }
            }
            catch (Exception ex)
            {
                
                return (false, "Error al guardar el paciente", 0);
            }
        }
        private void UpdatePersonAndPatient(Person person, Patient patient, PatientView model, string userId)
        {
            
            person.Name = model.Name;
            person.LastName = model.LastName;
            person.Rnc = CleanRnc(model.Rnc);
            person.GenderId = model.GenderId;
            person.EthnicityId = model.EthnicityId;
            person.MaritalSituationId = model.MaritalSituationId;
            person.SchoolLevelId = model.SchoolLevelId;
            person.YearsInTheGreatestLevel = model.YearsInTheGreatestLevel;
            person.LiveAlone = model.LiveAlone;
            person.Tel = CleanPhoneNumber(model.Tel);
            person.Cel = CleanPhoneNumber(model.Cel);
            person.Email = model.Email;
            person.Address = model.Address;
            person.UserUpdateId = userId;
            person.BornDate = !string.IsNullOrEmpty(model.BornDateStr) ?
                Dates.ConverToDate(model.BornDateStr, "es-DO") : null;

            patient.BloodTypeId = model.BloodTypeId;
            patient.InsuranceId = model.InsuranceId;
            patient.InsuranceNumber = model.InsuranceNumber;
            patient.Nss = model.Nss;
            patient.Age = model.Age;
            patient.CompanionRnc = CleanRnc(model.CompanionRnc);
            patient.Companion = model.Companion;
        }

        private string CleanRnc(string rnc)
        {
            if (string.IsNullOrEmpty(rnc))
                return null;
            return rnc.Replace("-", "").Replace(" ", "");
        }

        private string CleanPhoneNumber(string phone)
        {
            if (string.IsNullOrEmpty(phone))
                return null;
            return phone.Replace("(", "").Replace(")", "").Replace("-", "").Replace(" ", "");
        }
        public static string RemoveCharacters(string param)
        {
            if (string.IsNullOrEmpty(param))
                return string.Empty;
            param = param.Replace("(", "");
            param = param.Replace(")", "");
            param = param.Replace("-", "");
            param = param.Replace(" ", "");
            return param;
        }

        public async Task<bool> RncExists(int authorId, string rnc)
        {
            return await Db.People.AnyAsync(p => p.Rnc.ToUpper() == rnc.ToUpper()
                                               && p.AuthorId == authorId && p.StatusId == 1);
        }

        public async Task<bool> EmailExists(int authorId, string email)
        {
            return await Db.People.AnyAsync(p => p.Email.ToUpper() == email.ToUpper()
                                               && p.AuthorId == authorId && p.StatusId == 1);
        }

        public async Task<bool> TelExists(int authorId, string tel)
        {
            return await Db.People.AnyAsync(p => p.Tel.ToUpper() == tel.ToUpper()
                                               && p.AuthorId == authorId && p.StatusId == 1);
        }

        public async Task<bool> CelExists(int authorId, string cel)
        {
            return await Db.People.AnyAsync(p => p.Cel.ToUpper() == cel.ToUpper()
                                               && p.AuthorId == authorId && p.StatusId == 1);
        }

        public async Task<Patient> GetPatientUnTrackable(int authorId, int patientId)
        {
            return await Db.Patients.Include(p => p.Person)
                .ThenInclude(p => p.Gender)
                .AsNoTracking()
              .FirstOrDefaultAsync(p => p.PersonId == patientId && p.Person.AuthorId == authorId);

        }

        public async Task<Patient> GetPatient(int authorId, int patientId, bool isTenantRoot = false, bool isUserType7 = false, Guid? tenantId = null)
        {
            
            var cacheKey = GetPatientCacheKey(patientId, authorId, tenantId);
            var versionedKey = GetVersionedCacheKey(cacheKey, authorId);

            
            return await _cache.GetOrCreateAsync(versionedKey, async entry =>
            {
                
                entry.SlidingExpiration = TimeSpan.FromMinutes(CacheExpirationMinutes);

                var query = Db.Patients
                     .Include(p => p.Person).ThenInclude(p => p.User).ThenInclude(u => u.Author)
                     .Include(p => p.Person).ThenInclude(p => p.Gender)
                     .Include(p => p.Person).ThenInclude(p => p.Country)
                     .Include(p => p.Person).ThenInclude(p => p.MaritalSituation)
                     .Include(p => p.Person).ThenInclude(p => p.Ocupation)
                     .Include(p => p.Person).ThenInclude(p => p.Religion)
                     .Include(p => p.Person).ThenInclude(p => p.SchoolLevel)
                     .Include(p => p.Insurance)
                     .Include(p => p.BloodType)    
                                         .Where(p => p.PatientId == patientId);

                
                if (!isTenantRoot)
                {
                    
                    if (isUserType7 && tenantId.HasValue)
                    {
                        query = query.Where(p => p.Person.User.Author.TenantId == tenantId.Value);
                    }
                    else
                    {
                        
                        query = query.Where(p => p.Person.AuthorId == authorId);
                    }
                }

                return await query.FirstOrDefaultAsync();
            });
        }

        public async Task<Person> GetPerson(int authorId, int personId, bool isTenantRoot = false, bool isUserType7 = false, Guid? tenantId = null)
        {
            var query = Db.People
                .Include(p => p.Patients)
                .Include(p => p.Gender)
                .Include(p => p.User).ThenInclude(u => u.Author)
                .Where(p => p.PersonId == personId);

            
            if (!isTenantRoot)
            {
                
                if (isUserType7 && tenantId.HasValue)
                {
                    query = query.Where(p => p.User.Author.TenantId == tenantId.Value);
                }
                else
                {
                    
                    query = query.Where(p => p.AuthorId == authorId);
                }
            }

            return await query.FirstOrDefaultAsync();
        }

        public async Task<PatientView> GetPatientView(int authorId, int patientId, int personId = 0, bool isTenantRoot = false, bool isUserType7 = false, Guid? tenantId = null)
        {
            Patient patient;
            Person person;
            if (patientId == 0 && personId == 0)
            {
                var newview = new PatientView() { AuthorId = authorId };
                return newview;
            }
            else if (patientId != 0)
            {
                patient = await GetPatient(authorId, patientId, isTenantRoot, isUserType7, tenantId);
                if (patient == null)
                    return null;
                person = patient.Person;
            }
            else
            {
                person = await GetPerson(authorId, personId, isTenantRoot, isUserType7, tenantId);
                if (person == null)
                    return null;
                patient = person.Patients.FirstOrDefault();
            }

            return ToView(person, patient );
        }

        public async Task<PatientView> GetPatientViewFromPerson(int authorId, int personId, bool isTenantRoot = false, bool isUserType7 = false, Guid? tenantId = null)
        {
            Patient patient;
            Person person;
            if (personId == 0)
            {
                var newview = new PatientView() { AuthorId = authorId };
                return newview;
            }
            else
            {
                person = await GetPerson(authorId, personId, isTenantRoot, isUserType7, tenantId);
                if (person == null)
                    return null;
                patient = person.Patients.FirstOrDefault();
            }

            return ToView(person, patient );
        }

        public async Task<Patient> GeneratePerson(PatientView view, string userId, int authorId, string pic)
        {

            view.Tel = RemoveCharacters(view.Tel);
            view.Cel = RemoveCharacters(view.Cel);
            view.CompanionRnc = RemoveCharacters(view.CompanionRnc);
            view.Rnc = RemoveCharacters(view.Rnc);
            if (view.GenderId == 0)
                view.GenderId = 1;
            if (view.CountryId == 0)
                view.CountryId = 1;
            if (view.BloodTypeId == 0)
                view.BloodTypeId = 1;
            if (view.InsuranceId == 0)
                view.InsuranceId = 1;
            if (view.SchoolLevelId == 0)
                view.SchoolLevelId = 1;
            if (view.ReligionId == 0)
                view.ReligionId = 1;
            if (view.OcupationId == 0)
                view.OcupationId = 1;
            if (view.MaritalSituationId == 0)
                view.MaritalSituationId = 1;
            if (view.EthnicityId == 0)
                view.EthnicityId = Ethnicity.NoEspecificada;

            var person = ToViewHelpers.ToPeople(view);
            if (!string.IsNullOrEmpty(pic))
                person.Imagen = pic;
            person.AuthorId = authorId;
            var help = new MyAppHelper(Db);
            person.Record = help.GenerateRecord(authorId);
            var author = await Db.Authors.FindAsync(authorId);
            if (string.IsNullOrEmpty(view.Record2))
                person.Record2 = $"{author.Prefix}{person.Record:00000}";

            person.UserId = userId;
            person.StatusId = 1;
            person.CreationDate = DateTime.Now;
            Db.People.Add(person);
            await Db.SaveChangesAsync();

            var patient = ToViewHelpers.ToPatient(view);

            patient.PersonId = person.PersonId;

            Db.Patients.Add(patient);

            try
            {
                await Db.SaveChangesAsync();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }

            return patient;
        }

        public async Task<Patient> UpdateClient(PatientView view, string userId, int authorId)
        {
            view.Tel = RemoveCharacters(view.Tel);
            view.Cel = RemoveCharacters(view.Cel);
            view.Rnc = RemoveCharacters(view.Rnc);

            if (view.GenderId == 0)
                view.GenderId = 1;
            
            
            
            
            var oldPerson = await Db.People.Where(p => p.PersonId == view.PersonId).FirstOrDefaultAsync();
            oldPerson.UserUpdateId = userId;
            oldPerson.Name = view.Name;
            oldPerson.Email = view.Email;
            oldPerson.Address = view.Address;
            oldPerson.Cel = view.Cel;
            oldPerson.GenderId = view.GenderId;
            oldPerson.Tel = view.Tel;
            oldPerson.Rnc = view.Rnc;
            oldPerson.LastName = view.LastName;

            Db.People.Update(oldPerson);
            await Db.SaveChangesAsync();
            var patient = new Patient { PersonId = oldPerson.PersonId };

            try
            {
                await Db.SaveChangesAsync();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }

            return patient;
        }

        public async Task<Person> DeletePerson(int authorId, string userId, int personId)
        {
            var person = await GetPerson(authorId, personId);
            person.UserUpdateId = userId;
            person.StatusId = 2;
            Db.People.Update(person);
            await Db.SaveChangesAsync();
            return person;
        }

        public async Task<Patient> DeletePatient(int authorId, string userId, int patientId)
        {
            var patient = await GetPatientUnTrackable(authorId, patientId);
            var person = await GetPerson(authorId, patient.PersonId);
            person.UserUpdateId = userId;
            person.StatusId = 2;
            Db.People.Update(person);
            await Db.SaveChangesAsync();

            
            InvalidatePatientCache(authorId, patientId);

            return patient;
        }

        public async Task<List<Patient>> GetPatientsForIndex(int authorId, string filter = "", int? ownerId = null, bool isTenantRoot = false, bool isUserType7 = false, Guid? tenantId = null)
        {
            
            var cacheKey = GetPatientsListCacheKey(authorId, filter, ownerId, tenantId);
            var versionedKey = GetVersionedCacheKey(cacheKey, authorId);

            
            return await _cache.GetOrCreateAsync(versionedKey, async entry =>
            {
                
                entry.SlidingExpiration = TimeSpan.FromMinutes(CacheExpirationMinutes);

                
                IQueryable<Patient> query;

                if (isTenantRoot)
                {
                    
                    query = Db.Patients
                        .Include(p => p.Person).ThenInclude(p => p.Author)
                        .Where(p => p.Person.StatusId == 1);
                }
                else if (isUserType7 && tenantId.HasValue)
                {
                    
                    query = Db.Patients
                        .Include(p => p.Person).ThenInclude(p => p.Author)
                        .Where(p => p.Person.User.Author.TenantId == tenantId.Value && p.Person.StatusId == 1);
                }
                else
                {
                    
                    query = Db.Patients
                        .Include(p => p.Person).ThenInclude(p => p.Author)
                        .Where(p => p.Person.Author.AuthorId == authorId && p.Person.User.Author.TenantId == tenantId && p.Person.StatusId == 1);
                }

                
                if (!string.IsNullOrEmpty(filter))
                {
                    filter = filter.ToUpper();
                    query = query.Where(p =>
                        p.Person.Record2.ToUpper().Contains(filter) ||
                        p.Person.Name.ToUpper().Contains(filter) ||
                        p.Person.Cel.ToUpper().Contains(filter) ||
                        p.Person.Tel.ToUpper().Contains(filter) ||
                        p.InsuranceNumber.ToUpper().Contains(filter) ||
                        p.Person.Email.ToUpper().Contains(filter) ||
                        p.Person.LastName.ToUpper().Contains(filter) ||
                        p.Person.Rnc.ToUpper().Contains(filter)
                    );
                }

                if (ownerId.HasValue && ownerId.Value > 0)
                {
                    query = query.Where(p => p.Person.AuthorId == ownerId.Value);
                }

                return await query
                    .OrderByDescending(p => p.PatientId)
                    .Take(100)
                    .AsNoTracking()
                    .Select(p => new Patient
                    {
                        PatientId = p.PatientId,
                        PersonId = p.PersonId,
                        Person = new Person
                        {
                            PersonId = p.Person.PersonId,
                            Name = p.Person.Name,
                            LastName = p.Person.LastName,
                            Record = p.Person.Record,
                            Record2 = p.Person.Record2,
                            Rnc = p.Person.Rnc,
                            Email = p.Person.Email,
                            Tel = p.Person.Tel,
                            AuthorId = p.Person.AuthorId,
                            Author = new Author
                            {
                                Name = p.Person.Author.Name
                            }
                        }
                    })
                    .ToListAsync();
            });
        }

        public async Task<List<Patient>> GetPatientsUnTrackable(int authorId, string filter = "", int take = 999, bool isTenantRoot = false, bool isUserType7 = false, Guid? tenantId = null)
        {
            var model = Db.Patients
                   .Include(p => p.Person)
                   .Include(p => p.Person.UserUpdate)
                   .Include(p => p.Person.User).ThenInclude(p => p.Author)
                   .Include(p => p.Person.Author)
                   .Include(p => p.Person.Country)
                   .Include(p => p.Person.Gender)
                   .Include(p => p.Person.MaritalSituation)
                   .Include(p => p.Person.SchoolLevel)
                   .Include(p => p.Person.Ocupation)
                   .Include(p => p.Person.Religion)
                   .Include(p => p.Person.Status)
                   .Include(p => p.Insurance)
                   .Where(p => p.Person.StatusId == 1);

            
            if (isTenantRoot)
            {
                
                
            }
            else if (isUserType7 && tenantId.HasValue)
            {
                
                model = model.Where(p => p.Person.User.Author.TenantId == tenantId.Value);
            }
            else
            {
                
                model = model.Where(p => p.Person.AuthorId == authorId);
            }

            if (!string.IsNullOrEmpty(filter))
            {
                filter = filter.ToUpper();
                model = model.Where(p =>
                                         p.Person.Record2.ToUpper().Contains(filter) ||
                                         p.Person.Name.ToUpper().Contains(filter) ||
                                         p.Person.Email.ToUpper().Contains(filter) ||
                                         p.Person.Cel.ToUpper().Contains(filter) ||
                                         p.Person.Tel.ToUpper().Contains(filter) ||
                                         p.InsuranceNumber.ToUpper().Contains(filter) ||
                                         p.Person.LastName.ToUpper().Contains(filter) ||
                                         p.Person.Rnc.ToUpper().Contains(filter)
             );
            }
            return await model.OrderByDescending(p => p.PatientId).Take(take).AsNoTracking()
                   .ToListAsync();
        }

        public PatientView ToView(Person pview, Patient view )
        {
            if (pview == null) throw new ArgumentNullException(nameof(pview));
            if (view == null) throw new ArgumentNullException(nameof(view));
            
            var m = new PatientView();
            pview.Transfer(ref m, null, false);
            view.Transfer(ref m, "Conditions,Allergies", false);  
           
            m.FullName = pview.Name + " " + pview.LastName;
            m.Name = pview.Name;
            m.Address = pview.Address; 
         
            if (m.BornDate != null)
                m.BornDateStr = Dates.FormatedDateDoStr(m.BornDate);

            return m;
        }

    }
}