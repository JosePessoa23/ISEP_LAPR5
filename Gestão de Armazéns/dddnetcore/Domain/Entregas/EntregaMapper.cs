using System;
using DDDSample1.Domain.Entregas;


namespace DDDSample1.Domain.Entregas
{
    public class EntregaMapper{

        public static EntregaDto toDTO(Entrega entrega)
        {
            return new EntregaDto(entrega.Id.AsGuid(),entrega.IdLoja,entrega.TempoCarga.tempoCarga,entrega.TempoDescarga.tempoDescarga,entrega.Data.data,entrega.Peso.peso);
        }

        public static Entrega toDomain(EntregaDto entregaDto)
        {
            return new Entrega(entregaDto.IdLoja,entregaDto.TempoCarga,entregaDto.TempoDescarga,entregaDto.Data,entregaDto.Peso);
        }
    }
}