using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MyBookShelfBackend.Migrations
{
    /// <inheritdoc />
    public partial class BookBooleans : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsNew",
                table: "Books",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "isTrending",
                table: "Books",
                type: "bit",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsNew",
                table: "Books");

            migrationBuilder.DropColumn(
                name: "isTrending",
                table: "Books");
        }
    }
}
