using Microsoft.AspNetCore.Identity;

namespace MyBookShelfBackend.Models
{
    public class Users : IdentityUser
    {
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public int? Age { get; set; }
    }
}
