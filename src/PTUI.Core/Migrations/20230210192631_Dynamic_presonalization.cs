using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PTUI.Core.Migrations
{
    public partial class Dynamic_presonalization : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "DynamicPersonalizations",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    AnswerId = table.Column<Guid>(type: "uuid", nullable: false),
                    Type = table.Column<string>(type: "text", nullable: false),
                    SubType = table.Column<string>(type: "text", nullable: false),
                    SubSubType = table.Column<string>(type: "text", nullable: false),
                    Target = table.Column<string>(type: "text", nullable: false),
                    BestValue = table.Column<string>(type: "text", nullable: false),
                    AverageValue = table.Column<string>(type: "text", nullable: false),
                    WorstValue = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DynamicPersonalizations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DynamicPersonalizations_PersonalizationQuestionAnswers_Answ~",
                        column: x => x.AnswerId,
                        principalTable: "PersonalizationQuestionAnswers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_DynamicPersonalizations_AnswerId",
                table: "DynamicPersonalizations",
                column: "AnswerId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DynamicPersonalizations");
        }
    }
}
