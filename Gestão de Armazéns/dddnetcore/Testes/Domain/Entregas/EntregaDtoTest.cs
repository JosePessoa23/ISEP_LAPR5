using System;
using System.Collections.Generic;
using DDDSample1.Domain.Shared;
using DDDSample1.Domain.Entregas;
using NUnit.Framework;
using Moq;

namespace Testes.Domain.Entregas{

    public class EntregaDtoTest{
        [Test]
        public void testSetParameters(){
            string testIdLoja = "loja matosinhos"; 
            int testTempoCarga = 45;
            int testTempoDescarga = 30;
            int testData = 20221025;
            float testPeso = 25.8F;

            Guid id = new Guid();
            EntregaDto entregaDTO = new EntregaDto(id, testIdLoja, testTempoCarga, testTempoDescarga, testData, testPeso); 
            
            Assert.AreEqual(entregaDTO.Id, id);
            Assert.AreEqual(entregaDTO.IdLoja, testIdLoja);
            Assert.AreEqual(entregaDTO.TempoCarga, testTempoCarga);
            Assert.AreEqual(entregaDTO.TempoDescarga, testTempoDescarga);
            Assert.AreEqual(entregaDTO.Data, testData);
            Assert.AreEqual(entregaDTO.Peso, testPeso);

        }
    
    }

}