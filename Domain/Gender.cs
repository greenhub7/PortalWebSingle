using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Domain
{
    public class Gender
    {
        [Key]
        public int GenderId { get; set; }

        [Required]
        [MaxLength(20)]
        [Display(Name = "Género")]
        public string Name { get; set; }

        [JsonIgnore]
        public virtual ICollection<Person> Persons { get; set; }
    }
}
