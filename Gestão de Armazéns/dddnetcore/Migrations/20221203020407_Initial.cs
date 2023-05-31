using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DDDNetCore.Migrations
{
    public partial class Initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Armazens",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    IdProprio_Codigo = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Endereco_Morada = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Endereco_CodigoPostal = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Endereco_Localidade = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Endereco_Pais = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Designacao_DesignacaoText = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Coordenadas_Latitude = table.Column<float>(type: "real", nullable: true),
                    Coordenadas_Longitude = table.Column<float>(type: "real", nullable: true),
                    Coordenadas_Altitude = table.Column<float>(type: "real", nullable: true),
                    Disponibilidade = table.Column<float>(type: "bit", nullable: true),
                    Active = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Armazens", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Categories",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Active = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Categories", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Entregas",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    IdLoja = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TempoCarga_tempoCarga = table.Column<int>(type: "int", nullable: true),
                    TempoDescarga_tempoDescarga = table.Column<int>(type: "int", nullable: true),
                    Data_data = table.Column<int>(type: "int", nullable: true),
                    Peso_peso = table.Column<float>(type: "real", nullable: true),
                    Active = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Entregas", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Families",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Active = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Families", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Products",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CategoryId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Active = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Products", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Armazens");

            migrationBuilder.DropTable(
                name: "Categories");

            migrationBuilder.DropTable(
                name: "Entregas");

            migrationBuilder.DropTable(
                name: "Families");

            migrationBuilder.DropTable(
                name: "Products");
        }
    }
}
