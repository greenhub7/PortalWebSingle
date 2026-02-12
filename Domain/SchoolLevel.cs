using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;


namespace Domain
{
    public class SchoolLevel
    {
        [Key]
        public int SchoolLevelId { get; set; }

        [Required]
        [MaxLength(100)]
        [Display(Name = "Nivel Escolar")]
        public string Name { get; set; }

        [JsonIgnore]
        public virtual ICollection<Person> Persons { get; set; }
    }
}
