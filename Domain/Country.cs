using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Domain
{
    public class Country
    {
        [Key]
        public int CountryId { get; set; }

        
        [MaxLength(5)]
        [Display(Name = "Codigo")]
        public string Code { get; set; }

        [Required]
        [MaxLength(50)]
        [Display(Name = "Pais")]
        public string Name { get; set; }

        
        [MaxLength(25)]
        [Display(Name = "Gentilicio")]
        public string Demonym { get; set; }

        [DataType(DataType.ImageUrl)]
        [Display(Name = "Imagen")]
        public string Imagen { get; set; }

        [JsonIgnore]
        public virtual Continent Continent { get; set; }
        [JsonIgnore]
        public virtual ICollection<Person> Persons { get; set; }
    }
}
