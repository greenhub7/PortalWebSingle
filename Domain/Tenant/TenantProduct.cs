using Microsoft.EntityFrameworkCore;
using System;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Domain.Tenant
{
  
    public class TenantProduct
    {
        [Key]
        public int TenantProductId { get; set; }

        [Required]
        [Display(Name = "Tenant")]
        public Guid TenantId { get; set; }

        [Required]
        [MaxLength(50)]
        [Display(Name = "Código")]
        public string Code { get; set; }

        [Required]
        [MaxLength(200)]
        [Display(Name = "Nombre del Servicio")]
        public string Name { get; set; }

        [MaxLength(500)]
        [Display(Name = "Descripción")]
        public string Description { get; set; }

        [Display(Name = "Precio Base")]
        [Precision(10, 2)]
        public decimal BasePrice { get; set; }

        [Display(Name = "Tipo de Servicio")]
        public int? ServiceTypeId { get; set; }

        [Display(Name = "Categoría")]
        public int? CategoryId { get; set; }

        [Display(Name = "Código de Clasificación")]
        [MaxLength(50)]
        public string ClassificationCode { get; set; }

        [Display(Name = "Activo")]
        public bool IsActive { get; set; } = true;

        [Display(Name = "Fecha de Creación")]
        public DateTime CreatedDate { get; set; } = DateTime.Now;

        [Display(Name = "Creado Por")]
        public string CreatedBy { get; set; }

        [Display(Name = "Fecha de Modificación")]
        public DateTime? ModifiedDate { get; set; }

        [Display(Name = "Modificado Por")]
        public string ModifiedBy { get; set; }

        
        [JsonIgnore]
        public virtual ServiceType ServiceType { get; set; }

    
    }
}
