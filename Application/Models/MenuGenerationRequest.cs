using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Models
{
    public class MenuGenerationRequest
    {
        [Display(Name = "Calorías Totales")]
        [Required(ErrorMessage = "Las calorías totales son requeridas")]
        [Range(800, 5000, ErrorMessage = "Las calorías deben estar entre 800 y 5000")]
        public decimal TotalCalories { get; set; }

        [Display(Name = "% Proteínas")]
        [Range(10, 60, ErrorMessage = "El porcentaje de proteínas debe estar entre 10% y 60%")]
        public decimal ProteinPercentage { get; set; } = 30;

        [Display(Name = "% Carbohidratos")]
        [Range(10, 60, ErrorMessage = "El porcentaje de carbohidratos debe estar entre 10% y 60%")]
        public decimal CarbPercentage { get; set; } = 40;

        [Display(Name = "% Grasas")]
        [Range(10, 60, ErrorMessage = "El porcentaje de grasas debe estar entre 10% y 60%")]
        public decimal FatPercentage { get; set; } = 30;

        [Display(Name = "Número de opciones a generar")]
        [Range(1, 5, ErrorMessage = "Puede generar entre 1 y 5 opciones")]
        public int NumOptions { get; set; } = 3;

        [Display(Name = "Restricciones alimenticias")]
        public List<string> DietaryRestrictions { get; set; } = new List<string>();

        public int PatientId { get; set; }
    }

    public class MealOption
    {
        public string Name { get; set; }
        public decimal Calories { get; set; }
        public decimal Protein { get; set; }
        public decimal Carbs { get; set; }
        public decimal Fat { get; set; }
        public string Description { get; set; }
        public MealType Type { get; set; }
    }

    public class MenuSuggestion
    {
        public int SuggestionId { get; set; }
        public string Name { get; set; }
        public decimal TotalCalories { get; set; }
        public decimal ProteinPercentage { get; set; }
        public decimal CarbPercentage { get; set; }
        public decimal FatPercentage { get; set; }

        public List<MealOption> Breakfast { get; set; } = new List<MealOption>();
        public List<MealOption> MorningSnack { get; set; } = new List<MealOption>();
        public List<MealOption> Lunch { get; set; } = new List<MealOption>();
        public List<MealOption> AfternoonSnack { get; set; } = new List<MealOption>();
        public List<MealOption> Dinner { get; set; } = new List<MealOption>();
        public List<MealOption> EveningSnack { get; set; } = new List<MealOption>();
    }

    public enum MealType
    {
        Breakfast,
        MorningSnack,
        Lunch,
        AfternoonSnack,
        Dinner,
        EveningSnack
    }

    public class MenuGenerationResponse
    {
        public List<MenuSuggestion> Suggestions { get; set; } = new List<MenuSuggestion>();
        public int PatientId { get; set; }
    }
}
