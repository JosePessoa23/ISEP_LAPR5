using System;
using System.Threading.Tasks;
using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.Armazens
{
    public interface IArmazemRepository:IRepository<Armazem,ArmazemId>
    {
        Task<Armazem> GetByIdProprioAsync(IdProprio idProprio);
    }
}