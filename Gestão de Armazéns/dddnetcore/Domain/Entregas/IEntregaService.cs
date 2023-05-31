using System.Threading.Tasks;
using System.Collections.Generic;
using DDDSample1.Domain.Armazens;

namespace DDDSample1.Domain.Entregas
{
    public interface IEntregaService
    {

        public Task<List<EntregaDto>> GetAllAsync();

        public Task<EntregaDto> GetByIdAsync(EntregaId id);

        public Task<List<EntregaDto>> GetByDataAsync(Data data);

        public Task<List<EntregaDto>> GetByArmazemAsync(IdProprio armazem);

        public Task<List<EntregaDto>> GetOrderByDataAsync();

        public Task<List<EntregaDto>> GetOrderByArmazemAsync();

        public Task<EntregaDto> AddAsync(EntregaDto dto);

        public Task<EntregaDto> UpdateAsync(EntregaDto dto);
        
        public Task<EntregaDto> InactivateAsync(EntregaId id);

         public Task<EntregaDto> DeleteAsync(EntregaId id);
    }
}