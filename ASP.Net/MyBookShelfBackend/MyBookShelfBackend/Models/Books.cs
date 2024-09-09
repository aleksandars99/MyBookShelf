using MyBookShelfBackend.Data;
using System.ComponentModel.DataAnnotations;

namespace MyBookShelfBackend.Models
{
    public class Books
    {
        public int Id { get; set; }
        public required string Title { get; set; }
        public string? Description { get; set; }
        public string? Image { get; set; }
        public int? AuthorId { get; set; }
        public Author? Author { get; set; }
        [Range(0, 10)]
        public decimal? Rating { get; set; }
        public string? Price { get; set; }
        public List<Comment>? Comments { get; set; }
        public string? Categories { get; set; }
        public BookEdition? Edition { get; set; }
        public string? PageNumber { get; set; }
        public string? Alphabet { get; set; }
        public DateTime? ReleaseDate { get; set; }
        public string? YoutubeLink { get; set; }
        public string? ISBN { get; set; }
        public bool? IsNew { get; set; }
        public bool? isTrending { get; set; }
    }
}
