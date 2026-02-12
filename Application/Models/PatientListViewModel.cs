using Domain;
using System.Collections.Generic;

namespace Web.Models
{
    public class PatientListViewModel
    {
        public int PersonId { get; set; }
        public int PatientId { get; set; }
        public string SearchTearm { get; set; }
        public string UrlToReturn { get; set; }
        public ICollection<Patient> Patients { get; set; }
        public bool IsTenantRoot { get; set; }
        public bool IsUserType7 { get; set; }
    }
}
