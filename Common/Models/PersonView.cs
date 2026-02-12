using Microsoft.AspNetCore.Http;

namespace Common.Models
{
    public class PersonView
    {
        public IFormFile ImageFile { get; set; }
        public string ActualPassword { get; set; }
        public string NewPassword { get; set; }
        public string ConfirmPassword { get; set; }
        public string Imagen { get; set; }
    }
}
