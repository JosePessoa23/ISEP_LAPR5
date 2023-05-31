using System;
using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.Entregas{

    public class TempoDescarga : IValueObject{

        public int tempoDescarga { get; private set; }

        public TempoDescarga(int tempoDescarga){
            if(tempoDescarga <= 0) throw new BusinessRuleValidationException("O tempo de descarga tem de ser positivo.");
            this.tempoDescarga = tempoDescarga;
        }
    }
}