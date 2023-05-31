using System;

namespace DDDSample1.Domain.Armazens
{
    public class ArmazemDto
    {
        public Guid Id { get; set; }
        public string IdProprio { get; set; }
        public string Morada { get; private set; }
        public string CodigoPostal { get; private set; }
        public string Localidade { get; private set; }
        public string Pais { get; private set; }
        public string Designacao { get; set; }
        public float Latitude { get; private set; }
        public float Longitude { get; private set; }
        public float Altitude { get; private set; }

        public bool Disponibilidade { get; private set; }

        public ArmazemDto(Guid id, string idProprio, string morada, string codigoPostal, string localidade, string pais, string designacao, float latitude, float longitude, float altitude,bool disponibilidade){
            this.Id = id;
            this.IdProprio = idProprio;
            this.Morada = morada;
            this.CodigoPostal = codigoPostal;
            this.Localidade = localidade;
            this.Pais = pais;
            this.Designacao = designacao;
            this.Latitude = latitude;
            this.Longitude = longitude;
            this.Altitude = altitude;
            this.Disponibilidade = disponibilidade;
        }
    }
}