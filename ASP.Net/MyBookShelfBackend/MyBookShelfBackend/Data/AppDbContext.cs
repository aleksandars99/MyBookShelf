using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using MyBookShelfBackend.Models;

namespace MyBookShelfBackend.Data
{
    public class AppDbContext : IdentityDbContext<Users>
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<Users> Users { get; set; }
        public DbSet<Books> Books { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<Author> Author { get; set; }
        public DbSet<Cart> Carts { get; set; }
        public DbSet<CartItem> CartItems { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<Books>(entity =>
            {
                entity.Property(e => e.Rating).HasColumnType("decimal(4, 1");
                entity.Property(e => e.Price).HasMaxLength(10);
                entity.Property(e => e.PageNumber).HasMaxLength(5);
                entity.Property(e => e.Alphabet).HasMaxLength(20);
                entity.HasMany(b => b.Comments)
                .WithOne(c => c.book)
                .HasForeignKey(c => c.BookId);

                entity.HasOne(c => c.Author)
                .WithMany(a => a.Books)
                .HasForeignKey(b => b.AuthorId);
            });
            builder.Entity<Users>(entity =>
            {
                entity.HasIndex(e => e.Email).IsUnique();
            });
            builder.Entity<Author>(entity =>
            {
                entity.HasMany(b => b.Books)
                .WithOne(a => a.Author)
                .HasForeignKey(a => a.AuthorId);
            });
            builder.Entity<Cart>(entity =>
            {
                entity.HasMany(c => c.CartItems)
                .WithOne()
                .OnDelete(DeleteBehavior.Cascade);
            });
        }


    }
    public class AppDbContextFactory : IDesignTimeDbContextFactory<AppDbContext>
    {
        public AppDbContext CreateDbContext(string[] args)
        {
            var optionsBuilder = new DbContextOptionsBuilder<AppDbContext>();
            optionsBuilder.UseSqlServer("Data Source=localhost;Initial Catalog=MyBookShelf;Integrated Security=True;Connect Timeout=30;Encrypt=False;Trust Server Certificate=False;Application Intent=ReadWrite;Multi Subnet Failover=False");

            return new AppDbContext(optionsBuilder.Options);
        }
    }

}
