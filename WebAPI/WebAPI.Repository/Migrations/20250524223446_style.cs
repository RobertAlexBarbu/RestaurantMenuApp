using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace WebAPI.Repository.Migrations
{
    /// <inheritdoc />
    public partial class style : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "MenuItemAccesses",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    MenuItemAccessType = table.Column<string>(type: "text", nullable: false),
                    MenuId = table.Column<int>(type: "integer", nullable: false),
                    MenuCategoryId = table.Column<int>(type: "integer", nullable: false),
                    MenuItemId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MenuItemAccesses", x => x.Id);
                    table.ForeignKey(
                        name: "FK_MenuItemAccesses_MenuCategories_MenuCategoryId",
                        column: x => x.MenuCategoryId,
                        principalTable: "MenuCategories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_MenuItemAccesses_MenuItems_MenuItemId",
                        column: x => x.MenuItemId,
                        principalTable: "MenuItems",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_MenuItemAccesses_Menus_MenuId",
                        column: x => x.MenuId,
                        principalTable: "Menus",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "MenuStyles",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    MenuId = table.Column<int>(type: "integer", nullable: false),
                    UserId = table.Column<int>(type: "integer", nullable: false),
                    ImageUrl = table.Column<string>(type: "text", nullable: true),
                    ThemeColor = table.Column<string>(type: "text", nullable: false),
                    ThemeCss = table.Column<string>(type: "text", nullable: false),
                    Font = table.Column<string>(type: "text", nullable: false),
                    FontCss = table.Column<string>(type: "text", nullable: false),
                    Style = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MenuStyles", x => x.Id);
                    table.ForeignKey(
                        name: "FK_MenuStyles_Menus_MenuId",
                        column: x => x.MenuId,
                        principalTable: "Menus",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_MenuStyles_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_MenuItemAccesses_MenuCategoryId",
                table: "MenuItemAccesses",
                column: "MenuCategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_MenuItemAccesses_MenuId",
                table: "MenuItemAccesses",
                column: "MenuId");

            migrationBuilder.CreateIndex(
                name: "IX_MenuItemAccesses_MenuItemId",
                table: "MenuItemAccesses",
                column: "MenuItemId");

            migrationBuilder.CreateIndex(
                name: "IX_MenuStyles_MenuId",
                table: "MenuStyles",
                column: "MenuId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_MenuStyles_UserId",
                table: "MenuStyles",
                column: "UserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "MenuItemAccesses");

            migrationBuilder.DropTable(
                name: "MenuStyles");
        }
    }
}
