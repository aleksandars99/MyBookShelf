using MyBookShelfBackend.Models;

namespace MyBookShelfBackend.Interfaces
{
    public interface IAuthorRepository
    {
        Task<List<Author>> GetAll();
        Task<Author> GetByIdAsync(int id);
        bool AddAuthor (Author author);
        bool UpdateAuthor (Author author);
        bool DeleteAuthor (Author author);
        bool Save();
        public Task<List<Author>> GetSerbianAuthors();
        public Task<List<Author>> GetForeignAuthors();
    }
}
