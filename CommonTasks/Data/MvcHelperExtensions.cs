using Microsoft.AspNetCore.Mvc.Rendering;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;

namespace CommonTasks.Data
{

    public static class MvcHelperExtensions
    {

        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        public static IEnumerable<SelectListItem> ToSelectListItems<T>
            (
             this IEnumerable<T> items,
             Func<T, string> nameSelector,
             Func<T, string> valueSelector,
             Func<T, bool> selected
            )
        {
            return items.OrderBy(item => nameSelector(item))
                   .Select(item =>
                           new SelectListItem
                           {
                               Selected = selected(item),
                               Text = nameSelector(item),
                               Value = valueSelector(item)
                           });
        }

        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        public static IEnumerable<SelectListItem> ToSelectListItems<T>
            (
             this IEnumerable<T> items,
             Func<T, string> nameSelector,
             Func<T, string> valueSelector
            )
        {
            return items.OrderBy(item => nameSelector(item))
                   .Select(item =>
                           new SelectListItem
                           {
                               Text = nameSelector(item),
                               Value = valueSelector(item)
                           });
        }

        
        
        
        
        
        
        
        
        
        public static IEnumerable<SelectListItem> EnumToSelectList<TEnum, TAttributeType>(this TEnum enumObj, bool useIntegerValue)
            where TEnum : struct
        {
            Type type = typeof(TEnum);

            var fields = type.GetFields(BindingFlags.Static | BindingFlags.GetField | BindingFlags.Public);

            var values = from field in fields
                         select new SelectListItem
                         {
                             Value = (useIntegerValue) ? field.GetRawConstantValue().ToString() : field.Name,
                             Text = field.GetCustomAttributes(typeof(TAttributeType), true).
                                        FirstOrDefault().ToString() ?? field.Name,
                             Selected =
                                 (useIntegerValue)
                                     ? (Convert.ToInt32(field.GetRawConstantValue()) &
                                        Convert.ToInt32(enumObj)) ==
                                       Convert.ToInt32(field.GetRawConstantValue())
                                     : enumObj.ToString().Contains(field.Name)
                         };


            return values;
        }

        
        
        
        
        
        
        
        
        public static IEnumerable<SelectListItem> EnumToSelectList<TEnum>(this TEnum enumObj, bool useIntegerValue)
            where TEnum : struct
        {
            Type type = typeof(TEnum);

            var fields = type.GetFields(BindingFlags.Static | BindingFlags.GetField | BindingFlags.Public);

            var values = from field in fields
                         select new SelectListItem
                         {
                             Value = (useIntegerValue) ? field.GetRawConstantValue().ToString() : field.Name,
                             Text = field.Name.Replace('_', ' '),
                             Selected =
                                 (useIntegerValue)
                                     ? Convert.ToInt32(enumObj) == Convert.ToInt32(field.GetRawConstantValue())
                                     : enumObj.ToString().Contains(field.Name)
                         };


            return values;
        }

        
        
        
        
        
        public static Dictionary<int, string> EnumToDictionary<T>()
            where T : struct
        {
            return Enum.GetValues(typeof(T))
               .Cast<T>()
               .ToDictionary(t => Convert.ToInt32(t), t => t.ToString().Replace('_', ' '));
        }

        public static SelectList ToSelectList<EnumType>(this EnumType enumObject)
            where EnumType : struct, IComparable, IFormattable, IConvertible
        {
            var values = from EnumType e in Enum.GetValues(typeof(EnumType))
                         select new { Id = e, Name = e.ToString() };
            return new SelectList(values, "Id", "Name", enumObject);
        }
    }

}

