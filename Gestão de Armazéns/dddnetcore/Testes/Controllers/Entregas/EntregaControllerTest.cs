/*using System.Threading.Tasks;
using System.Collections.Generic;
using DDDSample1.Domain.Entregas;
using DDDSample1.Controllers;
using NUnit.Framework;
using Moq;
using System.Linq;

namespace Testes.Controllers.Entregas{
    public class EntregaControllerTest{

        private Mock<IEntregaService> _iEntregaservice;
        private EntregasController _controller;
        private EntregaDto _entregaDTO;
        private Entrega _entrega;

        [SetUp]
        public void Setup(){

            string testIdLoja = "loja matosinhos"; 
            int testTempoCarga = 45;
            int testTempoDescarga = 30;
            int testData = 20221025;
            float testPeso = 25.8F;

            this._entrega = new Entrega(testIdLoja, testTempoCarga, testTempoDescarga, testData, testPeso);
            this._entregaDTO = EntregaMapper.toDTO(_entrega);

            this._iEntregaservice = new Mock<IEntregaService>();

            this._iEntregaservice.Setup(x => x.AddAsync(It.IsAny<EntregaDto>()));
            this._iEntregaservice.Setup(x => x.GetAllAsync()).ReturnsAsync(new List<EntregaDto>(){_entregaDTO});
            this._iEntregaservice.Setup(x => x.GetByIdAsync(It.IsAny<EntregaId>()));
            this._iEntregaservice.Setup(x => x.GetByIdAsync(new EntregaId(_entrega.Id.AsGuid()))).Returns(Task.FromResult(this._entregaDTO));
            this._iEntregaservice.Setup(x => x.UpdateAsync(It.IsAny<EntregaDto>()));
            this._iEntregaservice.Setup(x => x.UpdateAsync(_entregaDTO)).Returns(Task.FromResult(this._entregaDTO));

            this._controller = new EntregasController(this._iEntregaservice.Object);
        }

        [Test]
        public void GetAllTest(){

            var result = this._controller.GetAll().Result;

            var expected = result.Value.First();
            var actual = _entregaDTO;

            Assert.True(expected.Equals(actual));
        }

        [Test]
        public void GetByIdTest(){

            //get GetByIdAsync resulting Task<ArmazemDto>
            var result = this._controller.GetGetById(_entrega.Id.AsGuid()).Result.Value;

            //check if _armazem is the result
            Assert.True(_entrega.Equals(new Entrega(result.IdLoja, result.TempoCarga, result.TempoDescarga, result.Data, result.Peso)));
        }
    }
}*/