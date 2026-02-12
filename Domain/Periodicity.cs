namespace Domain
{
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.Text.Json.Serialization;

    public class Periodicity
    {
        [Key]
        public int PeriodicityId { get; set; }

        [Required]
        [MaxLength(100)]
        [Display(Name = "Codigo")]
        public string Code { get; set; }

        [Required]
        [MaxLength(100)]
        [Display(Name = "Periodicidad")]
        public string Name { get; set; }

        [JsonIgnore]
        public virtual ICollection<AuthorPlan> AuthorPlans { get; set; }
          
    }
}
