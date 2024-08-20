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
            users.Id = _appDbContext.SaveChanges().ToString();

            return users;
        }

        public Users GetUsersByEmail(string email)
        {
            return _appDbContext.Users.FirstOrDefault(User => User.Email == email);
        }

        public Users GetById(string id)
        {
            return _appDbContext.Users.FirstOrDefault(User => User.Id == id);
        }
        public async Task<IEnumerable<Users>> GetAllUsersAsync()
        {
            return await _appDbContext.Users.ToListAsync();
        }
        public bool SaveChanges()
        {
            return _appDbContext.SaveChanges() > 0;
        }
        public async Task<bool> SaveChangesAsync()
        {
            return await _appDbContext.SaveChangesAsync() > 0;
        }
    }
}
