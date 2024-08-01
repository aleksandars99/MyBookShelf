using Microsoft.AspNetCore.Mvc;
using MyBookShelfBackend.Models;

namespace MyBookShelfBackend.Interfaces
{
    public interface IBookRepository
    {
        Task<List<Books>> GetAllBooks();
        Books GetBooksById(int id);
        ICollection<Books> GetByAuthor(string author);
        bool CreateBook(Books book);
        bool UpdateBook(Books book);
        bool DeleteBook(Books book);
        bool Save();

    }
}
