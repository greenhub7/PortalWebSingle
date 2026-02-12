using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;


namespace Domain
{
    public class AuthorPlan
    {
        [Key]
        public int AuthorPlanId { get; set; }

        [Required]
        [MaxLength(100)]
        [Display(Name = "Codigo")]
        public string Code { get; set; }

        [Required]
        [MaxLength(200)]
        [Display(Name = "Plan")]
        public string Name { get; set; }

        [Display(Name = "Moneda")]
        public int CurrencyId { get; set; }

        [Display(Name = "Periodicidad")]
        public int PeriodicityId { get; set; }

        [DisplayFormat(DataFormatString = "{0:C2}", ApplyFormatInEditMode = false)]
        [Display(Name = "Monto")]
        [Precision(10, 2)] public decimal Amount { get; set; }

        [Display(Name = "Estatus")]
        public int? StatusId { get; set; }
        public bool ShowAsBuyable { get; set; }

        [JsonIgnore]
        public virtual Currency Currency { get; set; }
        [JsonIgnore]
        public virtual Periodicity Periodicity { get; set; }
        [JsonIgnore]
        public virtual Status Status { get; set; }
        [JsonIgnore]
        public virtual ICollection<Author> Authors { get; set; }
        [JsonIgnore]
        public virtual ICollection<AuthorPlanOption> AuthorPlanOptions { get; set; }
    }
}
