using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebAPI.Repository.Migrations
{
    /// <inheritdoc />
    public partial class fixreviews : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MenuReviews_Users_UserId",
                table: "MenuReviews");

            migrationBuilder.DropIndex(
                name: "IX_MenuReviews_UserId",
                table: "MenuReviews");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "MenuReviews");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "MenuReviews",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_MenuReviews_UserId",
                table: "MenuReviews",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_MenuReviews_Users_UserId",
                table: "MenuReviews",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
