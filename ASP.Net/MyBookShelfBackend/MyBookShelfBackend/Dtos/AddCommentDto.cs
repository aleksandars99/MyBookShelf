using MyBookShelfBackend.Models;

namespace MyBookShelfBackend.Dtos
{
    public class AddCommentDto
    {
        //public int Id { get; set; }
        public string Text { get; set; }
        //public string UserName { get; set; }
        //public DateTime TimeCreated { get; set; } = DateTime.UtcNow;

        public int BookId { get; set; }
    }
}
