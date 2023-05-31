import config from "../../config";
import * as sinon from 'sinon';
import { Response, Request, NextFunction } from 'express';
import { Container } from 'typedi';
import { Result } from '../core/logic/Result';
import IPlaneamentoRepo from '../services/IRepos/IPlaneamentoRepo';
import ICamiaoRepo from '../services/IRepos/ICamiaoRepo';
import PlaneamentoService from './planeamentoService';
import IPlaneamentoDTO from "../dto/IPlaneamentoDTO";
import { Viagem } from "../domain/viagem";
import { ViagemMap } from "../mappers/ViagemMap";

describe('planeamento service', function () {
	beforeEach(function() {
       });
    
    it('returns planeamentoDTO with the values when getPlaneamento', async function () {

        let body = { 
            "custo": 426,
            "caminho": ["5","1","9","5"],
        };

        var data:number = 20201205;
        var heuristica:string = "1";
        
        let viagemSchemaInstance = require("../persistence/schemas/viagemSchema").default;
		Container.set("viagemSchema", viagemSchemaInstance);
        let planeamentoRepoClass = require("../repos/planeamentoRepo").default;
		let planeamentoRepoInstance = Container.get(planeamentoRepoClass);
		Container.set("PlaneamentoRepo", planeamentoRepoInstance);
        let camiaoRepoClass = require("../repos/camiaoRepo").default;
		let camiaoRepoInstance = Container.get(camiaoRepoClass);
		Container.set("CamiaoRepo", camiaoRepoInstance);
		const mock = sinon.stub(planeamentoRepoInstance, "getPlaneamento").returns( Result.ok<IPlaneamentoDTO>( body as IPlaneamentoDTO ));

		const servi = new PlaneamentoService(planeamentoRepoInstance as IPlaneamentoRepo, camiaoRepoInstance as ICamiaoRepo);

		const result = (await servi.getPlaneamento(data, heuristica)).getValue();

        sinon.assert.match(result, body);

        mock.restore();
        
	})

    
    it('return todas viagemDTO',async function()  {

        let body = { 
            "camiao": "AA-00-FG",
            "custo": 456,
            "armazens": [1,6,8],
            "entregas": ["batatas","cebolas","frutas"],
            "data": 20201205,
        };

        const viagemResult = await ViagemMap.toDomain(body);
        var lista:Viagem[]=[viagemResult];

        let viagemSchemaInstance = require("../persistence/schemas/viagemSchema").default;
		Container.set("viagemSchema", viagemSchemaInstance);
        let planeamentoRepoClass = require("../repos/planeamentoRepo").default;
		let planeamentoRepoInstance = Container.get(planeamentoRepoClass);
		Container.set("PlaneamentoRepo", planeamentoRepoInstance);
        let camiaoRepoClass = require("../repos/camiaoRepo").default;
		let camiaoRepoInstance = Container.get(camiaoRepoClass);
		Container.set("CamiaoRepo", camiaoRepoInstance);
		const mock = sinon.stub(planeamentoRepoInstance, "findAllViagens").returns( lista);

        const servi = new PlaneamentoService(planeamentoRepoInstance as IPlaneamentoRepo, camiaoRepoInstance as ICamiaoRepo);

		const result = (await servi.getViagens()).getValue();

        sinon.assert.match(result, [body]);

        mock.restore();
        
    })


    it('returns max 5 viagemDTO when getViagensPagina', async function () {

        let body1 = { 
            "camiao": "AA-00-TG",
            "custo": 466,
            "armazens": [1,6,8],
            "entregas": ["batatas","cebolas","frutas"],
            "data": 20201205,
        };

        let body2 = { 
            "camiao": "AA-00-FG",
            "custo": 456,
            "armazens": [1,6,8],
            "entregas": ["batatas","cebolas","frutas"],
            "data": 20201205,
        };

        let body3 = { 
            "camiao": "AA-00-FG",
            "custo": 456,
            "armazens": [1,6,8],
            "entregas": ["batatas","cebolas","frutas"],
            "data": 20201205,
        };

        let body4 = { 
            "camiao": "AA-00-FG",
            "custo": 456,
            "armazens": [1,6,8],
            "entregas": ["batatas","cebolas","frutas"],
            "data": 20201205,
        };

        let body5 = { 
            "camiao": "AA-00-FG",
            "custo": 456,
            "armazens": [1,6,8],
            "entregas": ["batatas","cebolas","frutas"],
            "data": 20201205,
        };


        const viagemResult1 = await ViagemMap.toDomain(body1);
        const viagemResult2 = await ViagemMap.toDomain(body2);
        const viagemResult3 = await ViagemMap.toDomain(body3);
        const viagemResult4 = await ViagemMap.toDomain(body4);
        const viagemResult5 = await ViagemMap.toDomain(body5);
        var lista:Viagem[]=[viagemResult1,viagemResult2,viagemResult3,viagemResult4,viagemResult5];

        var pagina:string = "1";
        
        let viagemSchemaInstance = require("../persistence/schemas/viagemSchema").default;
		Container.set("viagemSchema", viagemSchemaInstance);
        let planeamentoRepoClass = require("../repos/planeamentoRepo").default;
		let planeamentoRepoInstance = Container.get(planeamentoRepoClass);
		Container.set("PlaneamentoRepo", planeamentoRepoInstance);
        let camiaoRepoClass = require("../repos/camiaoRepo").default;
		let camiaoRepoInstance = Container.get(camiaoRepoClass);
		Container.set("CamiaoRepo", camiaoRepoInstance);
		const mock = sinon.stub(planeamentoRepoInstance, "findAllViagensPagina").returns(lista);

		const servi = new PlaneamentoService(planeamentoRepoInstance as IPlaneamentoRepo, camiaoRepoInstance as ICamiaoRepo);

		const result = (await servi.getViagensPagina(pagina)).getValue();

        sinon.assert.match(result, [body1,body2,body3,body4,body5]);

        mock.restore();
        
	})

    it('returns viagemDTO para um camiao numa data when getViagensPagina', async function () {

        let body1 = { 
            "camiao": "AA-00-TG",
            "custo": 466,
            "armazens": [1,6,8],
            "entregas": ["batatas","cebolas","frutas"],
            "data": 20201205,
        };


        const viagemResult1 = await ViagemMap.toDomain(body1);
        var lista:Viagem=viagemResult1;

        var camiao:string = "AA-05-DF";
        var data:number = 20201205;
        
        let viagemSchemaInstance = require("../persistence/schemas/viagemSchema").default;
		Container.set("viagemSchema", viagemSchemaInstance);
        let planeamentoRepoClass = require("../repos/planeamentoRepo").default;
		let planeamentoRepoInstance = Container.get(planeamentoRepoClass);
		Container.set("PlaneamentoRepo", planeamentoRepoInstance);
        let camiaoRepoClass = require("../repos/camiaoRepo").default;
		let camiaoRepoInstance = Container.get(camiaoRepoClass);
		Container.set("CamiaoRepo", camiaoRepoInstance);
		const mock = sinon.stub(planeamentoRepoInstance, "findViagensByCamiaoData").returns(lista);

		const servi = new PlaneamentoService(planeamentoRepoInstance as IPlaneamentoRepo, camiaoRepoInstance as ICamiaoRepo);

		const result = (await servi.getViagemByCamiaoData(camiao, data)).getValue();

        sinon.assert.match(result, body1);

        mock.restore();
        
	})



});