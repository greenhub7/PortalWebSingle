using Domain;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Domain
{
    public class ParentOption
    {

        [Key]
        public int ParentOptionId { get; set; }

        [Required]
        [MaxLength(20, ErrorMessage = "La maxima longitud para el campo es {1}")]
        [Display(Name = "Menu")]
        public string Name { get; set; }

        [Required]
        [MaxLength(100, ErrorMessage = "La maxima longitud para el campo es {1}")]
        [Display(Name = "Descripcion")]
        public string Description { get; set; }


        [MaxLength(100, ErrorMessage = "La maxima longitud para el campo es {1}")]
        [Display(Name = "Link")]
        public string Link { get; set; }

        [Display(Name = "Orden")]
        public int? Order { get; set; }

        [MaxLength(100, ErrorMessage = "La maxima longitud para el campo es {1}")]
        [Display(Name = "Class")]
        public string Class { get; set; }

        [DataType(DataType.ImageUrl)]
        public string Icon { get; set; }

        [Display(Name = "Estatus")]
        public int StatusId { get; set; }


        [JsonIgnore]
        public virtual Status Status { get; set; }

    }
}
