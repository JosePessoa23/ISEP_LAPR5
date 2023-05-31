using DDDSample1.Domain.Armazens;
using DDDSample1.Domain.Shared;
using NUnit.Framework;

namespace Tests.Domain.Armazens{

    public class EnderecoTest{

        [Test]
        public void CreateEnderecoTest()
        {
            //Codigo Postal errado
            Assert.Throws<BusinessRuleValidationException>(
                delegate { new Endereco("Travessa das Ribeiras, 71", "123", "Matosinhos", "Portugal"); } 
            );
        }
    }
}