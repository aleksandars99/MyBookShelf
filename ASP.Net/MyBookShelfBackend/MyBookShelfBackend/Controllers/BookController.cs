using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyBookShelfBackend.Data;
using MyBookShelfBackend.Dtos;
using MyBookShelfBackend.Helpers;
using MyBookShelfBackend.Interfaces;
using MyBookShelfBackend.Models;
using MyBookShelfBackend.Repositories;
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
        private readonly IUserRepository _userRepository;
        private readonly JwtService _jwtService;
        private readonly IAuthorRepository _authorRepository;
        public BookController(
            AppDbContext appDbContext, 
            IBookRepository bookRepository, 
            IPhotoService photo,
            ICommentRepository commentRepository, 
            SignInManager<Users> signInManager, 
            RoleManager<IdentityRole> roleManager,
            UserManager<Users> userManager,
            IUserRepository userRepository,
            JwtService jwtService,
            IAuthorRepository authorRepository
            )
        {
            _context = appDbContext;
            _bookRepository = bookRepository;
            _photoService = photo;
            _commentRepository = commentRepository;
            _signInManager = signInManager;
            _roleManager = roleManager;
            _userManager = userManager;
            _userRepository = userRepository;
            _jwtService = jwtService;
            _authorRepository = authorRepository;
        }
        [HttpPost(template: "create")]
        public async Task<IActionResult> Create ([FromBody] AddBookDto dto)
        {
            //var res = await _photoService.AddPhotoAsync(dto.Image);
            Console.WriteLine(await _photoService.AddPhotoAsync(dto.Image));

            var author = await _authorRepository.GetByIdAsync(dto.AuthorId);
            if (author == null) { return NotFound("Author not found"); }

            var book = new Books
            {
                Title = dto.Title,
                Description = dto.Description,
                Image = /*res.Url.ToString(),*/ dto.Image,
                Author = author,
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
        //[HttpGet(template:"AllBooks")]
        //public async Task<IActionResult> GetAll()
        //{
        //    var books = await _bookRepository.GetAllBooks();
        //    return Ok(books);
        //}
        [HttpGet(template:"GetAll")]
        public async Task<IEnumerable<Books>>GetallBooks()
        {
            return await _context.Books
                .Include(b => b.Comments)
                .Include(b => b.Author)
                .ToListAsync();
        }
        [HttpPut(template:"edit/{isbn}")]
        public async Task<IActionResult> Edit (string isbn,[FromBody] EditBookDto dto)
        {
            var author = await _authorRepository.GetByIdAsync(dto.AuthorId);
            if (author == null) { return NotFound("Author not found"); }

            var book = await _bookRepository.GetBooksByIsbn(isbn);
            if (book == null) return NotFound();
            book.Title = dto.Title;
            book.Description = dto.Description;
            book.Author = author;
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
        public async Task<Books?>GetBookByIsbn (string isbn)
        {
            //var res = await _bookRepository.GetBooksByIsbn(isbn);
            //if (res == null) return NotFound();
            //return Ok(res);
            return await _context.Books
                .Include(b => b.Author)
                .FirstOrDefaultAsync(b => b.ISBN == isbn);
        }

        [HttpPost(template:"addComment")]
        public async Task<IActionResult>AddComment(AddCommentDto dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var jwt = Request.Cookies["jwt"];
            var token = _jwtService.Verify(jwt);
            var userId = token.Issuer;

            var user = _userRepository.GetById(userId);
            //var user = await _userRepository.GetById(user.Id);
            if (user == null) return Unauthorized("user not found");
            var comment = new Comment
            {
                text = dto.Text,
                TimeCreated = DateTime.Now,
                UserName = user.UserName,
                BookId = dto.BookId,
            };
            _context.Add(comment);
            await _context.SaveChangesAsync();
            return Ok(comment);
            //return BadRequest(ModelState);
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
