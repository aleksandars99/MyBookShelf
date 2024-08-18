namespace MyBookShelfBackend.Models
{
    public class Author
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Biography { get; set; }
        public string? Image {  get; set; }
        public bool isForeign { get; set; } = false;

        public List<Books> Books { get; set; } = new List<Books>();
    }
}
