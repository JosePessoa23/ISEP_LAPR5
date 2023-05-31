using System.Threading.Tasks;
using System.Collections.Generic;
using DDDSample1.Domain.Shared;
using DDDSample1.Domain.Entregas;
using System;
using NUnit.Framework;
using Moq;

namespace Testes.Domain.Entregas{
    public class EntregaServiceTest{
        private EntregaService _entregaService;
        private EntregaDto _entregaDto;
        private Entrega _entrega;
        private Mock<IUnitOfWork> _unitOfWorkMock;
        private Mock<IEntregaRepository> _iEntregaRepositoryMock;


        [SetUp]
        public void Setup(){
            string testIdLoja = "loja matosinhos"; 
            int testTempoCarga = 45;
            int testTempoDescarga = 30;
            int testData = 20221025;
            float testPeso = 25.8F;

            this._entrega = new Entrega(testIdLoja, testTempoCarga, testTempoDescarga, testData, testPeso);
            Guid id = new Guid();
            this._entregaDto = new EntregaDto(id, testIdLoja, testTempoCarga, testTempoDescarga, testData, testPeso);

            this._unitOfWorkMock = new Mock<IUnitOfWork>();
            this._iEntregaRepositoryMock=new Mock<IEntregaRepository>();

            this._unitOfWorkMock.Setup(u => u.CommitAsync());
            this._iEntregaRepositoryMock.Setup(x => x.AddAsync(It.IsAny<Entrega>()));
            this._iEntregaRepositoryMock.Setup(x => x.GetByIdAsync(It.IsAny<EntregaId>()));
            this._entregaService = new EntregaService(this._unitOfWorkMock.Object, this._iEntregaRepositoryMock.Object);

            this._iEntregaRepositoryMock.Setup(x => x.GetByIdAsync(new EntregaId(id))).Returns(Task.FromResult(this._entrega));

            this._entregaService = new EntregaService(this._unitOfWorkMock.Object,this._iEntregaRepositoryMock.Object);        
        }

        [Test]
        public void ShouldUpdateEntrega(){
            var result = this._entregaService.UpdateAsync(this._entregaDto);
            this._iEntregaRepositoryMock.Verify(t => t.GetByIdAsync(It.IsAny<EntregaId>()), Times.AtLeastOnce());
        }

        [Test]
        public void AddAsyncTest(){

            string testIdLoja = "loja matosas"; 
            int testTempoCarga = 5;
            int testTempoDescarga = 3;
            int testData = 20221015;
            float testPeso = 28.89F;

            Entrega entrega2 = new Entrega(testIdLoja,testTempoCarga,testTempoDescarga,testData,testPeso);
            EntregaDto entregaDTO2 = EntregaMapper.toDTO(entrega2);

            var result = this._entregaService.AddAsync(entregaDTO2);

            Assert.True(entrega2.Equals(EntregaMapper.toDomain(result.Result)));
        }

        [Test]
        public void InactivateAsyncTest(){

             //get InactivateAsyncTest result
            var result = this._entregaService.InactivateAsync(new EntregaId(_entrega.Id.AsGuid()));

            //verify object is still in resulting list
            this._iEntregaRepositoryMock.Verify(t => t.GetByIdAsync(It.IsAny<EntregaId>()), Times.AtLeastOnce());
        }
    }
}