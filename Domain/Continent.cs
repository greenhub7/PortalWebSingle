using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Domain
{
    public class Continent
    {
        [Key]
        public int ContinentId { get; set; }

        [Required]
        [MaxLength(5)]
        [Display(Name = "Codigo")]
        public string Code { get; set; }

        [Required]
        [MaxLength(50)]
        [Display(Name = "Continente")]
        public string Name { get; set; }

        [Required]
        [MaxLength(25)]
        [Display(Name = "Gentilicio")]
        public string Demonym { get; set; }

        [JsonIgnore]
        public virtual ICollection<Country> Countries { get; set; }
    }
}
