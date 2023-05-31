using System;
using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.Entregas{

    public class Peso : IValueObject{

        public float peso { get; private set; }

        public Peso(float peso){
            if(peso <= 0.0F) throw new BusinessRuleValidationException("O peso tem de ser positivo.");
            this.peso = peso;
        }
    }
}