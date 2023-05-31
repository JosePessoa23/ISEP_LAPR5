using System.Collections.Generic;
using DDDSample1.Domain.Armazens;
using System;
using DDDSample1.Domain.Shared;
using NUnit.Framework;

namespace Tests.Domain.Armazens{

    public class ArmazemDtoTest{

        [Test]
        public void CreateDTOTest()
        {
            //dummy armazem info
            Guid id = new Guid();
            IdProprio idProprio = new IdProprio("A3D");
            Endereco endereco = new Endereco("Rua das Ribeiras, 93", "4455-547", "Matosinhos", "Portugal");
            Designacao designacao = new Designacao("Armazem de Freixieiro");
            Coordenadas coordenadas = new Coordenadas(41.22f, -8.69f, 0f);
            bool disponibilidade = true;

            //instantiate ArmazemDto with dummy info
            ArmazemDto armDto = new ArmazemDto(id, 
                idProprio.Codigo,
                endereco.Morada, 
                endereco.CodigoPostal, 
                endereco.Localidade, 
                endereco.Pais, 
                designacao.DesignacaoText, 
                coordenadas.Latitude, 
                coordenadas.Longitude,
                coordenadas.Altitude,
                disponibilidade
            ); 
            
            //assert values are equal
            Assert.AreEqual(id, armDto.Id);
            Assert.AreEqual(idProprio.Codigo, armDto.IdProprio);
            Assert.AreEqual(endereco.Morada, armDto.Morada);
            Assert.AreEqual(endereco.CodigoPostal, armDto.CodigoPostal);
            Assert.AreEqual(endereco.Localidade, armDto.Localidade);
            Assert.AreEqual(endereco.Pais, armDto.Pais);
            Assert.AreEqual(designacao.DesignacaoText, armDto.Designacao);
            Assert.AreEqual(coordenadas.Latitude, armDto.Latitude);
            Assert.AreEqual(coordenadas.Longitude, armDto.Longitude);
            Assert.AreEqual(disponibilidade, armDto.Disponibilidade);
        }
    }
}
