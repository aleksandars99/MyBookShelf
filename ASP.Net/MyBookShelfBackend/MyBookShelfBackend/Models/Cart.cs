namespace MyBookShelfBackend.Models
{
    public class Cart
    {
        public int CartId { get; set; } 
        public string UserId { get; set; }
        public Users User { get; set; }
        public List<CartItem> CartItems { get; set; } = new List<CartItem>();
        public decimal CartPrice { get; set; }
    }
    public class CartItem
    {
        public int Id { get; set; }
        public int BookId { get; set; }
        public Books Book {  get; set; }
        public int Quantity { get; set; }
    }
}
