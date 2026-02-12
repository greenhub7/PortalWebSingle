using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Domain
{
    public class Currency
    {
        [Key]
        public int CurrencyId { get; set; }

        [Required]
        [MaxLength(10)]
        [Display(Name = "Codigo")]
        public string Code { get; set; }

        [Required]
        [MaxLength(100)]
        [Display(Name = "Moneda")]
        public string Name { get; set; }

        [JsonIgnore]
        public virtual ICollection<AuthorPlan> AuthorPlans { get; set; }

    }
}
