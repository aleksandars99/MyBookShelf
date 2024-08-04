using MyBookShelfBackend.Models;
using System.ComponentModel.DataAnnotations;

namespace MyBookShelfBackend.Dtos
{
    public class AddBookDto
    {
        public string Title { get; set; }
        public string? Description { get; set; }
        public string? Image { get; set; }
        public string Author { get; set; }
        public string Price { get; set; }
        public string? Categories { get; set; }
        public BookEdition? Edition { get; set; }
        public string? PageNumber { get; set; }
        public string? Alphabet { get; set; }
        public DateTime? ReleaseDate { get; set; }
        public string? YoutubeLink { get; set; }
        public string? ISBN { get; set; }
        

    }

}
