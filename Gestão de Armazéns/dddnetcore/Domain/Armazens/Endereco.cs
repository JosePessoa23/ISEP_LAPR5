using System;
using DDDSample1.Domain.Shared;
using System.Text.RegularExpressions;

namespace DDDSample1.Domain.Armazens
{
    public class Endereco : IValueObject
    {
        public string Morada { get; private set; }
        public string CodigoPostal { get; private set; }
        public string Localidade { get; private set; }
        public string Pais { get; private set; }

        public Endereco(string morada, string codigoPostal, string localidade, string pais)
        {
            if(!Regex.IsMatch(codigoPostal, "^[0-9]{4}[-]{1}[0-9]{3}$"))
                throw new BusinessRuleValidationException("O codigo postal deve ter 8 caracteres: 7 dígitos (4+3) separados por um hífen (-) e sem espaços");

            this.Morada = morada;
            this.CodigoPostal = codigoPostal;
            this.Localidade = localidade;
            this.Pais = pais;
        }

        public override string ToString()
        {
            return this.Morada + "\n" + this.CodigoPostal + ", " + this.Localidade + "\n" + this.Pais;
        }

        public override bool Equals(Object other){

            //check if same object
            Endereco that = (Endereco) other;
            if (this == that) {
                return true;
            }

            //verify parameters are equal
            return string.Equals(this.Morada, that.Morada) &&
                string.Equals(this.CodigoPostal, that.CodigoPostal) &&
                string.Equals(this.Localidade, that.Localidade) &&
                string.Equals(this.Pais, that.Pais);
        }

        public override int GetHashCode()
        {
            return this.Morada.GetHashCode();
        }
    }
}
