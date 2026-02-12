namespace Domain
{
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.Text.Json.Serialization;

    public class Insurance
    {
        [Key]
        public int InsuranceId { get; set; }

        [Required]
        [MaxLength(100)]
        [Display(Name = "Codigo")]
        public string Code { get; set; }

        [Required]
        [MaxLength(100)]
        [Display(Name = "Seguro")]
        public string Name { get; set; }
        public bool ForSpecial { get; set; }

        [MaxLength(400)]
        [Display(Name = "Informacion Adicional")]
        public string AditionalInfo { get; set; }
         
        [MaxLength(15)]
        [Display(Name = "Rnc")]
        public string Rnc { get; set; }
         
        [JsonIgnore] public virtual ICollection<Patient> Patients { get; set; }
         

    }
}
