namespace Domain
{
    using Domain.Enums;
    using Microsoft.EntityFrameworkCore;
    using System;
    using System.Collections.Generic;
    using System.Collections.ObjectModel;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Text.Json.Serialization;

    public class Person
    {
        [Key]
        public int PersonId { get; set; }

        [MaxLength(15)]
        [Display(Name = "RNC/Cedula")]
        public string Rnc { get; set; }

        [Required(ErrorMessage = "El Nombre es requerido")]
        [MaxLength(50)]
        [Display(Name = "Nombre")]
        public string Name { get; set; }

        [Required(ErrorMessage = "El Apellido es requerido")]
        [MaxLength(50)]
        [Display(Name = "Apellido")]
        public string LastName { get; set; }

        [Display(Name = "Fecha de Nacimiento")]
        [DisplayFormat(DataFormatString = "{0:dd/MM/yyyy}", ApplyFormatInEditMode = true)]
        public DateTime? BornDate { get; set; }

        [Display(Name = "Género")]
        public int GenderId { get; set; }

        [Display(Name = "Nivel Escolar")]
        public int? SchoolLevelId { get; set; }

        [Display(Name = "Nacionalidad")]
        public int CountryId { get; set; }

        [MaxLength(50)]
        [DataType(DataType.EmailAddress)]
        [Display(Name = "Correo")]
        public string Email { get; set; }

        [MaxLength(15)]
        [DataType(DataType.PhoneNumber)]
        [Display(Name = "Telefono")]
        public string Tel { get; set; }

        [MaxLength(15)]
        [DataType(DataType.PhoneNumber)]
        [Display(Name = "Celular")]
        public string Cel { get; set; }

        [Display(Name = "Estatus Marital")]
        public int MaritalSituationId { get; set; }

        [Display(Name = "Ocupacion")]
        public int OcupationId { get; set; }

        [Display(Name = "Religión")]
        public int ReligionId { get; set; }

        [MaxLength(200)]
        [DataType(DataType.MultilineText)]
        [Display(Name = "Direccion")]
        public string Address { get; set; }

        [DataType(DataType.ImageUrl)]
        [Display(Name = "Imagen")]
        public string Imagen { get; set; }

        [Display(Name = "# Record/Exp")]
        public string Record2 { get; set; }

        [Display(Name = "Record Viejo")]
        public string Record3 { get; set; }

        public int Record { get; set; }

        public DateTime? CreationDate { get; set; }
        
        [Display(Name = "Última Actualización")]
        public DateTime? LastUpdatedDate { get; set; }
        
        public string UserId { get; set; }
        [Display(Name = "Monto Adeudado")]
        [DisplayFormat(DataFormatString = "{0:C2}", ApplyFormatInEditMode = false)]
        [Precision(16, 2)] public decimal? DebAmount { get; set; }

        [Display(Name = "Saldo a Favor")]
        [DisplayFormat(DataFormatString = "{0:C2}", ApplyFormatInEditMode = false)]
        [Precision(16, 2)] public decimal? CreditAmount { get; set; }

        [Display(Name = "Monto Gastado")]
        [DisplayFormat(DataFormatString = "{0:C2}", ApplyFormatInEditMode = false)]
        [Precision(16, 2)] public decimal? WastedAmount { get; set; }

        public string UserUpdateId { get; set; }
        [Display(Name = "Estatus")]
        public int StatusId { get; set; }

        [Display(Name = "Cliente Ps")]
        public int AuthorId { get; set; }

        [Display(Name = "Medico que Refiere")]
        public string Doctor { get; set; }

        public Ethnicity? EthnicityId { get; set; }

        [Display(Name = "Centro Clinico de Referencia")]
        public string Clinical { get; set; }

        public bool LiveAlone { get; set; }
        public bool Literated { get; set; }
        public string Location { get; set; }
        public int YearsInTheGreatestLevel { get; set; }
        public bool IsExternal { get; set; }
        

        [Display(Name = "Nombre")]
        public string FullName => $"{Name} {LastName}";


        [JsonIgnore] public ApplicationUser User { get; set; }
        [JsonIgnore] public ApplicationUser UserUpdate { get; set; }
        [JsonIgnore] public virtual Gender Gender { get; set; }
        [JsonIgnore] public virtual MaritalSituation MaritalSituation { get; set; }
        [JsonIgnore] public virtual Ocupation Ocupation { get; set; }
        [JsonIgnore] public virtual Religion Religion { get; set; }
        [JsonIgnore] public virtual Country Country { get; set; }
        [JsonIgnore] public virtual Status Status { get; set; }
        [JsonIgnore] public virtual Author Author { get; set; }
        [JsonIgnore] public virtual SchoolLevel SchoolLevel { get; set; }
        [JsonIgnore] public virtual ICollection<Patient> Patients { get; set; }


        public Person()
        {
            Patients = new Collection<Patient>();
        }
    }
}
