using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebAPI.Repository.Migrations
{
    /// <inheritdoc />
    public partial class menuDetails : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "AddressVisible",
                table: "MenuDetails",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "City",
                table: "MenuDetails",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<bool>(
                name: "ContactInformationVisibile",
                table: "MenuDetails",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "Email",
                table: "MenuDetails",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "MonFriClose",
                table: "MenuDetails",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "MonFriOpen",
                table: "MenuDetails",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<bool>(
                name: "OpeningHoursVisible",
                table: "MenuDetails",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "PhoneNumber",
                table: "MenuDetails",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "State",
                table: "MenuDetails",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Street",
                table: "MenuDetails",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "WeekendClose",
                table: "MenuDetails",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "WeekendOpen",
                table: "MenuDetails",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "WifiNetworkName",
                table: "MenuDetails",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<bool>(
                name: "WifiNetworkVisible",
                table: "MenuDetails",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "WifiPassword",
                table: "MenuDetails",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "ZipCode",
                table: "MenuDetails",
                type: "text",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AddressVisible",
                table: "MenuDetails");

            migrationBuilder.DropColumn(
                name: "City",
                table: "MenuDetails");

            migrationBuilder.DropColumn(
                name: "ContactInformationVisibile",
                table: "MenuDetails");

            migrationBuilder.DropColumn(
                name: "Email",
                table: "MenuDetails");

            migrationBuilder.DropColumn(
                name: "MonFriClose",
                table: "MenuDetails");

            migrationBuilder.DropColumn(
                name: "MonFriOpen",
                table: "MenuDetails");

            migrationBuilder.DropColumn(
                name: "OpeningHoursVisible",
                table: "MenuDetails");

            migrationBuilder.DropColumn(
                name: "PhoneNumber",
                table: "MenuDetails");

            migrationBuilder.DropColumn(
                name: "State",
                table: "MenuDetails");

            migrationBuilder.DropColumn(
                name: "Street",
                table: "MenuDetails");

            migrationBuilder.DropColumn(
                name: "WeekendClose",
                table: "MenuDetails");

            migrationBuilder.DropColumn(
                name: "WeekendOpen",
                table: "MenuDetails");

            migrationBuilder.DropColumn(
                name: "WifiNetworkName",
                table: "MenuDetails");

            migrationBuilder.DropColumn(
                name: "WifiNetworkVisible",
                table: "MenuDetails");

            migrationBuilder.DropColumn(
                name: "WifiPassword",
                table: "MenuDetails");

            migrationBuilder.DropColumn(
                name: "ZipCode",
                table: "MenuDetails");
        }
    }
}
