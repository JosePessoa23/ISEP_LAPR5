using DDDSample1.Domain.Entregas;
using System.Collections.Generic;
using DDDSample1.Infrastructure.Shared;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;


namespace DDDSample1.Infrastructure.Entregas
{
    public class EntregaRepository : BaseRepository<Entrega, EntregaId>, IEntregaRepository
    {

        private readonly DbSet<Entrega> _objs;

        private readonly DDDSample1DbContext context;
    
        public EntregaRepository(DDDSample1DbContext context):base(context.Entregas)
        {
           this.context=context;
        }

        public async Task<List<Entrega>>  GetByDataAsync(Data data)
        {
            return await this.context.Entregas.FromSqlRaw("SELECT * FROM [dbo].[Entregas] WHERE Data_data = " + data.data + " ").ToListAsync();
        }

        public async Task<List<Entrega>>  GetByArmazemAsync(String idArmazem)
        {
            return await this.context.Entregas.FromSqlRaw("SELECT * FROM [dbo].[Entregas] WHERE idLoja = " + idArmazem + " ").ToListAsync();
        }

        public async Task<List<Entrega>> GetOrderByDataAsync()
        {
            return await this.context.Entregas.FromSqlRaw("SELECT * FROM [dbo].[Entregas]").OrderByDescending(e => e.Data.data).ToListAsync();
        }

        public async Task<List<Entrega>> GetOrderByArmazemAsync()
        {
            return await this.context.Entregas.FromSqlRaw("SELECT * FROM [dbo].[Entregas]").OrderBy(e => e.IdLoja).ToListAsync();
        }
    }
}