namespace Domain
{
    using System.ComponentModel.DataAnnotations;
    using System.Text.Json.Serialization;

    public class AuthorPlanOption
    {
        [Key]
        public int AuthorPlanOptionId { get; set; }

        [Display(Name = "Plan")]
        public int AuthorPlanId { get; set; }

        [Display(Name = "Opcion")]
        public int OptionId { get; set; }

        [JsonIgnore]
        public virtual AuthorPlan AuthorPlan { get; set; }

        [JsonIgnore]
        public virtual Option Option { get; set; }

    }
}
