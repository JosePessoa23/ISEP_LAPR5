using System.Threading.Tasks;
using System.Collections.Generic;
using DDDSample1.Domain.Shared;
using System;

namespace DDDSample1.Domain.Armazens
{
    public interface IArmazemService
    {
        public Task<List<ArmazemDto>> GetAllAsync();

        public Task<ArmazemDto> GetByIdAsync(ArmazemId id);

        public Task<ArmazemDto> GetByIdProprioAsync(IdProprio id);

        public Task<ArmazemDto> AddAsync(ArmazemDto dto);

        public Task<ArmazemDto> UpdateAsync(ArmazemDto dto);

        public Task<ArmazemDto> InactivateAsync(ArmazemId id);

         public Task<ArmazemDto> DeleteAsync(ArmazemId id);
    }
}