using Microsoft.AspNetCore.Identity;

namespace MyBookShelfBackend.Models
{
    public class Users : IdentityUser
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
