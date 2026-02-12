using System;
using System.Collections.Generic;
using System.Globalization;

namespace PsTools
{
    public class Dates
    {
        
        
        
        
        
        
        
        public static bool TryParseExactDate(string dateString, string format, out DateTime date)
        {
            if (string.IsNullOrEmpty(dateString))
            {
                date = DateTime.MinValue;
                return false;
            }

            return DateTime.TryParseExact(
                dateString,
                format,
                CultureInfo.InvariantCulture,
                DateTimeStyles.None,
                out date);
        }

        
        
        
        
        
        
        
        public static bool TryParseExactDate(string dateString, string[] formats, out DateTime date)
        {
            if (string.IsNullOrEmpty(dateString))
            {
                date = DateTime.MinValue;
                return false;
            }

            return DateTime.TryParseExact(
                dateString,
                formats,
                CultureInfo.InvariantCulture,
                DateTimeStyles.None,
                out date);
        }

        public static IEnumerable<DateTime> EachDay(DateTime from, DateTime thru)
        {
            for (var day = from.Date; day.Date <= thru.Date; day = day.AddDays(1))
                yield return day;
        }

        public static int GetValueDayOfTheWeek(DayOfWeek dayOfWeek)
        {
            return dayOfWeek switch
            {
                DayOfWeek.Friday => 5,
                DayOfWeek.Monday => 1,
                DayOfWeek.Saturday => 6,
                DayOfWeek.Sunday => 7,
                DayOfWeek.Thursday => 4,
                DayOfWeek.Tuesday => 2,
                DayOfWeek.Wednesday => 3,
                _ => 0,
            };
        }

        public static DateTime FormatedDateDo(string date)
        {
            if (string.IsNullOrEmpty(date))
            {
                return DateTime.Today;
            }
            CultureInfo choosenCulture = new CultureInfo("es-DO");

            try
            {
                date = DateTime.ParseExact(date, "dd/MM/yyyy", choosenCulture).ToString();
                return Convert.ToDateTime(date);
            }
            catch (Exception)
            {
                return DateTime.Today;
            }
        }
        public static string FormatedDateForUnique(DateTime? date, bool includeHoursMinutesAndSecond = false)
        {
            if (!includeHoursMinutesAndSecond)
                return date.Value.ToString("yyyyMMdd");
            return date.Value.ToString("yyyyMMddhhmmss");
        }
        public static string FormatedDateDoStr(DateTime? date)
        {
            if (date == null)
                return string.Empty;
            return date.Value.ToString("dd/MM/yyyy");
        }
        public static string OnlyHour(DateTime? date)
        {
            if (date == null)
                return string.Empty;
            return date.Value.ToString("hh:mm tt");
        }
        public static string FormatedDateDoStrWithHour(DateTime? date)
        {
            if (date == null)
                return string.Empty;
            return date.Value.ToString("dd/MM/yyyy hh:mm tt");
        }
        public static DateTime FormatedDate(string date)
        {
            if (string.IsNullOrEmpty(date))
            {
                return DateTime.Today;
            }

            try
            {
                var dateTime = new DateTime();
                var dd = DateTime.TryParse(date, out dateTime);
                return Convert.ToDateTime(dateTime);
            }
            catch (Exception)
            {
                return DateTime.Today;
            }
        }
        public static TimeSpan? FormatedTime(string time)
        {
            if (string.IsNullOrEmpty(time))
            {
                return null;
            }
            try
            {
                var format = "HH:mm";
                var provider = CultureInfo.InvariantCulture;
                var styles = DateTimeStyles.None;
                var parsedTime = DateTime.ParseExact(time, format, provider, styles);
                return parsedTime.TimeOfDay;
            }
            catch (FormatException ex)
            {
                try
                {
                    var format = "HH:mm:ss";
                    var provider = CultureInfo.InvariantCulture;
                    var styles = DateTimeStyles.None;
                    var parsedTime = DateTime.ParseExact(time, format, provider, styles);
                    return parsedTime.TimeOfDay;
                }
                catch (Exception)
                {
                    return null;
                }
            }
        }

        public static DateTime ConverToDate(int day, int month, int year, int hour = 0, int minutes = 0, string meridian = "", string culture = "")
        {
            if (string.IsNullOrEmpty(culture))
                culture = "en-US";
            if (0 == (day))
                day = 1;
            if (0 == (month))
                month = 1;
            if (0 == (year))
                year = DateTime.Now.Year;
            if (0 == (hour))
                hour = 10;
            if (string.IsNullOrEmpty(meridian))
                meridian = "AM";

            CultureInfo choosenCulture = new CultureInfo(culture);

            string dateToConvert = $"{month}/{day}/{year} {hour}:{minutes} {meridian}";
            DateTime.TryParseExact(dateToConvert, "M/d/yyyy h:m tt", choosenCulture, DateTimeStyles.None, out DateTime dt);
            return dt;
        }

        public static DateTime ConverToDate(string date, string culture = "en-US")
        {
            string format = "MM/dd/yyyy";
            if (string.IsNullOrEmpty(culture))
                culture = "en-US";
            else if (culture == "es-DO")
                format = "dd/MM/yyyy";
            else if (culture == "es-DO-h")
            {
                culture = "en-US";
                date = $"{FormatedDateDoStr(DateTime.Now)} {date}";
                format = "dd/MM/yyyy hh:mm tt";
            }

            var styles = DateTimeStyles.None;
            CultureInfo choosenCulture = new CultureInfo(culture);
            if (!string.IsNullOrEmpty(date))
            {
                DateTime.TryParseExact(date, format, choosenCulture, styles, out DateTime dt);
                return dt;
            }
            return DateTime.Now;
        }

        public static DateTime ConverToDate(string date, string hourAndMeridiam, string culture = "")
        {
            if (string.IsNullOrEmpty(culture))
                culture = "en-US";

            CultureInfo choosenCulture = new CultureInfo(culture);

            string dateToConvert = $"{date.Substring(3, 2)}/{date[..2]}/{date.Substring(6, 4)} {hourAndMeridiam}";
            DateTime dt;
            try
            {
                DateTime.TryParse(dateToConvert, choosenCulture, DateTimeStyles.None, out dt);
            }
            catch (Exception)
            {
                DateTime.TryParseExact(dateToConvert, "MM/dd/yyyy h:m", choosenCulture, DateTimeStyles.None, out dt);

            }
            return dt;
        }

        public static int CalculateAge(DateTime birthDate)
        {
            DateTime currentDate = DateTime.Now;
            int age = currentDate.Year - birthDate.Year;

            
            if (currentDate.Month < birthDate.Month ||
               (currentDate.Month == birthDate.Month && currentDate.Day < birthDate.Day))
            {
                age--;
            }

            return age;
        }
    }
}
