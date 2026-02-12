using System.ComponentModel.DataAnnotations.Schema;

namespace Web.Models
{
    public class UserRol
    {
        public string RolId { get; set; }

        public string UserId { get; set; }
    }

    [NotMapped]
    public class UserRolView
    {
        public string Id { get; set; }

        public string Name { get; set; }

        public string UserId { get; set; }

        public int AuthorId { get; set; }

        public string Email { get; set; }

        public string AuthorName { get; set; }
    }
}