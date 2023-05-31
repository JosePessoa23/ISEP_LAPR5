import 'reflect-metadata';

import config from "../../config";
import * as sinon from 'sinon';
import { Response, Request, NextFunction } from 'express';
import { Container } from 'typedi';
import { Result } from '../core/logic/Result';
import ICamiaoRepo from '../services/IRepos/ICamiaoRepo';
import { Camiao } from "../domain/camiao";
import { MatriculaCamiao } from '../domain/camiaoMatricula';
import { TaraCamiao } from '../domain/camiaoTara';
import { CapacidadeCamiao } from '../domain/camiaoCapacidade';
import { CargaBateriaCamiao } from '../domain/camiaoCargaBateria';
import { AutonomiaCamiao } from '../domain/camiaoAutonomia';
import { TempoCarregamentoCamiao } from '../domain/camiaoTempoCarregamento';
import CamiaoService from './camiaoService';
import { CamiaoMap } from '../mappers/CamiaoMap';
import ICamiaoDTO from '../dto/ICamiaoDTO';

describe('camião service', function () {
	beforeEach(function() {
       });
    
    it('returns json with the values when createCamiao', async function () {

        const matricula = MatriculaCamiao.create("BB-21-AA").getValue();
        const tara = TaraCamiao.create(20).getValue();
        const capacidade = CapacidadeCamiao.create(500).getValue();
        const cargaBateria = CargaBateriaCamiao.create(2123).getValue();
        const autonomia =  AutonomiaCamiao.create(114).getValue();
        const tempoCarregamento = TempoCarregamentoCamiao.create(67).getValue();
        const camiao1 = Camiao.create({ matricula: matricula, tara: tara, capacidade: capacidade, cargaBateria: cargaBateria, autonomia: autonomia, tempoCarregamentoRapido: tempoCarregamento, disponibilidade: true });
          
        let body = { 
            "matricula": "BB-21-AA",
            "tara": 20,
            "capacidade": 500,
            "cargaBateria": 2123,
            "autonomia": 114,
            "tempoCarregamentoRapido": 67
        };
        let req: Partial<Request> = {};
		req.body = body;

        let res: Partial<Response> = {
			json: sinon.spy()
        };
		let next: Partial<NextFunction> = () => {};

		let camiaoRepoClass = require("../repos/camiaoRepo").default;
		let camiaoRepoInstance = Container.get(camiaoRepoClass);
		Container.set("CamiaoRepo", camiaoRepoInstance);
		const mock = sinon.stub(camiaoRepoInstance, "save").returns( Result.ok<Camiao>( camiao1.getValue() ));


		const servi = new CamiaoService(camiaoRepoInstance as ICamiaoRepo);

		const result = (await servi.createCamiao(body)).getValue();

        sinon.assert.match(result, body);

        mock.restore();
        
	})

    it('return Json com todos os camioes',async function()  {

        let body = { 
            "id": "",
            "matricula": "BB-21-AA",
            "tara": 20,
            "capacidade": 500,
            "cargaBateria": 2123,
            "autonomia": 114,
            "tempoCarregamentoRapido": 67
        };

        let body2 = { 
            "id": "",
            "matricula": "AA-21-AA",
            "tara": 27,
            "capacidade": 520,
            "cargaBateria": 2123,
            "autonomia": 114,
            "tempoCarregamentoRapido": 67
        };

        const resu2 = Camiao.create({
            matricula: MatriculaCamiao.create(body2.matricula).getValue(),
            tara: TaraCamiao.create(body2.tara).getValue(),
            capacidade: CapacidadeCamiao.create(body2.capacidade).getValue(),
            cargaBateria: CargaBateriaCamiao.create(body2.cargaBateria).getValue(),
            autonomia: AutonomiaCamiao.create(body2.autonomia).getValue(),
            tempoCarregamentoRapido: TempoCarregamentoCamiao.create(body2.tempoCarregamentoRapido).getValue(),
            disponibilidade: true,
        });

        const resu3 = Camiao.create({
           matricula: MatriculaCamiao.create(body.matricula).getValue(),
            tara: TaraCamiao.create(body.tara).getValue(),
            capacidade: CapacidadeCamiao.create(body.capacidade).getValue(),
            cargaBateria: CargaBateriaCamiao.create(body.cargaBateria).getValue(),
            autonomia: AutonomiaCamiao.create(body.autonomia).getValue(),
            tempoCarregamentoRapido: TempoCarregamentoCamiao.create(body.tempoCarregamentoRapido).getValue(),
            disponibilidade: true,
        });
            
        const camiaoRepoInstance = Container.get(config.repos.camiao.name);
        const mock = sinon.stub(camiaoRepoInstance , "findAllCamioes").returns(( [resu3.getValue(),resu2.getValue()]));
        
        const serv = new CamiaoService(camiaoRepoInstance as ICamiaoRepo);


        const res = await (await (await serv.getCamioes()));


        sinon.assert.match([res.getValue()[0].matricula, res.getValue()[1].matricula], [body.matricula, body2.matricula]);

        mock.restore();
        
    })

    it('getByMatricula : return Json with camiao',async function()  {

        const body = {
            "matricula": "BB-21-AA",
            "tara": 20,
            "capacidade": 500,
            "cargaBateria": 2123,
            "autonomia": 114,
            "tempoCarregamentoRapido": 67,
            "disponibilidade": true,
        }

        const resu = CamiaoMap.toDomain(body);
        const camiaoRepoInstance = Container.get(config.repos.camiao.name);
        const mock = sinon.stub(camiaoRepoInstance , "findByMatricula").returns(resu);
        
        const serv = new CamiaoService(camiaoRepoInstance as ICamiaoRepo);


        const res = await (await (await serv.getCamiao(body.matricula)).getValue());

        sinon.assert.match(res, body);

        mock.restore();
        
    })

    it('returns json with the values when updateCamiao', async function () {

        const body = {
            "matricula": "BB-21-AA",
            "tara": 20,
            "capacidade": 500,
            "cargaBateria": 2123,
            "autonomia": 114,
            "tempoCarregamentoRapido": 67,
            "disponibilidade": true,
        }

        const body2 = {
            "matricula": "BB-21-AA",
            "tara": 30,
            "capacidade": 550,
            "cargaBateria": 2123,
            "autonomia": 114,
            "tempoCarregamentoRapido": 67,
            "disponibilidade": true,
        }

        const resu = CamiaoMap.toDomain(body);
        const camiaoRepoInstance = Container.get(config.repos.camiao.name);

        let mock = sinon.stub(camiaoRepoInstance, "findByMatricula").returns(( resu ));
        let mock2 = sinon.stub(camiaoRepoInstance , "save").returns(Result.ok<Camiao>((await resu)));

        const serv = new CamiaoService(camiaoRepoInstance as ICamiaoRepo);


        const result = await (await serv.updateCamiao(body2)).getValue();

        sinon.assert.match(result, body2);

        mock.restore();
        mock2.restore();
        
	})

    it('UpdatePartial: returns json with the values when updateCamiao', async function () {

        const body = {
            "matricula": "BB-21-AA",
            "tara": 20,
            "capacidade": 500,
            "cargaBateria": 2123,
            "autonomia": 114,
            "tempoCarregamentoRapido": 67,
            "disponibilidade": true,
        }

        const body3 = {
            "matricula": "BB-21-AA",
            "tara": 30,
            "capacidade": 550,
            "cargaBateria": 2123,
            "autonomia": 114,
            "tempoCarregamentoRapido": 67,
            "disponibilidade": true,
        }

        const body2 = {
            "matricula": "BB-21-AA",
            "tara": 30,
            "capacidade": 550,
        }

        const resu = CamiaoMap.toDomain(body);
        const resu2 = CamiaoMap.toDomain(body2);
        const resu3 = CamiaoMap.toDomain(body3);
        const camiaoRepoInstance = Container.get(config.repos.camiao.name);

        let mock = sinon.stub(camiaoRepoInstance, "findByMatricula").returns(( resu ));
        let mock2 = sinon.stub(camiaoRepoInstance , "save").returns(Result.ok<Camiao>((await resu3)));

        const serv = new CamiaoService(camiaoRepoInstance as ICamiaoRepo);


        const result = await (await serv.updateParcialCamiao(body2 as ICamiaoDTO)).getValue();

        sinon.assert.match(result, body3);

        mock.restore();
        mock2.restore();
        
	})
});