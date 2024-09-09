using MyBookShelfBackend.Models;

namespace MyBookShelfBackend.Interfaces
{
    public interface IOrderRepository
    {
        //Task<List<CartItem>> GetAll();
        //Task<CartItem> GetByIdAsync(int id);
        //bool AddOrder(CartItem item);
        //bool UpdateOrder(CartItem item);
        //bool DeleteOrder(CartItem item);
        //bool Save();
        //Task<CartItem> GetCartByIdOfUser(string userId);
        Cart AddToCart(CartItem item);
        Cart GetCart(int CartId);
        Cart RemoveFromCart(int CartId, int bookId);


    }
}
