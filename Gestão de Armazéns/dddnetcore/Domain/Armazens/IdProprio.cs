using System;
using DDDSample1.Domain.Shared;
using System.Text.RegularExpressions;

namespace DDDSample1.Domain.Armazens
{
    public class IdProprio : IValueObject
    {
        public string Codigo { get; private set; }

        public IdProprio(string codigo)
        {            
            if(codigo.Length != 3) 
                throw new BusinessRuleValidationException("O identificador tem de ser um codigo alfanumerico com 3 caracteres");

            if (!Regex.IsMatch(codigo, "^[a-zA-Z0-9]*$")) {
                throw new BusinessRuleValidationException("O identificador tem de ser um codigo alfanumerico");
            }
                
            this.Codigo = codigo;
        }

        public override bool Equals(Object other){

            //check if same object
            IdProprio that = (IdProprio) other;
            if (this == that) {
                return true;
            }

            //verify parameters are equal
            return string.Equals(this.Codigo, that.Codigo);
        }

        public override int GetHashCode()
        {
            return this.Codigo.GetHashCode();
        }
    }
}
