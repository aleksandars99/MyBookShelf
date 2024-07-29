using MyBookShelfBackend.Models;

namespace MyBookShelfBackend.Interfaces
{
    public interface IUserRepository
    {
        Users Create(Users users);
        Task<Users> GetUsersByEmail(string email);
        Task<Users> GetById(string id);

    }
}
