using Domain;
using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Domain
{
    public class Rol : IdentityRole
    {  
        [Required]
        [MaxLength(100, ErrorMessage = "La maxima longitud para el campo es {1}")]
        [Display(Name = "Descripcion")]
        public string Description { get; set; }
         
        [Display(Name = "Este Rol tiene Funciones de Cajero?")]
        public bool IsCashier { get; set; }

        [Display(Name = "Este Rol tiene Funciones de Doctor?")]
        public bool IsDoctor { get; set; }
         
        [JsonIgnore]
        public virtual ICollection<OptionRol> OptionRols { get; set; }
    }
}
