using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;


namespace Domain
{
    public class AuthorType
    {
        [Key]
        public int AuthorTypeId { get; set; }

        [Required]
        [MaxLength(20)]
        [Display(Name = "Tipo de Cliente Ps")]
        public string Name { get; set; }

        [JsonIgnore]
        public virtual ICollection<Author> Authors { get; set; }
    }
}
