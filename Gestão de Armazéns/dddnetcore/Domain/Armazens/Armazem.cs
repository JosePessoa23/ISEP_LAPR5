using System;
using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.Armazens
{
    public class Armazem : Entity<ArmazemId>, IAggregateRoot
    {
        public IdProprio IdProprio { get; private set; }
        public Endereco Endereco { get; private set; }
        public Designacao Designacao { get; private set; }
        public Coordenadas Coordenadas { get; private set; }
        public bool Disponibilidade { get; private set; }
        public bool Active{ get; private set; }

        private Armazem()
        {
            this.Active = true;
        }

        public Armazem(IdProprio idProprio, Endereco endereco, Designacao designacao, float latitude, float longitude, float altitude, bool disponibilidade)
        {
            this.Id = new ArmazemId(Guid.NewGuid());
            this.IdProprio = idProprio;
            this.Endereco = endereco;
            this.Designacao = designacao;
            this.Coordenadas = new Coordenadas(latitude, longitude, altitude);
            this.Disponibilidade=disponibilidade;
            this.Active = true;
        }

        public Armazem(IdProprio idProprio, Endereco endereco, Designacao designacao, Coordenadas coordenadas,bool disponibilidade)
        {
            this.Id = new ArmazemId(Guid.NewGuid());
            this.IdProprio = idProprio;
            this.Endereco = endereco;
            this.Designacao = designacao;
            this.Coordenadas = coordenadas;
            this.Disponibilidade=disponibilidade;
            this.Active = true;
        }

        public void ChangeIdProprio(IdProprio idProprio)
        {
            ThrowInactiveException("o id do armazem");
            this.IdProprio = idProprio;
        }

        public void ChangeEndereco(Endereco endereco)
        {
            ThrowInactiveException("o endereco");
            this.Endereco = endereco;
        }

        public void ChangeDesignacao(Designacao designacao)
        {
            ThrowInactiveException("a designacao");
            this.Designacao = designacao;
        }

        public void ChangeCoordenadas(Coordenadas coordenadas)
        {
            ThrowInactiveException("as coordenadas");
            this.Coordenadas = coordenadas;
        }
        public void ChangeCoordenadas(float latitude, float longitude, float altitude)
        {
            ThrowInactiveException("as coordenadas");
            this.Coordenadas = new Coordenadas(latitude, longitude, altitude);
        }

        public void ChangeDisponibilidade(bool disponibilidade)
        {
            ThrowInactiveException("a disponibilidade");
            this.Disponibilidade = disponibilidade;
        }

        public override bool Equals(Object other){

            //check if same object
            Armazem that = (Armazem) other;
            if (this == that) {
                return true;
            }

            //verify parameters are equal (except id)
            return string.Equals(this.IdProprio.Codigo, that.IdProprio.Codigo) &&
                string.Equals(this.Endereco.ToString(), that.Endereco.ToString()) &&
                string.Equals(this.Designacao.DesignacaoText, that.Designacao.DesignacaoText) &&
                this.Coordenadas.Latitude == that.Coordenadas.Latitude &&
                this.Coordenadas.Longitude == that.Coordenadas.Longitude;
        }

        public override int GetHashCode()
        {
            return this.Id.GetHashCode();
        }

        private void ThrowInactiveException(string subject){
            if (!this.Active)
                throw new BusinessRuleValidationException("Nao e possivel mudar " + subject + " de um armazem inativo");
        }
        
        public void MarkAsInative()
        {
            this.Active = false;
        }

        public void MarkAsActive()
        {
            this.Active = true;
        }

        public override string ToString()
        {
            return "Id: " + this.IdProprio.Codigo + 
                "\nEndereco: " + this.Endereco.ToString() + 
                "\nDesignacao: " + this.Designacao.DesignacaoText + 
                "\nCoordenadas: " + this.Coordenadas.ToString();
        }
    }
}
