using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebAPI.Repository.Migrations
{
    /// <inheritdoc />
    public partial class menuaccess : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MenuAccesses_Users_UserId",
                table: "MenuAccesses");

            migrationBuilder.DropIndex(
                name: "IX_MenuAccesses_UserId",
                table: "MenuAccesses");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "MenuAccesses");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "MenuAccesses",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_MenuAccesses_UserId",
                table: "MenuAccesses",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_MenuAccesses_Users_UserId",
                table: "MenuAccesses",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
