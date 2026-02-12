using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Domain
{
    public class ApplicationUser : Microsoft.AspNetCore.Identity.IdentityUser
    {
        public string DisplayName { get; set; }

        [Required(ErrorMessage = "The field {0} is required")]
        [MaxLength(50, ErrorMessage = "The maximun length for field {0} is {1} characters")]
        [Display(Name = "Nombre")]
        public string FirstName { get; set; }

        [Required(ErrorMessage = "The field {0} is required")]
        [MaxLength(50, ErrorMessage = "The maximun length for field {0} is {1} characters")]
        [Display(Name = "Apellido")]
        public string LastName { get; set; }

        public string Rnc { get; set; }

        [Display(Name = "Tipo")]
        public int UserTypeId { get; set; }

        [Display(Name = "Imagen")]
        [DataType(DataType.ImageUrl)]
        public string Picture { get; set; }

        [Display(Name = "Estatus")]
        public int StatusId { get; set; }

        [Display(Name = "Cliente Ps")]
        public int AuthorId { get; set; }

        public int? ShopId { get; set; }

        [Display(Name = "Nombre de Usuario")]
        public string FullName => $"{FirstName} {LastName}";
        public bool IsTenantRoot { get; set; }

        [JsonIgnore] public virtual UserType UserType { get; set; }
        [JsonIgnore] public virtual Status Status { get; set; }
        [JsonIgnore] public virtual Author Author { get; set; } 
      
        [JsonIgnore] public ICollection<Person> UserCreations { get; set; }
        [JsonIgnore] public ICollection<Person> UserUpdates { get; set; }
       

        [NotMapped] public string Role { get; set; }
        [NotMapped] public List<string> Roles { get; set; }

        public ApplicationUser()
        {
            Roles = new List<string>();
        }

    }
}
