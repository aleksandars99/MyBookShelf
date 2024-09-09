using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyBookShelfBackend.Data;
using MyBookShelfBackend.Dtos;
using MyBookShelfBackend.Interfaces;
using MyBookShelfBackend.Models;
using System.Security.Claims;

namespace MyBookShelfBackend.Controllers
{
    [Route(template: "order")]
    [ApiController]
    public class OrderController : Controller
    {
        private readonly AppDbContext _context;
        private readonly IOrderRepository _orderRepository;
        private readonly IBookRepository _bookRepository;
        private readonly IUserRepository _userRepository;
        public OrderController(AppDbContext appDbContext, IOrderRepository orderRepository, IBookRepository bookRepository, IUserRepository userRepository) 
        {
            _context = appDbContext;
            _orderRepository = orderRepository;
            _bookRepository = bookRepository;
            _userRepository = userRepository;
        }
        [HttpPost(template:"makeOrder")]
        public async Task<IActionResult> MakeAnOrder(CartItem item)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userId == null)
            {
                return NotFound("User not found");
            }

            var user = _userRepository.GetById(userId);

            if (user == null)
            {
                return NotFound("User not found");
            }

            var cart = _orderRepository.AddToCart(item);

            return Ok(cart);
        }


        [HttpGet("{cartId}")]
        public IActionResult GetCartItems(int cartId)
        {
            var cart = _orderRepository.GetCart(cartId);
            return Ok(cart);
        }

        [HttpDelete("remove/{cartId}/{bookId}")]
        public IActionResult RemoveFromCart(int cartId, int bookId)
        {
            var cart = _orderRepository.RemoveFromCart(cartId, bookId);
            return Ok(cart);
        }

    }
}
