using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Domain
{
    public class Patient
    {

        [Key]
        public int PatientId { get; set; }

        public int PersonId { get; set; }

        [Display(Name = "Seguro Principal")]
        public int InsuranceId { get; set; }

        [Display(Name = "Numero de Seguro")]
        [MaxLength(50)]
        public string InsuranceNumber { get; set; }

        [Display(Name = "NSS")]
        [MaxLength(50)]
        public string Nss { get; set; }

        [Display(Name = "Tipificacion Sanguinea")]
        public int BloodTypeId { get; set; }

        [Display(Name = "Edad")]
        [MaxLength(30)]
        public string Age { get; set; }

        public int? CustomerId { get; set; }

        [Display(Name = "Cedula de Acompañante")]
        public string CompanionRnc { get; set; }

        [Display(Name = "Tutor o Acompañante")]
        public string Companion { get; set; }

        [NotMapped]
        [Display(Name = "Nombre")]
        public string Name { get; set; }

        [JsonIgnore]
        public virtual Person Person { get; set; }
        [JsonIgnore]
        public virtual BloodType BloodType { get; set; }
        [JsonIgnore]
        public virtual Insurance Insurance { get; set; }



    }
}
