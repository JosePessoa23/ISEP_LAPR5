using System.Threading.Tasks;
using System.Collections.Generic;
using DDDSample1.Domain.Shared;
using DDDSample1.Domain.Armazens;
using System;
using NUnit.Framework;
using Moq;

namespace Testes.Domain.Armazens{
    public class ArmazemServiceTest{

        private Mock<IUnitOfWork> _unitOfWork;
        private Mock<IArmazemRepository> _repo;
        private ArmazemService _armazemService;
        private ArmazemDto _armazemDto;
        private Armazem _armazem;

        [SetUp]
        public void Setup(){

            //dummy armazem info
            IdProprio idProprio = new IdProprio("A3D");
            Endereco endereco = new Endereco("Rua das Ribeiras, 93", "4455-547", "Matosinhos", "Portugal");
            Designacao designacao = new Designacao("Armazem de Freixieiro");
            Coordenadas coordenadas = new Coordenadas(41.22f, -8.69f, 0f);
            bool disponibilidade = true;

            //set up dummy armazem and dto
            this._armazem = new Armazem(idProprio, endereco, designacao, coordenadas,disponibilidade);
            this._armazemDto = ArmazemMapper.toDTO(_armazem);

            //initialize mock
            this._unitOfWork = new Mock<IUnitOfWork>();
            this. _repo = new Mock<IArmazemRepository>();

            //setup mock
            this._unitOfWork.Setup(u => u.CommitAsync());
            this._repo.Setup(x => x.AddAsync(It.IsAny<Armazem>()));
            this._repo.Setup(x => x.GetAllAsync()).Returns(Task.FromResult(new List<Armazem>(){_armazem}));
            this._repo.Setup(x => x.GetByIdAsync(It.IsAny<ArmazemId>()));
            this._repo.Setup(x => x.GetByIdAsync(new ArmazemId(_armazem.Id.AsGuid()))).Returns(Task.FromResult(this._armazem));

            //instantiate service
            this._armazemService = new ArmazemService(this._unitOfWork.Object, this._repo.Object);
        }

        [Test]
        public void GetAllAsyncTest(){

            //get GetAll resulting Task<List<ArmazemDto>>
            var result = this._armazemService.GetAllAsync();

            //check if _armazem is in the result
            bool hasArmazem = false;

            foreach (ArmazemDto dto in result.Result)
            {
                if(_armazem.Equals(ArmazemMapper.toDomain(dto)))
                    hasArmazem = true;
            }

            Assert.True(hasArmazem);
        }

        [Test]
        public void GetByIdAsyncTest(){

            //get GetByIdAsync resulting Task<ArmazemDto>
            ArmazemDto result = this._armazemService.GetByIdAsync(new ArmazemId(_armazem.Id.AsGuid())).Result;

            //check if _armazem is the result
            Assert.True(_armazem.Equals(ArmazemMapper.toDomain(result)));
        }

        [Test]
        public void AddAsyncTest(){

            //dummy armazem2 info
            IdProprio idProprio = new IdProprio("A3D");;
            Endereco endereco = new Endereco("Travessa das Ribeiras, 71", "4455-547", "Matosinhos", "Portugal");
            Designacao designacao = new Designacao("Armazem de Freixieiro 2");
            Coordenadas coordenadas = new Coordenadas(41.25f, -8.39f, 0f);
            bool disponibilidade = true;

            //set up dummy armazem2 and dto
            Armazem armazem2 = new Armazem(idProprio, endereco, designacao, coordenadas,disponibilidade);
            ArmazemDto armazem2Dto = ArmazemMapper.toDTO(armazem2);

            //this._repo.Setup(t => t.AddAsync(new ArmazemId(armazem2.Id.AsGuid()))).Returns(Task.FromResult(armazem2));

            //get AddAsync resulting Task<ArmazemDto>
            var result = this._armazemService.AddAsync(armazem2Dto);

            //check if both the added Armazem and the result Armazem are the equal
            Assert.True(armazem2.Equals(ArmazemMapper.toDomain(result.Result)));
        }

        [Test]
        public void UpdateAsyncTest(){

            //get UpdateAsync result
            var result = this._armazemService.UpdateAsync(this._armazemDto);

            //verify object is still in resulting list
            this._repo.Verify(t => t.GetByIdAsync(It.IsAny<ArmazemId>()), Times.AtLeastOnce());
        }

        [Test]
        public void InactivateAsyncTest(){

             //get InactivateAsyncTest result
            var result = this._armazemService.InactivateAsync(new ArmazemId(_armazem.Id.AsGuid()));

            //verify object is still in resulting list
            this._repo.Verify(t => t.GetByIdAsync(It.IsAny<ArmazemId>()), Times.AtLeastOnce());
        }
    }
}
