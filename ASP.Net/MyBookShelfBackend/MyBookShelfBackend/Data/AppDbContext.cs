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

        DbSet<Users> Users { get; set; }
        DbSet<Books> Books { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<Books>(entity =>
            {
                entity.Property(e => e.Author).HasMaxLength(50);
                entity.Property(e => e.Rating).HasColumnType("decimal(4, 1");
                entity.Property(e => e.Price).HasMaxLength(10);
                entity.Property(e => e.PageNumber).HasMaxLength(5);
                entity.Property(e => e.Alphabet).HasMaxLength(20);
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
