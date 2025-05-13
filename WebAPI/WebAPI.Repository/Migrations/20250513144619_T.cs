using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebAPI.Repository.Migrations
{
    /// <inheritdoc />
    public partial class T : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Menus_UserId",
                table: "Menus");

            migrationBuilder.AddColumn<int>(
                name: "MenuId",
                table: "MenuItems",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "MenuId",
                table: "MenuCategories",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Menus_UserId",
                table: "Menus",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_MenuItems_MenuId",
                table: "MenuItems",
                column: "MenuId");

            migrationBuilder.CreateIndex(
                name: "IX_MenuCategories_MenuId",
                table: "MenuCategories",
                column: "MenuId");

            migrationBuilder.AddForeignKey(
                name: "FK_MenuCategories_Menus_MenuId",
                table: "MenuCategories",
                column: "MenuId",
                principalTable: "Menus",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_MenuItems_Menus_MenuId",
                table: "MenuItems",
                column: "MenuId",
                principalTable: "Menus",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MenuCategories_Menus_MenuId",
                table: "MenuCategories");

            migrationBuilder.DropForeignKey(
                name: "FK_MenuItems_Menus_MenuId",
                table: "MenuItems");

            migrationBuilder.DropIndex(
                name: "IX_Menus_UserId",
                table: "Menus");

            migrationBuilder.DropIndex(
                name: "IX_MenuItems_MenuId",
                table: "MenuItems");

            migrationBuilder.DropIndex(
                name: "IX_MenuCategories_MenuId",
                table: "MenuCategories");

            migrationBuilder.DropColumn(
                name: "MenuId",
                table: "MenuItems");

            migrationBuilder.DropColumn(
                name: "MenuId",
                table: "MenuCategories");

            migrationBuilder.CreateIndex(
                name: "IX_Menus_UserId",
                table: "Menus",
                column: "UserId",
                unique: true);
        }
    }
}
