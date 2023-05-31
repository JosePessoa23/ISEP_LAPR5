using System;
using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.Entregas{

    public class TempoCarga : IValueObject{

        public int tempoCarga { get; private set; }

        public TempoCarga(int tempoCarga){
            if(tempoCarga <= 0) throw new BusinessRuleValidationException("O tempo de carga tem de ser positivo.");
            this.tempoCarga = tempoCarga;
        }
    }
}