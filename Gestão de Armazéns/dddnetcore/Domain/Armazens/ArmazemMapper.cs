using System;


namespace DDDSample1.Domain.Armazens
{
    public class ArmazemMapper{

        public static ArmazemDto toDTO(Armazem armazem)
        {
            return new ArmazemDto(armazem.Id.AsGuid(), 
                armazem.IdProprio.Codigo,
                armazem.Endereco.Morada,
                armazem.Endereco.CodigoPostal,
                armazem.Endereco.Localidade,
                armazem.Endereco.Pais,
                armazem.Designacao.DesignacaoText, 
                armazem.Coordenadas.Latitude,
                armazem.Coordenadas.Longitude,
                armazem.Coordenadas.Altitude,
                armazem.Disponibilidade);
        }

        public static Armazem toDomain(ArmazemDto armazemDto)
        {
            return new Armazem(new IdProprio(armazemDto.IdProprio),
                new Endereco(
                    armazemDto.Morada, 
                    armazemDto.CodigoPostal, 
                    armazemDto.Localidade, 
                    armazemDto.Pais),
                new Designacao(armazemDto.Designacao),
                new Coordenadas(
                    armazemDto.Latitude, 
                    armazemDto.Longitude,
                    armazemDto.Altitude),
                    armazemDto.Disponibilidade
            );
        }
    }
}