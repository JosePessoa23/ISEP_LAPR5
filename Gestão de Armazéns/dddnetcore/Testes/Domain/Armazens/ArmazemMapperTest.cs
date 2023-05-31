using System.Collections.Generic;
using DDDSample1.Domain.Armazens;
using System;
using DDDSample1.Domain.Shared;
using NUnit.Framework;

namespace Tests.Domain.Armazens{

    public class ArmazemMapperTest{
        
        [Test]
        public void ArmazemToDTOTest(){

            //dummy armazem info
            Guid id = new Guid();
            IdProprio idProprio = new IdProprio("A3D");
            Endereco endereco = new Endereco("Rua das Ribeiras, 93", "4455-547", "Matosinhos", "Portugal");
            Designacao designacao = new Designacao("Armazem de Freixieiro");
            Coordenadas coordenadas = new Coordenadas(41.22f, -8.69f, 0f);
            bool disponibilidade = true;
            

            //instantiate Armazem with dummy info
            Armazem armazem = new Armazem(idProprio, endereco, designacao, coordenadas,disponibilidade);

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

            //get the ArmazemDto from the ArmazemMapper
            ArmazemDto armazemDtoFromDomain = ArmazemMapper.toDTO(armazem); 
            
            //assert values are equal between armazemDtoFromDomain and armDto
            Assert.AreEqual(
                new IdProprio(armazemDtoFromDomain.IdProprio), 
                new IdProprio(armDto.IdProprio)
            );
            Assert.AreEqual( 
                new Endereco(
                    armazemDtoFromDomain.Morada, 
                    armazemDtoFromDomain.CodigoPostal, 
                    armazemDtoFromDomain.Localidade, 
                    armazemDtoFromDomain.Pais),
                new Endereco(
                    armDto.Morada, 
                    armDto.CodigoPostal, 
                    armDto.Localidade, 
                    armDto.Pais)
            );
            Assert.AreEqual(
                new Designacao(armazemDtoFromDomain.Designacao), 
                new Designacao(armDto.Designacao)
            );
            Assert.AreEqual(
                new Coordenadas(
                    armazemDtoFromDomain.Latitude, 
                    armazemDtoFromDomain.Longitude,
                    armazemDtoFromDomain.Altitude), 
                new Coordenadas(
                    armDto.Latitude, 
                    armDto.Longitude,
                    armDto.Altitude)
            );
            Assert.AreEqual(
                armazemDtoFromDomain.Disponibilidade,armDto.Disponibilidade
            );
            
        }

        [Test] 
        public void ArmazemToDomainTest(){

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
        
            //instantiate Armazem with dummy info
            Armazem armazem = new Armazem(idProprio, endereco, designacao, coordenadas,disponibilidade);

            //get the Armazem from the ArmazemMapper
            Armazem armazemFromDTO = ArmazemMapper.toDomain(armDto); 
            
            //assert values are equal between armazemFromDTO and armazem
            Assert.AreEqual(armazemFromDTO.Endereco, armazem.Endereco);
            Assert.AreEqual(armazemFromDTO.Designacao, armazem.Designacao);
            Assert.AreEqual(armazemFromDTO.Coordenadas.Latitude, armazem.Coordenadas.Latitude);
            Assert.AreEqual(armazemFromDTO.Coordenadas.Longitude, armazem.Coordenadas.Longitude);
            Assert.AreEqual(armazemFromDTO.Disponibilidade, armazem.Disponibilidade);
        }
    }
}
