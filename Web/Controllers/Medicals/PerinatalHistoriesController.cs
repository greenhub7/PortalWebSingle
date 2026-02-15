using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;
using Domain;

namespace Web.Controllers
{
    public class PerinatalHistoriesController : Controller
    {
        private readonly DataContext _context;

        public PerinatalHistoriesController(DataContext context)
        {
            _context = context;
        }

        // GET: PerinatalHistories/Index?id=15570
        public async Task<IActionResult> Index(int? id)
        {
            if (!id.HasValue)
            {
                // Show all perinatal histories if no patient ID provided
                var allRecords = await _context.PerinatalHistoryRecords
                    .Include(p => p.Patient)
                        .ThenInclude(pt => pt.Person)
                    .OrderByDescending(p => p.CreatedDate)
                    .ToListAsync();
                
                return View(allRecords);
            }

            // Show perinatal histories for specific patient
            ViewBag.PatientId = id.Value;
            
            var patient = await _context.Patients
                .Include(p => p.Person)
                .FirstOrDefaultAsync(p => p.PatientId == id.Value);
            
            if (patient != null)
            {
                ViewBag.PatientName = $"{patient.Person.Name} {patient.Person.LastName}";
            }

            var records = await _context.PerinatalHistoryRecords
                .Include(p => p.Patient)
                    .ThenInclude(pt => pt.Person)
                .Include(p => p.CurrentPregnancy)
                .Include(p => p.ObstetricBackground)
                .Where(p => p.PatientId == id.Value)
                .OrderByDescending(p => p.CreatedDate)
                .ToListAsync();

            return View(records);
        }

        // GET: PerinatalHistories/Print/5
        public async Task<IActionResult> Print(int id)
        {
            var perinatalHistory = await _context.PerinatalHistoryRecords
                .Include(p => p.Patient)
                    .ThenInclude(p => p.Person)
                .Include(p => p.MedicalBackground)
                .Include(p => p.ObstetricBackground)
                .Include(p => p.CurrentPregnancy)
                .Include(p => p.PrenatalConsultations)
                .Include(p => p.BirthInformation)
                .Include(p => p.NewbornInformation)
                .Include(p => p.PostpartumInformation)
                .Include(p => p.PuerperiumInformation)
                .Include(p => p.MorbidityInformation)
                .Include(p => p.NearMissVariables)
                .Include(p => p.ContraceptionInformation)
                .Include(p => p.MaternalDischargeInformation)
                .FirstOrDefaultAsync(p => p.Id == id);

            if (perinatalHistory == null)
            {
                return NotFound();
            }

            ViewBag.RecordId = id;
            return View(perinatalHistory);
        }

        // GET: PerinatalHistories/PrintForm1/5
        public async Task<IActionResult> PrintForm1(int id)
        {
            var perinatalHistory = await _context.PerinatalHistoryRecords
                .Include(p => p.Patient)
                    .ThenInclude(p => p.Person)
                .FirstOrDefaultAsync(p => p.Id == id);

            if (perinatalHistory == null)
            {
                return NotFound();
            }

            ViewBag.RecordId = id;
            return View(perinatalHistory);
        }

        // GET: PerinatalHistories/PrintForm2/5
        public async Task<IActionResult> PrintForm2(int id)
        {
            var perinatalHistory = await _context.PerinatalHistoryRecords
                .Include(p => p.Patient)
                    .ThenInclude(p => p.Person)
                .FirstOrDefaultAsync(p => p.Id == id);

            if (perinatalHistory == null)
            {
                return NotFound();
            }

            ViewBag.RecordId = id;
            return View(perinatalHistory);
        }

