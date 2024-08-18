using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using MyBookShelfBackend.Data;
using MyBookShelfBackend.Interfaces;
using MyBookShelfBackend.Models;

namespace MyBookShelfBackend.Repositories
{
    public class AuthorRepository : IAuthorRepository
    {
        private readonly AppDbContext _context;
        public AuthorRepository (AppDbContext appDbContext)
        {
            _context = appDbContext;
        }
        public bool AddAuthor(Author author)
        {
            _context.Author.Add(author);
            return Save();
        }

        public bool DeleteAuthor(Author author)
        {
            _context.Author.Remove(author);
            return Save();
        }

        public Task<List<Author>> GetAll()
        {
            return _context.Author.OrderBy(a =>a.Name).ToListAsync();
        }

        public Task<Author> GetByIdAsync(int id)
        {
            return _context.Author
                .Include(b =>b.Books)
                .FirstOrDefaultAsync(x => x.Id == id);
        }

        public bool UpdateAuthor(Author author)
        {
            _context.Author.Update(author);
            return Save();
        }
        public bool Save()
        {
            return _context.SaveChanges() >= 0 ? true : false;
        }

        public Task<List<Author>> GetSerbianAuthors()
        {
            return _context.Author.Where(a => !a.isForeign).ToListAsync();
        }

        public Task<List<Author>> GetForeignAuthors()
        {
            return _context.Author.Where(a => a.isForeign).ToListAsync();
        }
    }
}
