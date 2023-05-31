using System;
using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.Entregas{

    public class Data : IValueObject{

        public int data { get; private set; }

        public Data(int data){
            if(data <= 0) throw new BusinessRuleValidationException("A data tem de ser positivo.");
            this.data = data;
        }
    }
}