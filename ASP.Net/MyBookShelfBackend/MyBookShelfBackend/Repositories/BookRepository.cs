﻿using MyBookShelfBackend.Data;
using MyBookShelfBackend.Interfaces;
using MyBookShelfBackend.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http.HttpResults;

namespace MyBookShelfBackend.Repositories
{
    public class BookRepository : IBookRepository
    {
        private readonly AppDbContext _context;

        public BookRepository(AppDbContext appDbContext) 
        {
            _context = appDbContext;
        }

        public bool CreateBook(Books book)
        {
            _context.Books.Add(book);
            return Save();
        }

        public bool DeleteBook(Books book)
        {
            _context.Books.Remove(book);
            return Save();
        }

        public async Task<List<Books>> GetAllBooks()
        {
            return await _context.Books.OrderBy(n => n.Title).ToListAsync();
        }

        public ICollection<Books> GetByAuthor(string author)
        {
            return _context.Books.Where(b => b.Author.Name == author).ToList();
        }

        public async Task<Books> GetBooksByIsbn(string isbn)
        {
            return await _context.Books
                .Include(b=>b.Comments)
                .FirstOrDefaultAsync(b => b.ISBN == isbn);
        }

        public bool Save()
        {
            return _context.SaveChanges() >=0 ? true : false;
        }

        public bool UpdateBook(Books book)
        {
            _context.Books.Update(book);
            return Save();
        }
    }
}
