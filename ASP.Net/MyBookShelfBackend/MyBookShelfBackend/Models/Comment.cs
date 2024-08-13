namespace MyBookShelfBackend.Models
{
    public class Comment
    {
        public int Id { get; set; }
        public string text { get; set; }
        public string UserName { get; set; }
        public DateTime TimeCreated { get; set; } = DateTime.UtcNow;

        public int BookId { get; set; }
        public Books book {  get; set; }
    }
}
