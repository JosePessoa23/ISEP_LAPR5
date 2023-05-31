using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using DDDSample1.Domain.Armazens;

namespace DDDSample1.Infrastructure.Armazens
{
    internal class ArmazemEntityTypeConfiguration : IEntityTypeConfiguration<Armazem>
    {
        public void Configure(EntityTypeBuilder<Armazem> builder)
        {            
            //builder.ToTable("Armazens", SchemaNames.DDDSample1);
            builder.HasKey(b => b.Id);
            //builder.Property<bool>("_active").HasColumnName("Active");
            builder.OwnsOne(b => b.IdProprio);
            builder.OwnsOne(b => b.Endereco);
            builder.OwnsOne(b => b.Designacao);
            builder.OwnsOne(b => b.Coordenadas);
        }
    }
}