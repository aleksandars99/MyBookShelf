using MyBookShelfBackend.Models;

namespace MyBookShelfBackend.Dtos
{
    public class AddAuthorDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Biography { get; set; }
        public string Image { get; set; }
        public bool isForeign { get; set; }

    }
}
