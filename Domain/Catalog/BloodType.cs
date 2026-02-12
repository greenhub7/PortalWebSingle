using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Domain
{
    public class BloodType
    {
        [Key]
        public int BloodTypeId { get; set; }

        [Required]
        [MaxLength(100)]
        [Display(Name = "Codigo")]
        public string Code { get; set; }

        [Required]
        [MaxLength(100)]
        [Display(Name = "Tipo Sanguineo")]
        public string Name { get; set; }
        [JsonIgnore]
        public virtual ICollection<Patient> Patients { get; set; }
    }
}
