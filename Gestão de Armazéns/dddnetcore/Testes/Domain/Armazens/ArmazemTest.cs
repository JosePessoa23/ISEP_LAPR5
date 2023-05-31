using System.Collections.Generic;
using DDDSample1.Domain.Armazens;
using System;
using DDDSample1.Domain.Shared;
using NUnit.Framework;


namespace Tests.Domain.Armazens{
    public class ArmazemTest{

        //dummy armazem info

        IdProprio _idProprio;
        Endereco _endereco;
        Designacao _designacao;
        Coordenadas _coordenadas;
        bool disponibilidade;

        private Armazem _armazem;
        private ArmazemDto _armazemDto;

        [SetUp]
        public void Setup(){

            //dummy armazem info
            _idProprio = new IdProprio("A3D");
            _endereco = new Endereco("Rua das Ribeiras, 93", "4455-547", "Matosinhos", "Portugal");
            _designacao = new Designacao("Armazem de Freixieiro");
            _coordenadas = new Coordenadas(41.22f, -8.69f, 0f);
            disponibilidade = true;

            //instantiate armazem & armazemDto
            this._armazem = new Armazem(_idProprio, _endereco, _designacao, _coordenadas,disponibilidade);
            this._armazemDto = ArmazemMapper.toDTO(_armazem);
        }

        [Test]
        public void CheckConstructor(){
            Assert.True(string.Equals(_armazem.IdProprio.Codigo, _armazem.IdProprio.Codigo) && 
                string.Equals(_armazem.Endereco.ToString(), _endereco.ToString()) && 
                string.Equals(_armazem.Designacao.DesignacaoText, _designacao.DesignacaoText) && 
                _armazem.Coordenadas.Latitude == _coordenadas.Latitude &&
                _armazem.Coordenadas.Longitude == _coordenadas.Longitude && _armazem.Disponibilidade == disponibilidade);
        }

        [Test]
        public void EqualsTest(){
            Assert.True(this._armazem.Equals(
                ArmazemMapper.toDomain(_armazemDto)));
        }

        [Test]
        public void ChangeWhileInativeTest(){
            _armazem.MarkAsInative();

            Assert.Throws<BusinessRuleValidationException>(delegate {_armazem.ChangeIdProprio(new IdProprio("AB3"));} );
            Assert.Throws<BusinessRuleValidationException>(delegate {_armazem.ChangeEndereco(new Endereco("some string", "some string", "some string", "some string"));} );
            Assert.Throws<BusinessRuleValidationException>(delegate {_armazem.ChangeDesignacao(new Designacao("some string"));} );
            Assert.Throws<BusinessRuleValidationException>(delegate {_armazem.ChangeCoordenadas(new Coordenadas(1,2,3));} );
            Assert.Throws<BusinessRuleValidationException>(delegate {_armazem.ChangeCoordenadas(1,2,3);} );
            Assert.Throws<BusinessRuleValidationException>(delegate {_armazem.ChangeDisponibilidade(false);} );
        }
    }
}
