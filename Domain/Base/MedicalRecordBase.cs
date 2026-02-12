using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Domain.Base
{
    public abstract class MedicalRecordBase
    {
        public int PatientId { get; set; }

        [Display(Name = "Fecha de Inicio")]
        [DisplayFormat(DataFormatString = "{0:dd/MM/yyyy}", ApplyFormatInEditMode = true)]
        public DateTime? CreationDate { get; set; }

        [NotMapped]
        [Display(Name = "Fecha de Inicio")]
        public string CreationDateStr { get; set; }

        [Display(Name = "Antecedentes Personales")]
        [MaxLength(1000)]
        [DataType(DataType.MultilineText)]
        public string PersonalHistory { get; set; }

        [Display(Name = "Antecedentes Familiares")]
        [MaxLength(1000)]
        [DataType(DataType.MultilineText)]
        public string FamilyHistory { get; set; }

        [Display(Name = "Alergias Conocidas")]
        [MaxLength(500)]
        [DataType(DataType.MultilineText)]
        public string Allergies { get; set; }

        [Display(Name = "Medicación Habitual")]
        [MaxLength(1000)]
        [DataType(DataType.MultilineText)]
        public string RegularMedication { get; set; }

        [Display(Name = "Observaciones")]
        [MaxLength(2000)]
        [DataType(DataType.MultilineText)]
        public string Observations { get; set; }

        [JsonIgnore]
        public virtual Patient Patient { get; set; }
    }
}
