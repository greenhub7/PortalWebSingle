namespace PsTools
{
    using Application.Core;
    using System;
    using System.Data;
    using System.Linq;
    using System.Security.Cryptography;
    using System.Text;
    using System.Text.RegularExpressions;

    public static class Strings
    {
        
        
        
        
        
        
        
        public static string ObfuscateSensitiveData(string text, int charsToShow = 2)
        {
            if (string.IsNullOrEmpty(text))
                return text;

            int length = text.Length;

            if (length <= charsToShow * 2)
            {
                if (length <= 1)
                    return text;

                return text[0] + new string('*', length - 1);
            }

            string prefix = text.Substring(0, charsToShow);
            string suffix = text.Substring(length - charsToShow);

            int middleLength = length - (charsToShow * 2);

            return prefix + new string('*', middleLength) + suffix;
        }

        public static string ConvertToHtml(string text)
        {
            
            var regex = new Regex(@"(\d+\.)");
            var result = regex.Replace(text, "<li>$1");
            result = result.Replace(".", ".</li>");

            
            result = "<ol>" + result + "</ol>";

            
            result = "<p>" + result.Replace("<ol>", "</p><ol>").Replace("</ol>", "</ol><p>") + "</p>";

            return result;
        }

        public static string RandomString(int length)
        {
            
            const string chars = "0123456789";
            var random = new Random();
            return new string(Enumerable.Repeat(chars, length).Select(s => s[random.Next(s.Length)]).ToArray());
        }
       
        public static string RemoveCharacters(string param)
        {
            param = param.Replace("(", "");
            param = param.Replace(")", "");
            param = param.Replace("-", "");
            param = param.Replace(" ", "");
            return param;
        }
         
        public static string EncodeKrypt(string stringKey)
        {
            string encodeKey = AppSettings.ApplicationSettings.EncodeKey;

            byte[] key; 

            byte[] array = UTF8Encoding.UTF8.GetBytes(stringKey); 

            
            var md5 = new MD5CryptoServiceProvider();
            key = md5.ComputeHash(UTF8Encoding.UTF8.GetBytes(encodeKey));
            md5.Clear();

            
            var tripledes = new TripleDESCryptoServiceProvider
            {
                Key = key,
                Mode = CipherMode.ECB,
                Padding = PaddingMode.PKCS7
            };
            ICryptoTransform convertir = tripledes.CreateEncryptor(); 
            byte[] result = convertir.TransformFinalBlock(array, 0, array.Length); 
            tripledes.Clear();

            return Convert.ToBase64String(result, 0, result.Length); 
        }

        public static string DecodeKrypt(string stringKey)
        {
            string encodeKey = AppSettings.ApplicationSettings.EncodeKey;

            byte[] key;

            byte[] array = Convert.FromBase64String(stringKey); 

            
            var md5 = new MD5CryptoServiceProvider();
            key = md5.ComputeHash(UTF8Encoding.UTF8.GetBytes(encodeKey));
            md5.Clear();

            
            var tripledes = new TripleDESCryptoServiceProvider
            {
                Key = key,
                Mode = CipherMode.ECB,
                Padding = PaddingMode.PKCS7
            };
            ICryptoTransform convert = tripledes.CreateDecryptor();
            byte[] result = convert.TransformFinalBlock(array, 0, array.Length);
            tripledes.Clear();

            
            return UTF8Encoding.UTF8.GetString(result); 
        }

        public static int ExtractNumbers(string input)
        {
            string pattern = @"\d+";
            MatchCollection matches = Regex.Matches(input, pattern);

            if (matches.Count == 0) return -1;

            string concatenatedNumbers = string.Concat(matches);

            return int.TryParse(concatenatedNumbers, out int result) ? result : -1;
        }

    }

}
