using DDDSample1.Domain.Armazens;
using DDDSample1.Domain.Shared;
using NUnit.Framework;

namespace Tests.Domain.Armazens{

    public class IdProprioTest{

        [Test]
        public void CreateIdProprioTest()
        {
            //nao alfanumerico
            Assert.Throws<BusinessRuleValidationException>(
                delegate { new IdProprio("-%€"); } 
            );
            //menos de 3 caracteres
            Assert.Throws<BusinessRuleValidationException>(
                delegate { new IdProprio("A1"); } 
            );
            //mais de 3 caracteres
            Assert.Throws<BusinessRuleValidationException>(
                delegate { new IdProprio("A1B2"); } 
            );
        }
    }
}