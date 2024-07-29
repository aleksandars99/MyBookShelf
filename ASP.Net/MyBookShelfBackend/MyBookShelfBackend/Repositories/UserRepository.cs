using Microsoft.EntityFrameworkCore;
using MyBookShelfBackend.Data;
using MyBookShelfBackend.Interfaces;
using MyBookShelfBackend.Models;

namespace MyBookShelfBackend.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly AppDbContext _appDbContext;

        public UserRepository(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        public Users Create(Users users)
        {
            _appDbContext.Users.Add(users);
            _appDbContext.SaveChanges();

            return users;
        }

        public Task<Users> GetById(string id)
        {
            return _appDbContext.Users.FirstOrDefaultAsync(User => User.Id == id);
        }

        public Task<Users> GetUsersByEmail(string email)
        {
            return _appDbContext.Users.FirstOrDefaultAsync(User => User.Email == email);

        }

    }
}
