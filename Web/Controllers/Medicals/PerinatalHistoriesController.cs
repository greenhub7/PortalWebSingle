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
                .Include(p => p.MorbidityInformation)
                .Include(p => p.NearMissVariables)
                .Include(p => p.ContraceptionInformation)
                .Include(p => p.MaternalDischargeInformation)
                .FirstOrDefaultAsync(p => p.Id == id);

            if (perinatalHistory == null)
            {
                return NotFound();
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
                morbidityInformation = perinatalHistory.MorbidityInformation,
                nearMissVariables = perinatalHistory.NearMissVariables,
                contraceptionInformation = perinatalHistory.ContraceptionInformation,
                maternalDischargeInformation = perinatalHistory.MaternalDischargeInformation,
                createdDate = perinatalHistory.CreatedDate
            };

            return Json(response);
        }
    }
}
