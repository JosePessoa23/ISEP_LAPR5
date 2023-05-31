import { RotaDistancia } from '../domain/rotaDistancia';
import { RotaTempoViagemCheio } from '../domain/rotaTempoViagemCheio';
import { Rota } from '../domain/rota';
import { Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import { Result } from '../core/logic/Result';
import * as sinon from 'sinon';
import RotaService from './rotaService';
import IRotaRepo from './IRepos/IRotaRepo';
import IRotaDTO from '../dto/IRotaDTO';
import { RotaMap } from "../mappers/RotaMap";

describe('rota service', function () {
	beforeEach(function() {
       });
    
    it('returns json with the values when createRota', async function () {

        const distancia = await RotaDistancia.create(100).getValue();
      const tempoViagemCheio = await RotaTempoViagemCheio.create( 50 ).getValue();
      const energiaGasta = await RotaDistancia.create(1000).getValue();
      const tempoCarregamentoExtra = await RotaDistancia.create(2).getValue();

      const rota1 = await Rota.create({
        idArmazemPartida: "123",
        idArmazemChegada: "321",
       distancia: distancia,
       tempoViagemCheio: tempoViagemCheio,
       energiaGasta: energiaGasta,
       tempoCarregamentoExtra: tempoCarregamentoExtra,
      });

        let body = {
            "idArmazemPartida": 'str',
          "idArmazemChegada": 'string',
          "distancia": 12,
          "tempoViagemCheio": 13,
          "energiaGasta": 14,
          "tempoCarregamentoExtra": 15
          };

		let rotaSchemaInstance = require("../persistence/schemas/rotaSchema").default;
		Container.set("rotaSchema", rotaSchemaInstance);

		let rotaRepoClass = require("../repos/rotaRepo").default;
		let rotaRepoInstance = Container.get(rotaRepoClass);
		Container.set("RotaRepo", rotaRepoInstance);

		let rotaServiceClass = require("../services/rotaService").default;
		let rotaServiceInstance = Container.get(rotaServiceClass);
		Container.set("RotaService", rotaServiceInstance);

		const mock = sinon.stub(rotaRepoInstance, "save").returns( Result.ok<Rota>( rota1.getValue() ));


		const servi = new RotaService(rotaRepoInstance as IRotaRepo);

		const result = await (await servi.createRota(body as IRotaDTO)).getValue();

		//sinon.assert.calledOnce(result);
		//sinon.assert.calledWith(result, sinon.match(body));
        sinon.assert.match(result, body);

        mock.restore();
        
	})
    

    it('returns json with the rotas when getRotaByFilter',async function()  {

        let body = { 
            "idArmazemPartida": 'str',
            "idArmazemChegada": 'string',
            "distancia": 12,
            "tempoViagemCheio": 13,
            "energiaGasta": 14,
            "tempoCarregamentoExtra": 15
          }as IRotaDTO;

        const resu2 = await RotaMap.toDomain(body);
            
        let rotaSchemaInstance = require("../persistence/schemas/rotaSchema").default;
		Container.set("rotaSchema", rotaSchemaInstance);

		let rotaRepoClass = require("../repos/rotaRepo").default;
		let rotaRepoInstance = Container.get(rotaRepoClass);
		Container.set("RotaRepo", rotaRepoInstance);

		let rotaServiceClass = require("../services/rotaService").default;
		let rotaServiceInstance = Container.get(rotaServiceClass);
		Container.set("RotaService", rotaServiceInstance);

        const mock = sinon.stub(rotaRepoInstance , "findByIdArmazens").returns(( resu2));
        
        const serv = new RotaService(rotaRepoInstance as IRotaRepo);

        const res = (await serv.getRotaByFilter(body as IRotaDTO));

        sinon.assert.match([res.getValue()[0]], [body]);
        
        mock.restore();
    })


    it('returns json with the rotas when getRotas',async function()  {

        let body = { 
            "idArmazemPartida": 'str',
            "idArmazemChegada": 'string',
            "distancia": 12,
            "tempoViagemCheio": 13,
            "energiaGasta": 14,
            "tempoCarregamentoExtra": 15
          }as IRotaDTO;
 
          let body2 = { 
            "idArmazemPartida": 'str2',
            "idArmazemChegada": 'string2',
            "distancia": 122,
            "tempoViagemCheio": 132,
            "energiaGasta": 142,
            "tempoCarregamentoExtra": 152
          }as IRotaDTO;

        const resu2 = await RotaMap.toDomain(body);

        const resu3 = await await RotaMap.toDomain(body2);
            
        let rotaSchemaInstance = require("../persistence/schemas/rotaSchema").default;
		Container.set("rotaSchema", rotaSchemaInstance);

		let rotaRepoClass = require("../repos/rotaRepo").default;
		let rotaRepoInstance = Container.get(rotaRepoClass);
		Container.set("RotaRepo", rotaRepoInstance);

		let rotaServiceClass = require("../services/rotaService").default;
		let rotaServiceInstance = Container.get(rotaServiceClass);
		Container.set("RotaService", rotaServiceInstance);

        const mock = sinon.stub(rotaRepoInstance , "findAllRotas").returns(( [resu3,resu2]));
        
        const serv = new RotaService(rotaRepoInstance as IRotaRepo);

        const res = (await serv.getRotas());


        sinon.assert.match([res.getValue()[0], res.getValue()[1]], [body2, body]);
        
        mock.restore();
    })
    
    it('returns json with the values when updateRota', async function () {


        let body = { 
            "idArmazemPartida": 'str',
            "idArmazemChegada": 'string',
            "distancia": 12,
            "tempoViagemCheio": 13,
            "energiaGasta": 14,
            "tempoCarregamentoExtra": 15
          }as IRotaDTO;
 
          let body2 = { 
            "idArmazemPartida": 'str2',
            "idArmazemChegada": 'string2',
            "distancia": 122,
            "tempoViagemCheio": 132,
            "energiaGasta": 142,
            "tempoCarregamentoExtra": 152
          }as IRotaDTO;

        const resu = RotaMap.toDomain(body);
        const resu2 = RotaMap.toDomain(body2);

        let rotaSchemaInstance = require("../persistence/schemas/rotaSchema").default;
		Container.set("rotaSchema", rotaSchemaInstance);

		let rotaRepoClass = require("../repos/rotaRepo").default;
		let rotaRepoInstance = Container.get(rotaRepoClass);
		Container.set("RotaRepo", rotaRepoInstance);

		let rotaServiceClass = require("../services/rotaService").default;
		let rotaServiceInstance = Container.get(rotaServiceClass);
		Container.set("RotaService", rotaServiceInstance);

        let mock = sinon.stub(rotaRepoInstance, "findByIdArmazens").returns(( resu ));
        let mock2 = sinon.stub(rotaRepoInstance , "save").returns(Result.ok<Rota>((await resu2)));

        const serv = new RotaService(rotaRepoInstance as IRotaRepo);

        serv.createRota(body);

        const result = await (await serv.updateRota(body2)).getValue();

        sinon.assert.match(result, body2);

        mock.restore();
        mock2.restore();

    });
    it('returns json with the new values of Rota using patchRota', async function () {

      let body = { 
        "idArmazemPartida": 'str',
        "idArmazemChegada": 'string',
        "distancia": 12,
        "tempoViagemCheio": 13,
        "energiaGasta": 14,
        "tempoCarregamentoExtra": 15
      };

      let body3 = { 
        "idArmazemPartida": 'str2',
        "idArmazemChegada": 'string2',
        "distancia": 122,
        "tempoViagemCheio": 13,
        "energiaGasta": 14,
        "tempoCarregamentoExtra": 15
      };

      let body2 = { 
        "idArmazemPartida": 'str2',
        "idArmazemChegada": 'string2',
        "distancia": 122,
      };

      const resu = RotaMap.toDomain(body);
      const resu2 = RotaMap.toDomain(body2);
      const resu3 = RotaMap.toDomain(body3);

      let rotaSchemaInstance = require("../persistence/schemas/rotaSchema").default;
		Container.set("rotaSchema", rotaSchemaInstance);

		let rotaRepoClass = require("../repos/rotaRepo").default;
		let rotaRepoInstance = Container.get(rotaRepoClass);
		Container.set("RotaRepo", rotaRepoInstance);

		let rotaServiceClass = require("../services/rotaService").default;
		let rotaServiceInstance = Container.get(rotaServiceClass);
		Container.set("RotaService", rotaServiceInstance);

      let mock = sinon.stub(rotaRepoInstance, "findByIdArmazens").returns(( resu ));
      let mock2 = sinon.stub(rotaRepoInstance , "save").returns(Result.ok<Rota>((await resu3)));

      const serv = new RotaService(rotaRepoInstance as IRotaRepo);

      const result = await (await serv.patchRota(body2 as IRotaDTO)).getValue();

      sinon.assert.match(result, body3);

      mock.restore();
      mock2.restore();
      
})

});