using System;

namespace DDDSample1.Domain.Entregas
{
    public class EntregaDto
    {
        public Guid Id { get; set; }

        public string IdLoja { get; set; }

        public int TempoCarga { get; set; }

        public int TempoDescarga { get; set; }

        public int Data { get; set; }

        public float Peso { get; set; }

        public EntregaDto(Guid id, string idLoja, int tempoCarga, int tempoDescarga, int data, float peso)
        {
            this.Id = id;
            this.IdLoja = idLoja;
            this.TempoCarga = tempoCarga;
            this.TempoDescarga = tempoDescarga;
            this.Data = data;
            this.Peso = peso;
        }

    }
}