using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Domain.Base
{
    public abstract class MedicalEncounterBase
    { 
        public int PatientId { get; set; }
         
        [Display(Name = "Fecha de Visita")]
        [DisplayFormat(DataFormatString = "{0:dd/MM/yyyy}", ApplyFormatInEditMode = true)]
        public DateTime? VisitDate { get; set; }
         
        [NotMapped]
        [Display(Name = "Fecha de Visita")]
        public string VisitDateStr { get; set; }
         
        [Display(Name = "Motivo de Consulta")]
        [MaxLength(500)]
        [Required]
        [DataType(DataType.MultilineText)]
        public string VisitReason { get; set; }
         
        [Display(Name = "Diagnóstico")]
        [MaxLength(500)]
        [DataType(DataType.MultilineText)]
        public string Diagnosis { get; set; }
         
        [Display(Name = "Tratamiento")]
        [MaxLength(500)]
        [DataType(DataType.MultilineText)]
        public string Treatment { get; set; }
         
        [Display(Name = "Indicaciones/Recomendaciones")]
        [MaxLength(500)]
        [DataType(DataType.MultilineText)]
        public string Indications { get; set; }
         
        [Display(Name = "Observaciones")]
        [MaxLength(500)]
        [DataType(DataType.MultilineText)]
        public string Observations { get; set; }
         
        [JsonIgnore]
        public virtual Patient Patient { get; set; }
         
        [Display(Name = "Presión Arterial")]
        [MaxLength(20)]
        public string BloodPressure { get; set; }

        [Display(Name = "Frecuencia Cardíaca")]
        [MaxLength(20)]
        public string HeartRate { get; set; }

        [Display(Name = "Frecuencia Respiratoria")]
        [MaxLength(20)]
        public string RespiratoryRate { get; set; }

        [Display(Name = "Temperatura")]
        [MaxLength(20)]
        public string Temperature { get; set; }

        [Display(Name = "Peso (kg)")]
        [MaxLength(20)]
        public string Weight { get; set; }

        [Display(Name = "Talla (cm)")]
        [MaxLength(20)]
        public string Height { get; set; }
    }
}
