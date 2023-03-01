using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PTUI.Core.Migrations
{
    public partial class Add_UserAnswers_Version : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Version",
                table: "UserAnswers",
                type: "integer",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Version",
                table: "UserAnswers");
        }
    }
}
