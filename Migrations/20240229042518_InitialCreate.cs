using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AINews.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<string>(type: "text", nullable: false),
                    UserId = table.Column<string>(type: "text", nullable: false),
                    UserName = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AIPosts",
                columns: table => new
                {
                    Id = table.Column<string>(type: "text", nullable: false),
                    Title = table.Column<string>(type: "text", nullable: false),
                    Content = table.Column<string>(type: "text", nullable: false),
                    Url = table.Column<string>(type: "text", nullable: true),
                    UserId = table.Column<string>(type: "text", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP(6)")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AIPosts", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AIPosts_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PostUsers",
                columns: table => new
                {
                    Id = table.Column<string>(type: "text", nullable: false),
                    Value = table.Column<int>(type: "integer", nullable: false),
                    UserId = table.Column<string>(type: "text", nullable: false),
                    PostId = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PostUsers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PostUsers_AIPosts_PostId",
                        column: x => x.PostId,
                        principalTable: "AIPosts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PostUsers_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AIPosts_UserId",
                table: "AIPosts",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_PostUsers_PostId",
                table: "PostUsers",
                column: "PostId");

            migrationBuilder.CreateIndex(
                name: "IX_PostUsers_UserId",
                table: "PostUsers",
                column: "UserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PostUsers");

            migrationBuilder.DropTable(
                name: "AIPosts");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