        // API endpoint to get print data as JSON
        [HttpGet]
        public async Task<IActionResult> GetPrintData(int id)
        {
            Console.WriteLine($"[DEBUG] GetPrintData called with id: {id}");
            
            var perinatalHistory = await _context.PerinatalHistoryRecords
                .Include(p => p.Patient)
                    .ThenInclude(p => p.Person)
                        .ThenInclude(p => p.Gender)
                .Include(p => p.Patient)
                    .ThenInclude(p => p.BloodType)
                .Include(p => p.MedicalBackground)
                .Include(p => p.ObstetricBackground)
                .Include(p => p.CurrentPregnancy)
                .Include(p => p.PrenatalConsultations)
                .Include(p => p.BirthInformation)
                .Include(p => p.NewbornInformation)
                .Include(p => p.PostpartumInformation)
                .Include(p => p.PuerperiumInformation)
                    .ThenInclude(p => p.Days)
                .Include(p => p.MorbidityInformation)
                .Include(p => p.NearMissVariables)
                .Include(p => p.ContraceptionInformation)
                .Include(p => p.MaternalDischargeInformation)
                .FirstOrDefaultAsync(p => p.Id == id);

            if (perinatalHistory == null)
            {
                Console.WriteLine($"[DEBUG] PerinatalHistory record {id} NOT FOUND");
                return NotFound();
            }
            
            Console.WriteLine($"[DEBUG] PerinatalHistory found: Id={perinatalHistory.Id}, PatientId={perinatalHistory.PatientId}");
            Console.WriteLine($"[DEBUG] MedicalBackground: {(perinatalHistory.MedicalBackground != null ? "EXISTS" : "NULL")}");
            Console.WriteLine($"[DEBUG] ObstetricBackground: {(perinatalHistory.ObstetricBackground != null ? "EXISTS" : "NULL")}");
            Console.WriteLine($"[DEBUG] CurrentPregnancy: {(perinatalHistory.CurrentPregnancy != null ? "EXISTS" : "NULL")}");
            Console.WriteLine($"[DEBUG] PrenatalConsultations count: {perinatalHistory.PrenatalConsultations?.Count ?? 0}");
            Console.WriteLine($"[DEBUG] BirthInformation: {(perinatalHistory.BirthInformation != null ? "EXISTS" : "NULL")}");
            Console.WriteLine($"[DEBUG] NewbornInformation: {(perinatalHistory.NewbornInformation != null ? "EXISTS" : "NULL")}");
            Console.WriteLine($"[DEBUG] PostpartumInformation: {(perinatalHistory.PostpartumInformation != null ? "EXISTS" : "NULL")}");
            
            // Log morbidity data
            if (perinatalHistory.MorbidityInformation != null)
            {
                Console.WriteLine($"[DEBUG] MorbidityInformation EXISTS - Id: {perinatalHistory.MorbidityInformation.Id}");
                Console.WriteLine($"[DEBUG] MorbidityInformation.SeverePreeclampsia: {perinatalHistory.MorbidityInformation.SeverePreeclampsia}");
                Console.WriteLine($"[DEBUG] MorbidityInformation.Eclampsia: {perinatalHistory.MorbidityInformation.Eclampsia}");
                Console.WriteLine($"[DEBUG] MorbidityInformation.HELLP: {perinatalHistory.MorbidityInformation.HELLP}");
                Console.WriteLine($"[DEBUG] MorbidityInformation.Sepsis: {perinatalHistory.MorbidityInformation.Sepsis}");
                Console.WriteLine($"[DEBUG] MorbidityInformation.Anemia: {perinatalHistory.MorbidityInformation.Anemia}");
            }
            else
            {
                Console.WriteLine($"[DEBUG] MorbidityInformation: NULL");
            }
            
            // Log specific data values
            if (perinatalHistory.MedicalBackground != null)
            {
                Console.WriteLine($"[DEBUG] MedicalBackground.FamilyDiabetes: {perinatalHistory.MedicalBackground.FamilyDiabetes}");
                Console.WriteLine($"[DEBUG] MedicalBackground.PersonalDiabetes: {perinatalHistory.MedicalBackground.PersonalDiabetes}");
            }
            
            if (perinatalHistory.CurrentPregnancy != null)
            {
                Console.WriteLine($"[DEBUG] CurrentPregnancy.LastMenstrualPeriod: {perinatalHistory.CurrentPregnancy.LastMenstrualPeriod}");
                Console.WriteLine($"[DEBUG] CurrentPregnancy.PreviousWeight: {perinatalHistory.CurrentPregnancy.PreviousWeight}");
                Console.WriteLine($"[DEBUG] CurrentPregnancy.Height: {perinatalHistory.CurrentPregnancy.Height}");
            }
            
            if (perinatalHistory.BirthInformation != null)
            {
                Console.WriteLine($"[DEBUG] BirthInformation.AdmissionDate: {perinatalHistory.BirthInformation.AdmissionDate}");
                Console.WriteLine($"[DEBUG] BirthInformation.PrenatalConsultationsTotal: {perinatalHistory.BirthInformation.PrenatalConsultationsTotal}");
            }
            
            if (perinatalHistory.NewbornInformation != null)
            {
                Console.WriteLine($"[DEBUG] NewbornInformation.Sex: {perinatalHistory.NewbornInformation.Sex}");
                Console.WriteLine($"[DEBUG] NewbornInformation.BirthWeight: {perinatalHistory.NewbornInformation.BirthWeight}");
            }

            // Create simplified response object
            var response = new
            {
                id = perinatalHistory.Id,
                patientId = perinatalHistory.PatientId,
                patient = perinatalHistory.Patient != null ? new
                {
                    patientId = perinatalHistory.Patient.PatientId,
                    personId = perinatalHistory.Patient.PersonId,
                    record = perinatalHistory.Patient.Person?.Record,
                    record2 = perinatalHistory.Patient.Person?.Record2,
                    fullName = perinatalHistory.Patient.Person?.FullName,
                    rnc = perinatalHistory.Patient.Person?.Rnc,
                    age = perinatalHistory.Patient.Age,
                    bornDate = perinatalHistory.Patient.Person?.BornDate,
                    gender = perinatalHistory.Patient.Person?.Gender?.Name,
                    bloodType = perinatalHistory.Patient.BloodType?.Name,
                    address = perinatalHistory.Patient.Person?.Address,
                    tel = perinatalHistory.Patient.Person?.Tel,
                    cel = perinatalHistory.Patient.Person?.Cel,
                    email = perinatalHistory.Patient.Person?.Email
                } : null,
                medicalBackground = perinatalHistory.MedicalBackground,
                obstetricBackground = perinatalHistory.ObstetricBackground,
                currentPregnancy = perinatalHistory.CurrentPregnancy,
                prenatalConsultations = perinatalHistory.PrenatalConsultations?.ToList(),
                birthInformation = perinatalHistory.BirthInformation,
                newbornInformation = perinatalHistory.NewbornInformation,
                postpartumInformation = perinatalHistory.PostpartumInformation,
                puerperiumInformation = perinatalHistory.PuerperiumInformation,
                morbidityInformation = perinatalHistory.MorbidityInformation != null ? new
                {
                    id = perinatalHistory.MorbidityInformation.Id,
                    // Hypertensive Disorders
                    chronicHypertension = perinatalHistory.MorbidityInformation.ChronicHypertension,
                    mildPreeclampsia = perinatalHistory.MorbidityInformation.MildPreeclampsia,
                    severePreeclampsia = perinatalHistory.MorbidityInformation.SeverePreeclampsia,
                    eclampsia = perinatalHistory.MorbidityInformation.Eclampsia,
                    hellp = perinatalHistory.MorbidityInformation.HELLP,
                    gestationalHypertension = perinatalHistory.MorbidityInformation.GestationalHypertension,
                    chronicHypertensionWithSuperimposedPreeclampsia = perinatalHistory.MorbidityInformation.ChronicHypertensionWithSuperimposedPreeclampsia,
                    // Infections
                    sepsis = perinatalHistory.MorbidityInformation.Sepsis,
                    endometritis = perinatalHistory.MorbidityInformation.Endometritis,
                    chorioamnionitis = perinatalHistory.MorbidityInformation.Chorioamnionitis,
                    asymptomaticBacteriuria = perinatalHistory.MorbidityInformation.AsymptomaticBacteriuria,
                    pyelonephritis = perinatalHistory.MorbidityInformation.Pyelonephritis,
                    pneumonia = perinatalHistory.MorbidityInformation.Pneumonia,
                    cesareanWoundInfection = perinatalHistory.MorbidityInformation.CesareanWoundInfection,
                    episiotomyInfection = perinatalHistory.MorbidityInformation.EpisiotomyInfection,
                    otherInfection = perinatalHistory.MorbidityInformation.OtherInfection,
                    // Hemorrhage
                    postAbortionHemorrhage = perinatalHistory.MorbidityInformation.PostAbortionHemorrhage,
                    hydatidiformMole = perinatalHistory.MorbidityInformation.HydatidiformMole,
                    ectopicPregnancy = perinatalHistory.MorbidityInformation.EctopicPregnancy,
                    placentaPrevia = perinatalHistory.MorbidityInformation.PlacentaPrevia,
                    accretaPlacentaPP = perinatalHistory.MorbidityInformation.AccretaPlacentaPP,
                    abruptioPlacentae = perinatalHistory.MorbidityInformation.AbruptioPlacentae,
                    uterineRupture = perinatalHistory.MorbidityInformation.UterineRupture,
                    postpartumHemorrhage = perinatalHistory.MorbidityInformation.PostpartumHemorrhage,
                    uterineAtony = perinatalHistory.MorbidityInformation.UterineAtony,
                    retainedPlacenta = perinatalHistory.MorbidityInformation.RetainedPlacenta,
                    placentalTears = perinatalHistory.MorbidityInformation.PlacentalTears,
                    coagulationDefect = perinatalHistory.MorbidityInformation.CoagulationDefect,
                    // Metabolic - Diabetes
                    abnormalOralGlucoseTolerance = perinatalHistory.MorbidityInformation.AbnormalOralGlucoseTolerance,
                    gestationalDiabetes = perinatalHistory.MorbidityInformation.GestationalDiabetes,
                    preexistingInsulinDependentDM = perinatalHistory.MorbidityInformation.PreexistingInsulinDependentDM,
                    preexistingNonInsulinDependentDM = perinatalHistory.MorbidityInformation.PreexistingNonInsulinDependentDM,
                    // Metabolic - Thyroid
                    hypothyroidism = perinatalHistory.MorbidityInformation.Hypothyroidism,
                    hyperthyroidism = perinatalHistory.MorbidityInformation.Hyperthyroidism,
                    thyroidCrisis = perinatalHistory.MorbidityInformation.ThyroidCrisis,
                    otherMetabolicDisorder = perinatalHistory.MorbidityInformation.OtherMetabolicDisorder,
                    // Other Disorders
                    hyperemesisGravidarum = perinatalHistory.MorbidityInformation.HyperemesisGravidarum,
                    deepVeinThrombosis = perinatalHistory.MorbidityInformation.DeepVeinThrombosis,
                    pulmonaryThromboembolism = perinatalHistory.MorbidityInformation.PulmonaryThromboembolism,
                    amniocEmbolism = perinatalHistory.MorbidityInformation.AmniocEmbolism,
                    cardiopathy = perinatalHistory.MorbidityInformation.Cardiopathy,
                    valvulopathy = perinatalHistory.MorbidityInformation.Valvulopathy,
                    convulsions = perinatalHistory.MorbidityInformation.Convulsions,
                    consciousnessAlteration = perinatalHistory.MorbidityInformation.ConsciousnessAlteration,
                    oliguria = perinatalHistory.MorbidityInformation.Oliguria,
                    anemia = perinatalHistory.MorbidityInformation.Anemia,
                    sickleCellAnemia = perinatalHistory.MorbidityInformation.SickleCellAnemia,
                    renalDisease = perinatalHistory.MorbidityInformation.RenalDisease,
                    malignantNeoplasia = perinatalHistory.MorbidityInformation.MalignantNeoplasia,
                    psychiatricDisorder = perinatalHistory.MorbidityInformation.PsychiatricDisorder,
                    cholestasis = perinatalHistory.MorbidityInformation.Cholestasis,
                    otherDisorder = perinatalHistory.MorbidityInformation.OtherDisorder,
                    // Obstetric Complications
                    obstructedLabor = perinatalHistory.MorbidityInformation.ObstructedLabor,
                    prolongedRuptureOfMembranes = perinatalHistory.MorbidityInformation.ProlongedRuptureOfMembranes,
                    polyhydramnios = perinatalHistory.MorbidityInformation.Polyhydramnios,
                    oligohydramnios = perinatalHistory.MorbidityInformation.Oligohydramnios,
                    intrauterineGrowthRestriction = perinatalHistory.MorbidityInformation.IntrauterineGrowthRestriction,
                    acuteFetalDistress = perinatalHistory.MorbidityInformation.AcuteFetalDistress,
                    otherObstetricComplication = perinatalHistory.MorbidityInformation.OtherObstetricComplication
                } : null,
                nearMissVariables = perinatalHistory.NearMissVariables,
                contraceptionInformation = perinatalHistory.ContraceptionInformation,
                maternalDischargeInformation = perinatalHistory.MaternalDischargeInformation,
                createdDate = perinatalHistory.CreatedDate
            };
            
            Console.WriteLine($"[DEBUG] Returning JSON response with {response.prenatalConsultations?.Count ?? 0} prenatal consultations");
            if (response.morbidityInformation != null)
            {
                Console.WriteLine($"[DEBUG] Morbidity in response - Eclampsia: {response.morbidityInformation.eclampsia}, HELLP: {response.morbidityInformation.hellp}");
            }

            return Json(response);
        }
    }
}
