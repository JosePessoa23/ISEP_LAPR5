using System.Collections.Generic;
using DDDSample1.Domain.Shared;
using System.Threading.Tasks;
using System;

namespace DDDSample1.Domain.Entregas
{
    public interface IEntregaRepository:IRepository<Entrega,EntregaId>
    {
        Task<List<Entrega>>  GetByDataAsync(Data data);

        Task<List<Entrega>>  GetByArmazemAsync(String armazemId);

        Task<List<Entrega>> GetOrderByDataAsync();

        Task<List<Entrega>> GetOrderByArmazemAsync();
    }
}