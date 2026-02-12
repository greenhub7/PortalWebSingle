using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Domain
{
    public class Ocupation
    {
        [Key]
        public int OcupationId { get; set; }

        [Required]
        [MaxLength(50)]
        [Display(Name = "Ocupacion")]
        public string Name { get; set; }

        [JsonIgnore]
        public virtual ICollection<Person> Persons { get; set; }
    }
}
