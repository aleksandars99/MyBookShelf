namespace MyBookShelfBackend.Dtos
{
    public class EditAuthorDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Biography { get; set; }
        public string Image { get; set; }
        public bool isForeign { get; set; }
    }
}
