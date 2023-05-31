using System;
using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.Armazens
{
    public class Designacao : IValueObject
    {
        public string DesignacaoText { get; private set; }

        public Designacao(string designacaoText)
        {
            if(designacaoText.Length > 50) 
                throw new BusinessRuleValidationException("A designacao do armazem nao pode ter mais que 50 caracteres.");
                
            this.DesignacaoText = designacaoText;
        }

        public override bool Equals(Object other){

            //check if same object
            Designacao that = (Designacao) other;
            if (this == that) {
                return true;
            }

            //verify parameters are equal
            return string.Equals(this.DesignacaoText, that.DesignacaoText);
        }

        public override int GetHashCode()
        {
            return this.DesignacaoText.GetHashCode();
        }
    }
}
