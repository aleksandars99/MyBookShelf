using MyBookShelfBackend.Models;

namespace MyBookShelfBackend.Dtos
{
    public class AddToCartDto
    {
        public List<CartItem> CartItems { get; set; } = new List<CartItem>();
        public decimal CartPrice { get; set; }
    }
}
