using MyBookShelfBackend.Models;
using System.ComponentModel.DataAnnotations;

namespace MyBookShelfBackend.Dtos
{
    public class AddBookDto
    {
        public string Title { get; set; }
        public string Author { get; set; }
        public DateOnly? ReleaseDate { get; set; }
        public string? ISBN { get; set; }
        
    }

}
