using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;


namespace Domain
{
    public class Religion
    {
        [Key]
        public int ReligionId { get; set; }

        [Required]
        [MaxLength(100)]
        [Display(Name = "Religión")]
        public string Name { get; set; }

        [JsonIgnore]
        public virtual ICollection<Person> Persons { get; set; }
    }
}
