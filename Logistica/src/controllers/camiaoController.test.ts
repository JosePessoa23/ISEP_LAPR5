import 'reflect-metadata';

import config from "../../config";
import * as sinon from 'sinon';
import { Response, Request, NextFunction } from 'express';
import { Container } from 'typedi';
import { Result } from '../core/logic/Result';
import ICamiaoService from '../services/IServices/ICamiaoService';
import CamiaoController from "./camiaoController";
import ICamiaoDTO from '../dto/ICamiaoDTO';


describe('camião controller', function () {
	beforeEach(function() {
    });
    
    it('returns json with the values when createCamiao', async function () {
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


		let camiaoSchemaInstance = require("../persistence/schemas/camiaoSchema").default;
		Container.set("camiaoSchema", camiaoSchemaInstance);

		let camiaoRepoClass = require(config.repos.camiao.path).default;
		let camiaoRepoInstance = Container.get(camiaoRepoClass);
		Container.set(config.repos.camiao.name, camiaoRepoInstance);

		let camiaoServiceClass = require(config.services.camiao.path).default;
		let camiaoServiceInstance = Container.get(camiaoServiceClass);
		Container.set(config.services.camiao.name, camiaoServiceInstance);

		camiaoServiceInstance = Container.get(config.services.camiao.name);
		const mock = sinon.stub(camiaoServiceInstance, "createCamiao").returns( Result.ok<ICamiaoDTO>( {"matricula": req.body.matricula,
        "tara": req.body.tara,
        "capacidade": req.body.capacidade,
        "cargaBateria": req.body.cargaBateria,
        "autonomia": req.body.autonomia,
        "tempoCarregamentoRapido": req.body.tempoCarregamentoRapido} ));


		const ctrl = new CamiaoController(camiaoServiceInstance as ICamiaoService);

		await ctrl.createCamiao(<Request>req, <Response>res, <NextFunction>next);

		sinon.assert.calledOnce(mock);
		sinon.assert.calledWith(mock, sinon.match({ "matricula": req.body.matricula,
        "tara": req.body.tara,
        "capacidade": req.body.capacidade,
        "cargaBateria": req.body.cargaBateria,
        "autonomia": req.body.autonomia,
        "tempoCarregamentoRapido": req.body.tempoCarregamentoRapido}));

        mock.restore();
        
	})

    it('GetAllCamioes: returns json with the values of Camiao using GetCamioes', async function () {
        let body1 = {
        "matricula": "ER-21-AA",
        "tara": 20,
        "capacidade": 500,
        "cargaBateria": 2123,
        "autonomia": 114,
        "tempoCarregamentoRapido": 67
        }

        let req2: Partial<Request> = {};
        req2.body = "";

        let res2: Partial<Response> = {
            json: sinon.spy()
        };

		let next: Partial<NextFunction> = () => {};


		let camiaoSchemaInstance = require("../persistence/schemas/camiaoSchema").default;
		Container.set("camiaoSchema", camiaoSchemaInstance);

		let camiaoRepoClass = require("../repos/camiaoRepo").default;
		let camiaoRepoInstance = Container.get(camiaoRepoClass);
		Container.set("CamiaoRepo", camiaoRepoInstance);

		let camiaoServiceClass = require("../services/camiaoService").default;
		let camiaoServiceInstance = Container.get(camiaoServiceClass);
		Container.set("CamiaoService", camiaoServiceInstance);

		camiaoServiceInstance = Container.get("CamiaoService");
		const mock = sinon.stub(camiaoServiceInstance, "getCamioes").returns( Result.ok<ICamiaoDTO[]>( [{"matricula": "ER-21-AA",
        "tara": 20,
        "capacidade": 500,
        "cargaBateria": 2123,
        "autonomia": 114,
        "tempoCarregamentoRapido": 67}] ));

		const ctrl = new CamiaoController(camiaoServiceInstance as ICamiaoService);

		await ctrl.getCamioes(<Request>req2, <Response>res2, <NextFunction>next);


		sinon.assert.calledOnce(mock);
		sinon.assert.calledWith(mock, );
        
        mock.restore();
	})

    it('returns json with the values of Camiao using GetCamiao', async function () {
        let body1 = {
        "matricula": "ER-21-AA",
        "tara": 20,
        "capacidade": 500,
        "cargaBateria": 2123,
        "autonomia": 114,
        "tempoCarregamentoRapido": 67
        }

        let body2 = {
            "matricula": "BB-21-AA",
            "tara": 20,
            "capacidade": 500,
            "cargaBateria": 2123,
            "autonomia": 114,
            "tempoCarregamentoRapido": 67
        }

        let req3: Partial<Request> = {};

        let param = {
            "matricula": "ER-21-AA"
        }

        req3.params = param;

        let res3: Partial<Response> = {
            json: sinon.spy()
        };

		let next: Partial<NextFunction> = () => {};


		let camiaoSchemaInstance = require("../persistence/schemas/camiaoSchema").default;
		Container.set("camiaoSchema", camiaoSchemaInstance);

		let camiaoRepoClass = require("../repos/camiaoRepo").default;
		let camiaoRepoInstance = Container.get(camiaoRepoClass);
		Container.set("CamiaoRepo", camiaoRepoInstance);

		let camiaoServiceClass = require("../services/camiaoService").default;
		let camiaoServiceInstance = Container.get(camiaoServiceClass);
		Container.set("CamiaoService", camiaoServiceInstance);

		camiaoServiceInstance = Container.get("CamiaoService");
		const mock = sinon.stub(camiaoServiceInstance, "getCamiao").returns( Result.ok<ICamiaoDTO>( {"matricula": body1.matricula,
        "tara": body1.tara,
        "capacidade": body1.capacidade,
        "cargaBateria": body1.cargaBateria,
        "autonomia": body1.autonomia,
        "tempoCarregamentoRapido": body1.tempoCarregamentoRapido} ));

		const ctrl = new CamiaoController(camiaoServiceInstance as ICamiaoService);

		await ctrl.getCamiao(<Request>req3, <Response>res3, <NextFunction>next);
        

		sinon.assert.calledOnce(mock);
		sinon.assert.calledWith(mock, sinon.match("ER-21-AA"));

        mock.restore();
	})

    it('returns json with the new values of Camiao using updateCamiao', async function () {
        let body = { 
            "matricula": "BB-21-AA",
            "tara": 20,
            "capacidade": 500,
            "cargaBateria": 2123,
            "autonomia": 114,
            "tempoCarregamentoRapido": 67
        };

        let body2 = { 
            "matricula": "BB-21-AA",
            "tara": 45,
            "capacidade": 70,
            "cargaBateria": 2123,
            "autonomia": 114,
            "tempoCarregamentoRapido": 67
        };
        let req2: Partial<Request> = {};
		req2.body = body2;

        let res2: Partial<Response> = {
			json: sinon.spy()
        };

		let next: Partial<NextFunction> = () => {};


		let camiaoSchemaInstance = require("../persistence/schemas/camiaoSchema").default;
		Container.set("camiaoSchema", camiaoSchemaInstance);

		let camiaoRepoClass = require("../repos/camiaoRepo").default;
		let camiaoRepoInstance = Container.get(camiaoRepoClass);
		Container.set("CamiaoRepo", camiaoRepoInstance);

		let camiaoServiceClass = require("../services/camiaoService").default;
		let camiaoServiceInstance = Container.get(camiaoServiceClass);
		Container.set("CamiaoService", camiaoServiceInstance);

		camiaoServiceInstance = Container.get("CamiaoService");
		const mock = sinon.stub(camiaoServiceInstance, "updateCamiao").returns( Result.ok<ICamiaoDTO>( {"matricula": req2.body.matricula,
        "tara": req2.body.tara,
        "capacidade": req2.body.capacidade,
        "cargaBateria": req2.body.cargaBateria,
        "autonomia": req2.body.autonomia,
        "tempoCarregamentoRapido": req2.body.tempoCarregamentoRapido} ));


		const ctrl = new CamiaoController(camiaoServiceInstance as ICamiaoService);

		await ctrl.updateCamiao(<Request>req2, <Response>res2, <NextFunction>next);

		sinon.assert.calledOnce(mock);
		sinon.assert.calledWith(mock, sinon.match({ "matricula": req2.body.matricula,
        "tara": req2.body.tara,
        "capacidade": req2.body.capacidade,
        "cargaBateria": req2.body.cargaBateria,
        "autonomia": req2.body.autonomia,
        "tempoCarregamentoRapido": req2.body.tempoCarregamentoRapido}));

        mock.restore();
    })

    it('UpdatePartialCamiao: returns json with the new values of Camiao using updatePartialCamiao', async function () {
        let body = { 
            "matricula": "BB-21-AA",
            "tara": 20,
            "capacidade": 500,
        };
        let req: Partial<Request> = {};
		req.body = body;

        let res: Partial<Response> = {};

        let body2 = { 
            "matricula": "BB-21-AA",
            "tara": 45,
            "capacidade": 70,
            "cargaBateria": 2123,
            "autonomia": 114,
            "tempoCarregamentoRapido": 67
        };
        let req2: Partial<Request> = {};
		req2.body = body2;

        let res2: Partial<Response> = {
			json: sinon.spy()
        };

		let next: Partial<NextFunction> = () => {};


		let camiaoSchemaInstance = require("../persistence/schemas/camiaoSchema").default;
		Container.set("camiaoSchema", camiaoSchemaInstance);

		let camiaoRepoClass = require("../repos/camiaoRepo").default;
		let camiaoRepoInstance = Container.get(camiaoRepoClass);
		Container.set("CamiaoRepo", camiaoRepoInstance);

		let camiaoServiceClass = require("../services/camiaoService").default;
		let camiaoServiceInstance = Container.get(camiaoServiceClass);
		Container.set("CamiaoService", camiaoServiceInstance);

		camiaoServiceInstance = Container.get("CamiaoService");
		const mock = sinon.stub(camiaoServiceInstance, "updateParcialCamiao").returns( Result.ok<ICamiaoDTO>( {"matricula": req2.body.matricula,
        "tara": req.body.tara,
        "capacidade": req.body.capacidade,
        "cargaBateria": req2.body.cargaBateria,
        "autonomia": req2.body.autonomia,
        "tempoCarregamentoRapido": req2.body.tempoCarregamentoRapido} ));


		const ctrl = new CamiaoController(camiaoServiceInstance as ICamiaoService);

		await ctrl.updateParcialCamiao(<Request>req2, <Response>res2, <NextFunction>next);

		sinon.assert.calledOnce(mock);
		sinon.assert.calledWith(mock, sinon.match({ "matricula": req2.body.matricula,
        "tara": req2.body.tara,
        "capacidade": req2.body.capacidade,
        "cargaBateria": req2.body.cargaBateria,
        "autonomia": req2.body.autonomia,
        "tempoCarregamentoRapido": req2.body.tempoCarregamentoRapido}));

        mock.restore();
    })


});