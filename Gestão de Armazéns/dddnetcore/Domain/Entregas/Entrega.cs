using System;
using DDDSample1.Domain.Shared;
using DDDSample1.Domain.Armazens;

namespace DDDSample1.Domain.Entregas
{
    public class Entrega : Entity<EntregaId>, IAggregateRoot
    {
        public string IdLoja { get; private set; }

        //TempoCarga e TempoDescarga são em minutos
        public TempoCarga TempoCarga { get; private set; }
        public TempoDescarga TempoDescarga { get; private set; }

        public Data Data { get; private set; }

        public Peso Peso { get; private set; }

        public bool Active{ get; private set; }

        private Entrega()
        {
            this.Active = true;
        }

        public Entrega(string idLoja, int tempoCarga, int tempoDescarga, int data, float peso)
        {
            this.Id = new EntregaId(Guid.NewGuid());
            this.IdLoja = idLoja;
            this.TempoCarga = new TempoCarga (tempoCarga);
            this.TempoDescarga = new TempoDescarga (tempoDescarga);
            this.Data = new Data (data);
            this.Peso = new Peso (peso);
            this.Active = true;
        }

        public void ChangeIdLoja(string idLoja)
        {
            ThrowInactiveException("o id da loja");
            this.IdLoja = idLoja;
        }

        public void ChangeTempoCarga(int tempoCarga)
        {
            ThrowInactiveException("o tempo de carga");
            this.TempoCarga = new TempoCarga (tempoCarga);
        }

        public void ChangeTempoCarga(TempoCarga tempoCarga)
        {
            ThrowInactiveException("o tempo de carga");
            this.TempoCarga = tempoCarga;
        }

        public void ChangeTempoDescarga(int tempoDescarga)
        {
            ThrowInactiveException("o tempo de descarga");
            this.TempoDescarga = new TempoDescarga (tempoDescarga);
        }

        public void ChangeTempoDescarga(TempoDescarga tempoDescarga)
        {
            ThrowInactiveException("o tempo de descarga");
            this.TempoDescarga = tempoDescarga;
        }

        public void ChangeData(int data)
        {
            ThrowInactiveException("a data");
            this.Data = new Data (data);
        }

        public void ChangeData(Data data)
        {
            ThrowInactiveException("a data");
            this.Data = data;
        }


        public void ChangePeso(float peso)
        {
            ThrowInactiveException("o peso");
            this.Peso = new Peso (peso);
        }

        public void ChangePeso(Peso peso)
        {
            ThrowInactiveException("o peso");
            this.Peso = peso;
        }

        private void ThrowInactiveException(string subject){
            if (!this.Active)
                throw new BusinessRuleValidationException("Nao é possível mudar " + subject + " de uma entrega inativa.");
        }
        
        public void MarkAsInative()
        {
            this.Active = false;
        }

         public override bool Equals(Object other){

            //check if same object
            Entrega that = (Entrega) other;
            if (this == that) {
                return true;
            }

            //verify parameters are equal (except id)
            return string.Equals(this.IdLoja, that.IdLoja) &&
                this.TempoCarga.tempoCarga == that.TempoCarga.tempoCarga &&
                this.TempoDescarga.tempoDescarga == that.TempoDescarga.tempoDescarga &&
                this.Data.data == that.Data.data &&
                this.Peso.peso == that.Peso.peso;
        }

        public override int GetHashCode()
        {
            return this.Id.GetHashCode();
        }

    }

}