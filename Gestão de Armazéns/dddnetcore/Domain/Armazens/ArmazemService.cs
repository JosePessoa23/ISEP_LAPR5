using System.Threading.Tasks;
using System.Collections.Generic;
using DDDSample1.Domain.Shared;
using System;

namespace DDDSample1.Domain.Armazens
{
    public class ArmazemService : IArmazemService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IArmazemRepository _repo;

        public ArmazemService(IUnitOfWork unitOfWork, IArmazemRepository repo)
        {
            this._unitOfWork = unitOfWork;
            this._repo = repo;
        }

        public async Task<List<ArmazemDto>> GetAllAsync()
        {
            var list = await this._repo.GetAllAsync();
            
            List<ArmazemDto> listDto = list.ConvertAll<ArmazemDto>(arm => ArmazemMapper.toDTO(arm));

            return listDto;
        }

        public async Task<ArmazemDto> GetByIdAsync(ArmazemId id)
        {
            var arm = await this._repo.GetByIdAsync(id);
            
            if(arm == null)
                return null;

            return ArmazemMapper.toDTO(arm);
        }

        public async Task<ArmazemDto> AddAsync(ArmazemDto dto)
        {
            var armazem = ArmazemMapper.toDomain(dto);

            await this._repo.AddAsync(armazem);

            await this._unitOfWork.CommitAsync();

            return ArmazemMapper.toDTO(armazem);
        }

        public async Task<ArmazemDto> UpdateAsync(ArmazemDto dto)
        {
            var armazem = await this._repo.GetByIdAsync(new ArmazemId(dto.Id)); 

            if (armazem == null)
                return null;   

            //mudar todos as informacoes exceto o Id
            //armazem.ChangeIdProprio(dto.IdProprio);
            armazem.ChangeEndereco(
                new Endereco(
                    dto.Morada, 
                    dto.CodigoPostal, 
                    dto.Localidade, 
                    dto.Pais)
            );
            armazem.ChangeDesignacao(
                new Designacao(dto.Designacao)
            );
            armazem.ChangeCoordenadas(
                new Coordenadas(
                    dto.Latitude, 
                    dto.Longitude,
                    dto.Altitude)
            );
            armazem.ChangeDisponibilidade(dto.Disponibilidade);
            
            await this._unitOfWork.CommitAsync();

            return ArmazemMapper.toDTO(armazem);
        }

        public async Task<ArmazemDto> InactivateAsync(ArmazemId id)
        {
            var armazem = await this._repo.GetByIdAsync(id); 

            if (armazem == null)
                return null;   

            // change all fields
            armazem.MarkAsInative();
            
            await this._unitOfWork.CommitAsync();

            return ArmazemMapper.toDTO(armazem);
        }

         public async Task<ArmazemDto> DeleteAsync(ArmazemId id)
        {
            var armazem = await this._repo.GetByIdAsync(id); 

            if (armazem == null)
                return null;   

            if (armazem.Active)
                throw new BusinessRuleValidationException("Nao e possivel eliminar um armazem ativo.");
            
            this._repo.Remove(armazem);
            await this._unitOfWork.CommitAsync();

            return ArmazemMapper.toDTO(armazem);
        }

        public async Task<ArmazemDto> GetByIdProprioAsync(IdProprio id)
        {
            var arm = await this._repo.GetByIdProprioAsync(id);
            
            if(arm == null)
                return null;

            return ArmazemMapper.toDTO(arm);
        }
    }
}