namespace Domain
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.Text.Json.Serialization;

    public class Author
    {
        [Key]
        public int AuthorId { get; set; }

        [Required]
        [MaxLength(15)]
        [Display(Name = "Codigo")]
        public string Code { get; set; }

        [Required]
        [MaxLength(100)]
        [Display(Name = "Nombre")]
        public string Name { get; set; }

        [DataType(DataType.ImageUrl)]
        public string Imagen { get; set; }

        [MaxLength(50)]
        [DataType(DataType.EmailAddress)]
        [Display(Name = "Correo")]
        [Required]
        public string Email { get; set; }

        [MaxLength(50)]
        [DataType(DataType.PhoneNumber)]
        [Display(Name = "Telefono")]
        [Required]
        public string Tel { get; set; }

        [MaxLength(20)]
        [Display(Name = "RNC (Registro Nacional de Contribuyentes)")]
        public string RNC { get; set; }

        [MaxLength(200)]
        [Display(Name = "Dirección")]
        public string Address { get; set; }

        [MaxLength(25)]
        [Display(Name = "Exequátur")]
        public string Exequatur { get; set; }

        [Display(Name = "Prefijo de Exp")]
        [MaxLength(8)]
        public string Prefix { get; set; }

        [Display(Name = "Prefijo de Recibo")]
        [MaxLength(16)]
        public string PrefixFact { get; set; }

        [Display(Name = "Prefijo de Orden")]
        [MaxLength(8)]
        public string PrefixOrder { get; set; }

        [Display(Name = "Fecha de Inicio")]
        [DataType(DataType.DateTime)]
        public DateTime? StartDate { get; set; }

        [Display(Name = "Auto Credito Diferencia con Seguro?")]
        public bool IsAutoPay { get; set; }

        [Display(Name = "Prefijo de NCF")]
        [MaxLength(20)]
        public string PrefixNcf { get; set; }

        [Display(Name = "Secuencia Actual NCF")]
        public int? SeqNcf { get; set; }

        [Display(Name = "Prefijo de NCF-Gub")]
        [MaxLength(20)]
        public string PrefixNcfGub { get; set; }

        [Display(Name = "Secuencia Actual NCF-Gub")]
        public int? SeqNcfGub { get; set; }

        [Display(Name = "Prefijo de Factura Final")]
        [MaxLength(16)]
        public string PrefixFinalFact { get; set; }

        [Display(Name = "Vencimiento NCF")]
        [MaxLength(25)]
        public string NcfEnds { get; set; }

        [Display(Name = "Secuencia Factura Actual")]
        public int? SeqFact { get; set; }

        [Display(Name = "Secuencia Orden Actual")]
        public int? SeqOrd { get; set; }

        [Display(Name = "Tipo")]
        public int AuthorTypeId { get; set; }

        [Display(Name = "Plan")]
        public int AuthorPlanId { get; set; }

        [Display(Name = "Estatus")]
        public int StatusId { get; set; }

        public bool IsMedical { get; set; }
        public bool IsBarber { get; set; }
        public bool IsGeneral { get; set; }
        public DateTime UpdateMessagesAvailability { get; set; }
        public int AvailableWsMessages { get; set; }
        public int AvailableSmsMessages { get; set; }
        public int AvailableEmailMessages { get; set; }
        public string NotificationEmailBody { get; set; }
        public string NotificationWsBody { get; set; }
        public string NotificationSmsBody { get; set; }

        [Display(Name = "Mensaje WhatsApp Web (Citas)")]
        public string NotificationWhatsAppWebBody { get; set; }

        [Display(Name = "Total Gastado WhatsApp")]
        public int TotalWhatsAppUsed { get; set; } = 0;

        [Display(Name = "Total Gastado SMS")]
        public int TotalSmsUsed { get; set; } = 0;

        [Display(Name = "Total Gastado Email")]
        public int TotalEmailUsed { get; set; } = 0;

        public DateTime? LastEmailReminderDate { get; set; }
        public DateTime? LastWhatsAppReminderDate { get; set; }
        public Guid? TenantId { get; set; }
        public int SeqLiq { get; set; }
        public string PrefixLiq { get; set; }

        [Display(Name = "Secuencia de Compras")]
        public int SeqPurchase { get; set; }

        [Display(Name = "Prefijo de Compras")]
        [MaxLength(16)]
        public string PrefixPurchase { get; set; }

        [Display(Name = "Porcentaje de Servicio Negociado")]
        public decimal? PercentageServiceNegotiated { get; set; }

        [Display(Name = "Impuesto a Retener")]
        public decimal? TaxToRetain { get; set; }

        [Display(Name = "% Reserva Garantía")]
        public decimal? ReservePercentage { get; set; }

        [Display(Name = "% Comisión Administrativa")]
        public decimal? AdministrativeCommissionPercentage { get; set; }

        [Display(Name = "Tasa de Descuento")]
        public decimal? DiscountRate { get; set; }

        [Display(Name = "% ISR (Impuesto Sobre la Renta)")]
        public decimal? ISRPercentage { get; set; }

        [Display(Name = "Ocultar Código en Productos")]
        public bool HideCodeInProducts { get; set; }

        [Display(Name = "Ocultar Medida en Productos")]
        public bool HideMeasureInProducts { get; set; }

        [Display(Name = "Ocultar Categoría en Productos")]
        public bool HideCategoryInProducts { get; set; }

        [Display(Name = "Ocultar Precio de Compra en Productos")]
        public bool HideBuyPriceInProducts { get; set; }

        [Display(Name = "Ocultar Impuestos en Productos")]
        public bool HideTaxInProducts { get; set; }

        [JsonIgnore] public virtual AuthorType Type { get; set; }
        [JsonIgnore] public virtual AuthorPlan Plan { get; set; }
        [JsonIgnore] public virtual Status Status { get; set; }
        [JsonIgnore] public virtual ICollection<AuthorPayment> AuthorPayments { get; set; }
        [JsonIgnore] public virtual ICollection<Person> Persons { get; set; }
        
        [JsonIgnore] public virtual ICollection<Rol> Rols { get; set; }
        [JsonIgnore] public virtual ICollection<ApplicationUser> Users { get; set; }
        

    }
}
