using MyBookShelfBackend.Models;

namespace MyBookShelfBackend.Interfaces
{
    public interface IUserRepository
    {
        Users Create(Users users);
        Users GetUsersByEmail(string email);
        Users GetById(string id);
        Task<IEnumerable<Users>> GetAllUsersAsync();
        bool SaveChanges();
        Task<bool> SaveChangesAsync();
    }
}
