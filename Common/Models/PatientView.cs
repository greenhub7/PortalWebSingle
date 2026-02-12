namespace Web.Models
{
    using Application.Models;
    using Domain;
    using Domain.Enums;
    using Microsoft.AspNetCore.Http;
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    [NotMapped]
    public class PatientView : Patient
    {
        [Display(Name = "Medico que Refiere")]
        public string Doctor { get; set; }

        [Display(Name = "Centro Clinico de Referencia")]
        public string Clinical { get; set; }
         

        [DataType(DataType.ImageUrl)]
        [Display(Name = "Logo")]
        public string Logo { get; set; }

        [DataType(DataType.ImageUrl)]
        [Display(Name = "Logo2")]
        public string Logo2 { get; set; }

        public bool ConfirmationSave { get; set; }

        [Display(Name = "Antiguo Record")]
        public string Record3 { get; set; }

        [Display(Name = "Nombre")]
        public string FullName { get; set; }

        [Display(Name = "Imagen")]
        public IFormFile ImageFile { get; set; }

        [MaxLength(15)]
        [Display(Name = "RNC/Cedula PACIENTE")]
        public string Rnc { get; set; }

        [MaxLength(50)]
        [Display(Name = "Apellido")]
        public string LastName { get; set; }

        [Display(Name = "Fecha de Nacimiento")]
        [DisplayFormat(DataFormatString = "{0:dd/MM/yyyy}", ApplyFormatInEditMode = true)]
        public DateTime? BornDate { get; set; }

        public string BornDateStr { get; set; }

        [Display(Name = "Genero")]
        public int GenderId { get; set; }

        [Display(Name = "Nivel Escolar")]
        public int? SchoolLevelId { get; set; }

        [Display(Name = "Nacionalidad")]
        public int CountryId { get; set; }

        [MaxLength(50)]
        [DataType(DataType.EmailAddress)]
        [Display(Name = "Correo")]
        public string Email { get; set; }

        [MaxLength(50)]
        [DataType(DataType.PhoneNumber)]
        [Display(Name = "Telefono")]
        public string Tel { get; set; }

        [MaxLength(50)]
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

        [Display(Name = "Estatus")]
        public int StatusId { get; set; }

        [DataType(DataType.ImageUrl)]
        [Display(Name = "Imagen")]
        public string Imagen { get; set; }
        public string Location { get; set; }

        [Display(Name = "Cliente Ps")]
        public int AuthorId { get; set; }

        public int Record { get; set; }

        [Display(Name = "# Expediente Fis.")]
        public string Record2 { get; set; }

        public int? UserId { get; set; }

        public DateTime? CreationDate { get; set; }

        public Gender Gender { get; set; }
        public MaritalSituation MaritalSituation { get; set; }
        public Ocupation Ocupation { get; set; }
        public Religion Religion { get; set; }
        public Country Country { get; set; }
        public SchoolLevel SchoolLevel { get; set; } 
        public Ethnicity? EthnicityId { get; set; }
        public int YearsInTheGreatestLevel { get; set; }
        public bool LiveAlone { get; set; }
        public bool Literated { get; set; }
        
        public List<PatientAlert> Alerts { get; set; } = new List<PatientAlert>();

        
        public int? AsaClassification { get; set; }
        public string AsaDescription { get; set; } 
         
    }
}