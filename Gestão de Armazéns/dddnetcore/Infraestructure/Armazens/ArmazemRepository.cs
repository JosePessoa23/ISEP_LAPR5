using DDDSample1.Domain.Armazens;
using DDDSample1.Infrastructure.Shared;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace DDDSample1.Infrastructure.Armazens
{
    public class ArmazemRepository : BaseRepository<Armazem, ArmazemId>, IArmazemRepository
    {

        private readonly DbSet<Armazem> _objs;

        private readonly DDDSample1DbContext context;

        public ArmazemRepository(DDDSample1DbContext context):base(context.Armazens)
        {
           this.context=context;
        }

        public async Task<Armazem>  GetByIdProprioAsync(IdProprio idProprio)
        {
            return await this.context.Armazens.FromSqlRaw("SELECT * FROM [dbo].[Armazens] WHERE IdProprio_Codigo = '" + idProprio.Codigo + "' ").FirstOrDefaultAsync();
        }
    }
}