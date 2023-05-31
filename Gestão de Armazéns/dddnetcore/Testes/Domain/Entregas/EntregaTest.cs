using System.Collections.Generic;
using DDDSample1.Domain.Entregas;
using System;
using NUnit.Framework;
using DDDSample1.Domain.Shared;


namespace Testes.Domain.Entregas{
    public class EntregaTest{

        string testIdLoja;
        int testTempoCarga;

        int testTempoDescarga;

        int testData;

        float testPeso;

        private Entrega _entrega;
        private EntregaDto _entregaDTO;

        [SetUp]
        public void Setup(){

            //dummy armazem info
            testIdLoja = "Loja Matosinhos";
            testTempoCarga = 45;
            testTempoDescarga = 30;
            testData = 20221025;
            testPeso = 25.8F;

            //instantiate armazem & armazemDto
            this._entrega = new Entrega(testIdLoja,testTempoCarga,testTempoDescarga,testData,testPeso);
            this._entregaDTO = EntregaMapper.toDTO(_entrega);
        }

        [Test]
        public void testSetParameters(){
            Assert.AreEqual(_entrega.IdLoja.ToString(), testIdLoja);
            Assert.AreEqual(_entrega.TempoCarga.tempoCarga, testTempoCarga);
            Assert.AreEqual(_entrega.TempoDescarga.tempoDescarga, testTempoDescarga);
            Assert.AreEqual(_entrega.Data.data, testData);
            Assert.AreEqual(_entrega.Peso.peso, testPeso);
        }

        [Test]
        public void EqualsTest(){
            Assert.True(this._entrega.Equals(
                new Entrega(
                    _entregaDTO.IdLoja,
                    _entregaDTO.TempoCarga,
                    _entregaDTO.TempoDescarga,
                    _entregaDTO.Data, 
                    _entregaDTO.Peso)));
        }

        [Test]
        public void ChangeWhileInativeTest(){
            _entrega.MarkAsInative();

            Assert.Throws<BusinessRuleValidationException>(delegate {_entrega.ChangeIdLoja("something");} );
            Assert.Throws<BusinessRuleValidationException>(delegate {_entrega.ChangeTempoCarga(23);} );
            Assert.Throws<BusinessRuleValidationException>(delegate {_entrega.ChangeTempoDescarga(23);} );
            Assert.Throws<BusinessRuleValidationException>(delegate {_entrega.ChangeData(20201226);} );
            Assert.Throws<BusinessRuleValidationException>(delegate {_entrega.ChangePeso(80.9F);} );
        }
    }
}