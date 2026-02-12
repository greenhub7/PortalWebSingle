using System.ComponentModel.DataAnnotations;

namespace Web.DTOs
{
    public class RegisterDto
    {

        [Required]
        public string DisplayName { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        
        public string Password { get; set; }

        [Required]
        public string Username { get; set; }

        [Required]
        public string FirstName { get; set; }

        [Required]
        public string LastName { get; set; }

        public string Rnc { get; set; }

        public int AuthorId { get; set; }

    }
}