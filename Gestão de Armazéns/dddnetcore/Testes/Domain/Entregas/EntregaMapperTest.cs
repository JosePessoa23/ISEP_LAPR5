using System;
using System.Collections.Generic;
using DDDSample1.Domain.Entregas;
using NUnit.Framework;

namespace Testes.Domain.Entregas{

    public class EntregaMapperTest{
        
        [Test]
        public void testEntregaToDto(){
            string testIdLoja = "loja matosinhos"; 
            int testTempoCarga = 45;
            int testTempoDescarga = 30;
            int testData = 20221025;
            float testPeso = 25.8F;

            Entrega entrega = new Entrega(testIdLoja, testTempoCarga, testTempoDescarga, testData, testPeso);

            EntregaDto entregaDTO = new EntregaDto(entrega.Id.AsGuid(), testIdLoja, testTempoCarga, testTempoDescarga, testData, testPeso);
            EntregaDto entregaDTOMapper = EntregaMapper.toDTO(entrega);

            Assert.AreEqual(entregaDTO.Id, entregaDTOMapper.Id);

        }

        [Test] 
        public void testEntregaToDomain(){
            string testIdLoja = "loja matosinhos"; 
            int testTempoCarga = 45;
            int testTempoDescarga = 30;
            int testData = 20221025;
            float testPeso = 25.8F;

            Guid id = new Guid();
            EntregaDto entregaDTO = new EntregaDto(id, testIdLoja, testTempoCarga, testTempoDescarga, testData, testPeso);
            
            Entrega entregaDomainMapper = EntregaMapper.toDomain(entregaDTO); 
            Entrega entrega = new Entrega(testIdLoja, testTempoCarga, testTempoDescarga, testData, testPeso);

            Assert.AreEqual(entrega.IdLoja.ToString(), entregaDomainMapper.IdLoja.ToString());

        }
    }
}