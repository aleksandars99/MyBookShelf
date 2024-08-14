using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyBookShelfBackend.Data;
using MyBookShelfBackend.Dtos;
using MyBookShelfBackend.Interfaces;
using MyBookShelfBackend.Models;
using MyBookShelfBackend.Services;
using System.ComponentModel.DataAnnotations;

namespace MyBookShelfBackend.Controllers
{
    [Route(template: "api")]
    [ApiController]
    public class BookController : Controller
    {
        private readonly AppDbContext _context;
        private readonly IBookRepository _bookRepository;
        private readonly IPhotoService _photoService;
        private readonly ICommentRepository _commentRepository;
        private readonly SignInManager<Users> _signInManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly UserManager<Users> _userManager;
        public BookController(
            AppDbContext appDbContext, 
            IBookRepository bookRepository, 
            IPhotoService photo,
            ICommentRepository commentRepository, 
            SignInManager<Users> signInManager, 
            RoleManager<IdentityRole> roleManager,
            UserManager<Users> userManager
            )
        {
            _context = appDbContext;
            _bookRepository = bookRepository;
            _photoService = photo;
            _commentRepository = commentRepository;
            _signInManager = signInManager;
            _roleManager = roleManager;
            _userManager = userManager;
        }
        [HttpPost(template: "create")]
        public async Task<IActionResult> Create ([FromBody] AddBookDto dto)
        {
            //var res = await _photoService.AddPhotoAsync(dto.Image);
            Console.WriteLine(await _photoService.AddPhotoAsync(dto.Image));

            var book = new Books
            {
                Title = dto.Title,
                Description = dto.Description,
                Image = /*res.Url.ToString(),*/ dto.Image,
                Author = dto.Author,
                Price = dto.Price,
                Categories = dto.Categories,
                Edition = dto.Edition,
                PageNumber = dto.PageNumber,
                Alphabet = dto.Alphabet,
                ReleaseDate = dto.ReleaseDate,
                YoutubeLink = dto.YoutubeLink,
                ISBN = dto.ISBN
            };
            return Created("Success", _bookRepository.CreateBook(book));
        }
        [HttpGet(template:"AllBooks")]
        public async Task<IActionResult> GetAll()
        {
            var books = await _bookRepository.GetAllBooks();
            return Ok(books);
        }
        [HttpGet(template:"GetAll")]
        public async Task<IEnumerable<Books>>GetallBooks()
        {
            return await _context.Books
                .Include(b => b.Comments)
                .ToListAsync();
        }
        [HttpPut(template:"edit/{isbn}")]
        public async Task<IActionResult> Edit (string isbn,[FromBody] EditBookDto dto)
        {

            //var book = _context.Books.Find(isbn);
            //var book = await _bookRepository.GetBooksByIsbn(isbn);

            //var image =  await _photoService.AddPhotoAsync(dto.Image);
            //if (book is null)
            //{
            //    return NotFound();
            //}
            var book = await _bookRepository.GetBooksByIsbn(isbn);
            if (book == null) return NotFound();
            book.Title = dto.Title;
            book.Description = dto.Description;
            book.Author = dto.Author;
            book.Price = dto.Price;
            book.Categories = dto.Categories;
            book.Edition = dto.Edition;
            book.PageNumber = dto.PageNumber;
            book.Alphabet = dto.Alphabet;
            book.ReleaseDate = dto.ReleaseDate;
            book.ISBN = dto.ISBN;

            _bookRepository.Save();
            return Ok(book);
        }
        //[HttpDelete(template:"delete/{id}")]
        //public IActionResult Delete(int id)
        //{
        //    var book = _context.Books.Find(id);

        //    if (book is null)
        //    {
        //        return NotFound();
        //    }

        //    _context.Books.Remove(book);
        //    _bookRepository.Save();

        //    return Ok();
        //}
        [HttpDelete(template:"delete/{isbn}")]
        public async Task<IActionResult> Delete(string isbn)
        {
            var book = await _bookRepository.GetBooksByIsbn(isbn);
            if (book == null) return NotFound();
            _context.Books.Remove(book);
            _bookRepository.Save();
            return Ok();

        }

        [HttpGet(template:"getBook/{isbn}")]
        public async Task<IActionResult>GetBookByIsbn (string isbn)
        {
           var res = await _bookRepository.GetBooksByIsbn(isbn);
            if (res == null) return NotFound();
            return Ok(res);
        }

        [HttpPost(template:"addComment")]
        public async Task<IActionResult>AddComment(AddCommentDto dto)
        {
            if (ModelState.IsValid)
            {
                Users u = await _userManager.GetUserAsync(User);
                var comment = new Comment
                {
                    text = dto.Text,
                    TimeCreated = DateTime.Now,
                    UserName = u.UserName,
                    BookId = dto.BookId,
                };
                _context.Add(comment);
                await _context.SaveChangesAsync();
            }
            return BadRequest(ModelState);
            //var cat = await _bookRepository.GetBooksByIsbn(isbn);
            //if (cat == null) return NotFound();
            //if (cat == null)
            //{
            //    cat.Comments = new List<string>();
            //} 
            //cat.Comments.

        }
    } 
}
