using MyBookShelfBackend.Models;

namespace MyBookShelfBackend.Interfaces
{
    public interface ICommentRepository
    {
        Task Add(Comment comment);
    }
}
