using DDDSample1.Domain.Armazens;
using DDDSample1.Domain.Shared;
using NUnit.Framework;

namespace Tests.Domain.Armazens{

    public class DesignacaoTest{

        [Test]
        public void CreateDesignacaoTest()
        {
            //mais de 50 caracteres
            Assert.Throws<BusinessRuleValidationException>(
                delegate { new Designacao("123456789012345678901234567890123456789012345678901"); } 
            );
        }
    }
}