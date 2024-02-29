using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AINews.Migrations
{
    /// <inheritdoc />
    public partial class updateAiposts : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AIPosts_Users_UserId",
                table: "AIPosts");

            migrationBuilder.AlterColumn<string>(
                name: "UserId",
                table: "AIPosts",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AddForeignKey(
                name: "FK_AIPosts_Users_UserId",
                table: "AIPosts",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AIPosts_Users_UserId",
                table: "AIPosts");

            migrationBuilder.AlterColumn<string>(
                name: "UserId",
                table: "AIPosts",
                type: "text",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_AIPosts_Users_UserId",
                table: "AIPosts",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
