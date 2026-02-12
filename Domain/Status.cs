namespace Domain
{
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.Text.Json.Serialization;

    public class Status
    {
        [Key]
        public int StatusId { get; set; }

        [Required(ErrorMessage = "The field {0} is required")]
        [MaxLength(50, ErrorMessage = "The maximun length for field {0} is {1} characters")]
        [Display(Name = "Estatus")]
        public string Name { get; set; }

        [MaxLength(50, ErrorMessage = "The maximun length for field {0} is {1} characters")]
        [Display(Name = "Tabla")]
        public string Table { get; set; }

       
        [JsonIgnore] public virtual ICollection<Person> Persons { get; set; }
         
        [JsonIgnore]
        public virtual ICollection<ApplicationUser> Users { get; set; }

        [JsonIgnore]
        public virtual ICollection<OptionRol> OptionRols { get; set; }
        [JsonIgnore]
        public virtual ICollection<Option> Options { get; set; }
        [JsonIgnore]
        public virtual ICollection<ParentOption> ParentOptions { get; set; }
        [JsonIgnore]
        public virtual ICollection<Rol> Rols { get; set; }
        [JsonIgnore]
        public virtual ICollection<Author> Authors { get; set; }
        
        [JsonIgnore]
        public virtual ICollection<AuthorPlan> AuthorPlans { get; set; }
        


    }
}
