using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Mvc;
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
        public BookController(AppDbContext appDbContext, IBookRepository bookRepository, IPhotoService photo)
        {
            _context = appDbContext;
            _bookRepository = bookRepository;
            _photoService = photo;
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
        [HttpPut("{id}")]
        public async Task<IActionResult> Edit (int id, EditBookDto dto)
        {
            var book = _context.Books.Find(id);
            var image =  await _photoService.AddPhotoAsync(dto.Image);
            if (book is null)
            {
                return NotFound();
            }
            book.Title = dto.Title;
            book.Description = dto.Description;
            book.Author = dto.Author;
            book.Rating = dto.Rating;
            book.Price = dto.Price;
            book.Image = image.Url.ToString();
            book.Comments = dto.Comments;
            book.Categories = dto.Categories;
            book.Edition = dto.Edition;
            book.PageNumber = dto.PageNumber;
            book.Alphabet = dto.Alphabet;
            book.ReleaseDate = dto.ReleaseDate;
            book.YoutubeLink = dto.YoutubeLink;
            book.ISBN = dto.ISBN;

            _bookRepository.Save();
            return Ok(book);
        }
        [HttpDelete(template:"delete/{id}")]
        public IActionResult Delete(int id)
        {
            var book = _context.Books.Find(id);

            if (book is null)
            {
                return NotFound();
            }

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
    } 
}
