using DDDSample1.Domain.Armazens;
using DDDSample1.Domain.Shared;
using NUnit.Framework;

namespace Tests.Domain.Armazens{

    public class CoordenadasTest{

        [Test]
        public void CreateCoordenadasTest()
        {
            //fora de bounds para latitude (-90 < x < 90)
            Assert.Throws<BusinessRuleValidationException>(
                delegate { new Coordenadas(-91, 0, 0); } 
            );
            Assert.Throws<BusinessRuleValidationException>(
                delegate { new Coordenadas(91, 0, 0); } 
            );
            //fora de bounds para longitude (-180 < x < 180)
            Assert.Throws<BusinessRuleValidationException>(
                delegate { new Coordenadas(0, -181, 0); } 
            );
            Assert.Throws<BusinessRuleValidationException>(
                delegate { new Coordenadas(0, 181, 0); } 
            );
        }
    }
}