using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyBookShelfBackend.Data;
using MyBookShelfBackend.Dtos;
using MyBookShelfBackend.Interfaces;
using MyBookShelfBackend.Models;

namespace MyBookShelfBackend.Controllers
{
    [Route(template:"api")]
    [ApiController]
    public class AuthorController : Controller
    {
        private readonly AppDbContext _context;
        private readonly IAuthorRepository _authorRepository;
        public AuthorController(
            AppDbContext appDbContext,
            IAuthorRepository authorRepository
            )
        {
            _context = appDbContext;
            _authorRepository = authorRepository;
        }

        [HttpPost(template:"addAuthor")]
        public IActionResult AddAuthor([FromBody] AddAuthorDto dto)
        {
            var author = new Author
            {
                Name = dto.Name,
                Biography = dto.Biography,
                Image = dto.Image,
                isForeign = dto.isForeign,
            };
            return Created("Created", _authorRepository.AddAuthor(author));
        }
        [HttpPut(template: "editAuthor/{id}")]
        public async Task<IActionResult> EditAuthor(int Id, [FromBody] EditAuthorDto dto)
        {
            var author =  await _authorRepository.GetByIdAsync(Id);
            if (author == null)
            {
                return NotFound("Author not found");
            }

            author.Name = dto.Name;
            author.Biography = dto.Biography;
            author.Image = dto.Image;
            author.isForeign = dto.isForeign;

            _authorRepository.Save();
            return Ok(author);
        }

        [HttpGet(template:"getAuthors")]
        public IActionResult ReturnAuthors()
        {
            var authors = _authorRepository.GetAll();
            return Ok(authors);
        }
        [HttpGet(template:"getAllAuthors")]
        public async Task<IEnumerable<Author>>GetAllAuthors()
        {
            return await _context.Author
                .ToListAsync();
        }

        [HttpGet("getAuthorById/{id}")]
        public async Task<IActionResult> GetAuthor(int id)
        {
            //var author = await _context.Author.FindAsync(id);
            var author =  await _context.Author
                .Include(b => b.Books)
                .FirstOrDefaultAsync(a => a.Id == id);

            if (author == null)
            {
                return NotFound();
            }

            return Ok(author);
        }

        [HttpGet(template: "serbianAuthors")]
        public Task<List<Author>> GetSerbianAuthors()
        {
            return _authorRepository.GetSerbianAuthors();
        }

        [HttpGet(template: "foreignAuthors")]
        public Task<List<Author>> GetForeignAuthors()
        {
            return _authorRepository.GetForeignAuthors();
        }
        [HttpDelete(template:"deleteAuthor/{id}")]
        public async Task<IActionResult> DeleteAuthor(int id)
        {
            var author = await _authorRepository.GetByIdAsync(id);
            if (author == null) return NotFound();
            _context.Author.Remove(author);
            _authorRepository.Save();
            return Ok();
        }
    }
}
