using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using DDDSample1.Domain.Entregas;

namespace DDDSample1.Infrastructure.Entregas
{
    internal class EntregaEntityTypeConfiguration : IEntityTypeConfiguration<Entrega>
    {
        public void Configure(EntityTypeBuilder<Entrega> builder)
        {            
            //builder.ToTable("Entregas", SchemaNames.DDDSample1);
            builder.HasKey(b => b.Id);
            //builder.Property<bool>("_active").HasColumnName("Active");
            builder.OwnsOne(b => b.TempoCarga);
            builder.OwnsOne(b => b.TempoDescarga);
            builder.OwnsOne(b => b.Data);
            builder.OwnsOne(b => b.Peso);
        }
    }
}