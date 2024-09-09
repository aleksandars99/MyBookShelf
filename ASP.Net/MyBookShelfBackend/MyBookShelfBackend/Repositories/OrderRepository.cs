using Microsoft.EntityFrameworkCore;
using MyBookShelfBackend.Data;
using MyBookShelfBackend.Interfaces;
using MyBookShelfBackend.Models;

namespace MyBookShelfBackend.Repositories
{
    public class OrderRepository : IOrderRepository
    {
        private readonly AppDbContext _appDbContext;
        public OrderRepository(AppDbContext appDbContext) 
        {
            _appDbContext = appDbContext;
        }
        //public bool AddOrder(CartItem item)
        //{
        //    this._appDbContext.Add(item);
        //    return Save();
        //}

        //public bool DeleteOrder(CartItem item)
        //{
        //    _appDbContext.Remove(item);
        //    return Save();
        //}

        //public Task<List<CartItem>> GetAll()
        //{
        //    return _appDbContext.Order.ToListAsync();
        //}

        //public Task<CartItem?> GetByIdAsync(int id)
        //{
        //    return _appDbContext.Order
        //        .Include(b => b.Book)
        //        .Include(u => u.User)
        //        .FirstOrDefaultAsync(x => x.Id == id);
        //}

        //public bool Save()
        //{
        //    return _appDbContext.SaveChanges() >= 0 ? true : false;
        //}

        //public bool UpdateOrder(CartItem item)
        //{
        //    _appDbContext.Update(item);
        //    return Save();
        //}
        //public async Task<CartItem> GetCartByIdOfUser(string UserId)
        //{
        //    return await _appDbContext.Order
        //        .Include(o => o.OrderItems)
        //        .ThenInclude(ci => ci.Book)
        //        .FirstOrDefaultAsync(c => c.UserId == UserId);
        //}

        private List<Cart> _carts = new List<Cart>();
        public Cart AddToCart(CartItem item)
        {
            var cart = GetOrCreateCart();
            var existingItem = cart.CartItems.FirstOrDefault(i => i.BookId == item.BookId);
            if (existingItem == null)
            {
                cart.CartItems.Add(item);
            }
            else
            {
                existingItem.Quantity += item.Quantity;
            }
            cart.CartPrice = CalculateTotalPrice(cart);
            return cart;
        }

        public Cart GetCart(int cartId)
        {
            return _carts.FirstOrDefault(c => c.CartId == cartId);
        }

        public Cart RemoveFromCart(int cartId, int bookId)
        {
            var cart = GetCart(cartId);
            if (cart != null)
            {
                var item = cart.CartItems.FirstOrDefault(i => i.BookId == bookId);
                if (item != null)
                {
                    cart.CartItems.Remove(item);
                    cart.CartPrice = CalculateTotalPrice(cart);
                }
            }
            return cart;
        }
        private Cart GetOrCreateCart()
        {
            var cart = _carts.FirstOrDefault();
            if (cart == null)
            {
                cart = new Cart { CartId = _carts.Count + 1 };
                _carts.Add(cart);
            }
            return cart;
        }
        private decimal CalculateTotalPrice(Cart cart)
        {
            // Add logic to calculate the total price based on items in the cart
            return cart.CartItems.Sum(item => item.Quantity * GetBookPrice(item.BookId));
        }

        private decimal GetBookPrice(int bookId)
        {
            // Mocked book price; replace with real logic from your book database
            return 20.0m;
        }
    }
}
