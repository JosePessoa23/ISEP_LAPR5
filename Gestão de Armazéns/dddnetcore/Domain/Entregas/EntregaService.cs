using System.Threading.Tasks;
using System.Collections.Generic;
using DDDSample1.Domain.Shared;
using Microsoft.AspNetCore.Mvc;
using System;
using DDDSample1.Domain.Armazens;

namespace DDDSample1.Domain.Entregas
{
    public class EntregaService : IEntregaService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IEntregaRepository _repo;

        public EntregaService(IUnitOfWork unitOfWork, IEntregaRepository repo)
        {
            this._unitOfWork = unitOfWork;
            this._repo = repo;
        }

        public async Task<List<EntregaDto>> GetAllAsync()
        {
            var list = await this._repo.GetAllAsync();
            
            List<EntregaDto> listEntregaDto = list.ConvertAll<EntregaDto>(entrega => EntregaMapper.toDTO(entrega));

            return listEntregaDto;
        }

        public async Task<EntregaDto> GetByIdAsync(EntregaId id)
        {
            var entrega = await this._repo.GetByIdAsync(id);
            
            if(entrega == null)
                return null;

            return EntregaMapper.toDTO(entrega);
        }

        public async Task<List<EntregaDto>> GetByDataAsync(Data data)
        {
            var entregaList = await this._repo.GetByDataAsync(data);

            return entregaList.ConvertAll<EntregaDto>(entrega => EntregaMapper.toDTO(entrega));
            
        }

        public async Task<List<EntregaDto>> GetByArmazemAsync(IdProprio armazem)
        {
            var entregaList = await this._repo.GetByArmazemAsync(armazem.Codigo);

            return entregaList.ConvertAll<EntregaDto>(entrega => EntregaMapper.toDTO(entrega));
        }

        
        public async Task<List<EntregaDto>> GetOrderByDataAsync()
        {
            var entregaList = await this._repo.GetOrderByDataAsync();
            
            return entregaList.ConvertAll<EntregaDto>(entrega => EntregaMapper.toDTO(entrega));
        }

        public async Task<List<EntregaDto>> GetOrderByArmazemAsync()
        {
            var entregaList = await this._repo.GetOrderByArmazemAsync();

            return entregaList.ConvertAll<EntregaDto>(entrega => EntregaMapper.toDTO(entrega));
        }

        public async Task<EntregaDto> AddAsync(EntregaDto dto)
        {
            var entrega = EntregaMapper.toDomain(dto);

            await this._repo.AddAsync(entrega);

            await this._unitOfWork.CommitAsync();

            return EntregaMapper.toDTO(entrega);
        }

        public async Task<EntregaDto> UpdateAsync(EntregaDto dto)
        {
            var entrega = await this._repo.GetByIdAsync(new EntregaId(dto.Id)); 

            if (entrega == null)
                return null;   

            // change all field
            entrega.ChangeIdLoja(dto.IdLoja);
            entrega.ChangeTempoCarga(dto.TempoCarga);
            entrega.ChangeTempoDescarga(dto.TempoDescarga);
            entrega.ChangeData(dto.Data);
            entrega.ChangePeso(dto.Peso);
            
            await this._unitOfWork.CommitAsync();

            return EntregaMapper.toDTO(entrega);
        }

        public async Task<EntregaDto> InactivateAsync(EntregaId id)
        {
            var entrega = await this._repo.GetByIdAsync(id); 

            if (entrega == null)
                return null;   

            // change all fields
            entrega.MarkAsInative();
            
            await this._unitOfWork.CommitAsync();

            return EntregaMapper.toDTO(entrega);
        }

         public async Task<EntregaDto> DeleteAsync(EntregaId id)
        {
            
            var entrega = await this._repo.GetByIdAsync(id); 

            if (entrega == null)
                return null;   

            if (entrega.Active)
                throw new BusinessRuleValidationException("Nao é possível eliminar uma entrega ativa.");
            
            this._repo.Remove(entrega);
            await this._unitOfWork.CommitAsync();

            return EntregaMapper.toDTO(entrega);
        }

    }
}