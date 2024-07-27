namespace MyBookShelfBackend.Models
{
    public class Book
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Author { get; set; }
        public string Description { get; set; }
        public string[] Comments { get; set; }
        public string[] Categories { get; set; }
        public string Rating { get; set; }
        public string Format { get; set; }
        public string PageNumber { get; set; }
        public string Alphabet {  get; set; }
        public string Cover { get; set; }
        public DateOnly ReleaseDate { get; set; }
        public bool Read {  get; set; }

    }
}
