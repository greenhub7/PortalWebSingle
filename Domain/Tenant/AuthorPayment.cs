using Microsoft.EntityFrameworkCore;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;


namespace Domain
{
    public class AuthorPayment
    {
        [Key]
        public int AuthorPaymentId { get; set; }

        public int AuthorId { get; set; }

        public int AuthorPlanId { get; set; }

        public int CurrencyId { get; set; }

        [DisplayFormat(DataFormatString = "{0:C2}", ApplyFormatInEditMode = false)]
        [Display(Name = "Monto")]
        [Precision(10, 2)] public decimal Amount { get; set; }

        public int StatusId { get; set; }

        [Display(Name = "Fecha del Pago")]
        public DateTime Date { get; set; }
        

        [Display(Name = "Fecha Vigencia del Pago")]
        public DateTime DateTo { get; set; }
        [Display(Name = "Fecha Vigencia del Pago")]
        [NotMapped] public string DateToStr { get; set; }

        [JsonIgnore]
        public AuthorPlan AuthorPlan { get; set; }

        [JsonIgnore]
        public virtual Currency Currency { get; set; }
        [JsonIgnore]
        public virtual Status Status { get; set; }
        [JsonIgnore]
        public virtual Author Author { get; set; }

    }
}
