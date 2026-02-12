using Microsoft.AspNetCore.Html;
using Microsoft.AspNetCore.Mvc.Rendering;
using Domain;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Reflection;

namespace Web.Helpers
{
    public static class EnumHelpers
    {
        
        
        
        public static string GetDescription(this Enum value)
        {
            if (value == null) return string.Empty;

            var field = value.GetType().GetField(value.ToString());
            if (field == null) return value.ToString();

            var attribute = field.GetCustomAttribute<DescriptionAttribute>();
            return attribute?.Description ?? value.ToString();
        }

        
        
        
        public static string GetYesNoNotRecordedDisplayName(YesNoNotRecorded? value)
        {
            if (!value.HasValue) return "";
            
            return value.Value switch
            {
                YesNoNotRecorded.Yes => "Sí",
                YesNoNotRecorded.No => "No", 
                YesNoNotRecorded.NotRecorded => "NC",
                _ => ""
            };
        }

        
        
        
        public static string GetDiabetesTypeDisplayName(DiabetesType? value)
        {
            if (!value.HasValue) return "";
            
            return value.Value switch
            {
                DiabetesType.Type1 => "Tipo I",
                DiabetesType.Type2 => "Tipo II",
                DiabetesType.Gestational => "Gestacional",
                _ => ""
            };
        }

        
        
        
        public static string GetBloodGroupDisplayName(BloodGroup? value)
        {
            if (!value.HasValue) return "";
            
            return value.Value switch
            {
                BloodGroup.A => "A",
                BloodGroup.B => "B",
                BloodGroup.AB => "AB",
                BloodGroup.O => "O",
                _ => ""
            };
        }

        
        
        
        public static string GetRhFactorDisplayName(RhFactor? value)
        {
            if (!value.HasValue) return "";
            
            return value.Value switch
            {
                RhFactor.Positive => "+",
                RhFactor.Negative => "-",
                _ => ""
            };
        }

        
        
        
        public static List<SelectListItem> GetYesNoNotRecordedSelectList(YesNoNotRecorded? selectedValue = null)
        {
            return new List<SelectListItem>
            {
                new SelectListItem 
                { 
                    Value = ((int)YesNoNotRecorded.Yes).ToString(), 
                    Text = "Sí", 
                    Selected = selectedValue == YesNoNotRecorded.Yes 
                },
                new SelectListItem 
                { 
                    Value = ((int)YesNoNotRecorded.No).ToString(), 
                    Text = "No", 
                    Selected = selectedValue == YesNoNotRecorded.No 
                },
                new SelectListItem 
                { 
                    Value = ((int)YesNoNotRecorded.NotRecorded).ToString(), 
                    Text = "NC", 
                    Selected = selectedValue == YesNoNotRecorded.NotRecorded 
                }
            };
        }

        
        
        
        public static List<SelectListItem> GetDiabetesTypeSelectList(DiabetesType? selectedValue = null)
        {
            return new List<SelectListItem>
            {
                new SelectListItem 
                { 
                    Value = ((int)DiabetesType.Type1).ToString(), 
                    Text = "Tipo I", 
                    Selected = selectedValue == DiabetesType.Type1 
                },
                new SelectListItem 
                { 
                    Value = ((int)DiabetesType.Type2).ToString(), 
                    Text = "Tipo II", 
                    Selected = selectedValue == DiabetesType.Type2 
                },
                new SelectListItem 
                { 
                    Value = ((int)DiabetesType.Gestational).ToString(), 
                    Text = "Gestacional", 
                    Selected = selectedValue == DiabetesType.Gestational 
                }
            };
        }

        
        
        
        public static List<SelectListItem> GetBloodGroupSelectList(BloodGroup? selectedValue = null)
        {
            return new List<SelectListItem>
            {
                new SelectListItem 
                { 
                    Value = ((int)BloodGroup.A).ToString(), 
                    Text = "A", 
                    Selected = selectedValue == BloodGroup.A 
                },
                new SelectListItem 
                { 
                    Value = ((int)BloodGroup.B).ToString(), 
                    Text = "B", 
                    Selected = selectedValue == BloodGroup.B 
                },
                new SelectListItem 
                { 
                    Value = ((int)BloodGroup.AB).ToString(), 
                    Text = "AB", 
                    Selected = selectedValue == BloodGroup.AB 
                },
                new SelectListItem 
                { 
                    Value = ((int)BloodGroup.O).ToString(), 
                    Text = "O", 
                    Selected = selectedValue == BloodGroup.O 
                }
            };
        }

        
        
        
        public static List<SelectListItem> GetRhFactorSelectList(RhFactor? selectedValue = null)
        {
            return new List<SelectListItem>
            {
                new SelectListItem 
                { 
                    Value = ((int)RhFactor.Positive).ToString(), 
                    Text = "+", 
                    Selected = selectedValue == RhFactor.Positive 
                },
                new SelectListItem 
                { 
                    Value = ((int)RhFactor.Negative).ToString(), 
                    Text = "-", 
                    Selected = selectedValue == RhFactor.Negative 
                }
            };
        }

        
        
        
        public static IHtmlContent GenerateYesNoNotRecordedRadioButtons(
            IHtmlHelper htmlHelper, 
            string name, 
            YesNoNotRecorded? selectedValue = null, 
            object htmlAttributes = null)
        {
            var radioButtons = new List<string>();

            foreach (var option in GetYesNoNotRecordedSelectList(selectedValue))
            {
                var isChecked = option.Selected ? "checked" : "";
                var radioId = $"{name}_{option.Text.Replace(" ", "")}";
                
                var radioHtml = $@"
                    <div class=""form-check form-check-inline"">
                        <input class=""form-check-input"" type=""radio"" name=""{name}"" value=""{option.Value}"" id=""{radioId}"" {isChecked} />
                        <label class=""form-check-label"" for=""{radioId}"">{option.Text}</label>
                    </div>";
                    
                radioButtons.Add(radioHtml);
            }

            return new HtmlString(string.Join("", radioButtons));
        }
    }
}