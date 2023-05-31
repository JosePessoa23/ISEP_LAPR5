import 'reflect-metadata';

import config from "../../config";
import * as sinon from 'sinon';
import { Response, Request, NextFunction } from 'express';
import { Container } from 'typedi';
import { Result } from '../core/logic/Result';
import IRotaService from '../services/IServices/IRotaService';
import RotaController from "./rotaController";
import IRotaDTO from '../dto/IRotaDTO';
import { RotaMap } from "../mappers/RotaMap";

describe('rota controller', function () {
	beforeEach(function() {
    });
    it('returns json with id+name values when createRota', async function () {
        let body = { 
          "idArmazemPartida": 'str',
        "idArmazemChegada": 'string',
        "distancia": 12,
        "tempoViagemCheio": 13,
        "energiaGasta": 14,
        "tempoCarregamentoExtra": 15
        };
        let req: Partial<Request> = {};
		req.body = body;

        let res: Partial<Response> = {
			json: sinon.spy()
        };
		let next: Partial<NextFunction> = () => {};


		let rotaSchemaInstance = require("../persistence/schemas/rotaSchema").default;
		Container.set("rotaSchema", rotaSchemaInstance);

		let rotaRepoClass = require("../repos/rotaRepo").default;
		let rotaRepoInstance = Container.get(rotaRepoClass);
		Container.set("RotaRepo", rotaRepoInstance);

		let rotaServiceClass = require("../services/rotaService").default;
		let rotaServiceInstance = Container.get(rotaServiceClass);
		Container.set("RotaService", rotaServiceInstance);

		const mock = sinon.stub(rotaServiceInstance, "createRota").returns( Result.ok<IRotaDTO>( {"id":req.body.id,
    "idArmazemPartida": req.body.idArmazemPartida,
    "idArmazemChegada": req.body.idArmazemChegada,
    "distancia": req.body.distancia,
    "tempoViagemCheio": req.body.tempoViagemCheio,
    "energiaGasta": req.body.energiaGasta,
    "tempoCarregamentoExtra": req.body.tempoCarregamentoExtra} ));

		const ctrl = new RotaController(rotaServiceInstance as IRotaService);

		await ctrl.createRota(<Request>req, <Response>res, <NextFunction>next);

		sinon.assert.calledOnce(mock);
		sinon.assert.calledWith(mock, sinon.match({ "id":req.body.id,
    "idArmazemPartida": req.body.idArmazemPartida,
    "idArmazemChegada": req.body.idArmazemChegada,
    "distancia": req.body.distancia,
    "tempoViagemCheio": req.body.tempoViagemCheio,
    "energiaGasta": req.body.energiaGasta,
    "tempoCarregamentoExtra": req.body.tempoCarregamentoExtra}));
    mock.restore();
	});

  it('returns json with the new values of Rota using updateRota', async function () {
    let body = { 
      "idArmazemPartida": 'str',
      "idArmazemChegada": 'string',
      "distancia": 12,
      "tempoViagemCheio": 13,
      "energiaGasta": 14,
      "tempoCarregamentoExtra": 15
    };
    let req: Partial<Request> = {};
req.body = body;

    let res: Partial<Response> = {};

    let body2 = { 
      "idArmazemPartida": 'str2',
      "idArmazemChegada": 'string2',
      "distancia": 122,
      "tempoViagemCheio": 132,
      "energiaGasta": 142,
      "tempoCarregamentoExtra": 152
    };
    let req2: Partial<Request> = {};
      req2.body = body2;

    let res2: Partial<Response> = {
      json: sinon.spy()
    };

    let next: Partial<NextFunction> = () => {};


    let rotaSchemaInstance = require("../persistence/schemas/rotaSchema").default;
		Container.set("rotaSchema", rotaSchemaInstance);

		let rotaRepoClass = require("../repos/rotaRepo").default;
		let rotaRepoInstance = Container.get(rotaRepoClass);
		Container.set("RotaRepo", rotaRepoInstance);

		let rotaServiceClass = require("../services/rotaService").default;
		let rotaServiceInstance = Container.get(rotaServiceClass);
		Container.set("RotaService", rotaServiceInstance);


    const mock = sinon.stub(rotaServiceInstance, "updateRota").returns( Result.ok<IRotaDTO>( {"id":req2.body.id,"idArmazemPartida": req2.body.idArmazemPartida,
    "idArmazemChegada": req2.body.idArmazemChegada,
    "distancia": req2.body.distancia,
    "tempoViagemCheio": req2.body.tempoViagemCheio,
    "energiaGasta": req2.body.energiaGasta,
    "tempoCarregamentoExtra": req2.body.tempoCarregamentoExtra} ));


    const ctrl = new RotaController(rotaServiceInstance as IRotaService);

    await ctrl.updateRota(<Request>req2, <Response>res2, <NextFunction>next);

    sinon.assert.calledOnce(mock);
    sinon.assert.calledWith(mock, sinon.match({"idArmazemPartida": req2.body.idArmazemPartida,
    "idArmazemChegada": req2.body.idArmazemChegada,
    "distancia": req2.body.distancia,
    "tempoViagemCheio": req2.body.tempoViagemCheio,
    "energiaGasta": req2.body.energiaGasta,
    "tempoCarregamentoExtra": req2.body.tempoCarregamentoExtra}));

    mock.restore();
})
it('returns json with the new values of Rota using patchRota', async function () {
  let body = { 
    "idArmazemPartida": 'str',
    "idArmazemChegada": 'string',
    "distancia": 12,
  };
  let req: Partial<Request> = {};
req.body = body;

  let res: Partial<Response> = {};

  let body2 = { 
    "idArmazemPartida": 'str2',
    "idArmazemChegada": 'string2',
    "distancia": 122,
    "tempoViagemCheio": 132,
    "energiaGasta": 142,
    "tempoCarregamentoExtra": 152
  };
  let req2: Partial<Request> = {};
req2.body = body2;

  let res2: Partial<Response> = {
json: sinon.spy()
  };

let next: Partial<NextFunction> = () => {};


let rotaSchemaInstance = require("../persistence/schemas/rotaSchema").default;
Container.set("rotaSchema", rotaSchemaInstance);

let rotaRepoClass = require("../repos/rotaRepo").default;
let rotaRepoInstance = Container.get(rotaRepoClass);
Container.set("RotaRepo", rotaRepoInstance);

let rotaServiceClass = require("../services/rotaService").default;
let rotaServiceInstance = Container.get(rotaServiceClass);
Container.set("RotaService", rotaServiceInstance);

const mock = sinon.stub(rotaServiceInstance, "patchRota").returns( Result.ok<IRotaDTO>( {"id":req2.body.id,"idArmazemPartida": req.body.idArmazemPartida,
"idArmazemChegada": req.body.idArmazemChegada,
"distancia": req.body.distancia,
"tempoViagemCheio": req2.body.tempoViagemCheio,
"energiaGasta": req2.body.energiaGasta,
"tempoCarregamentoExtra": req2.body.tempoCarregamentoExtra} ));


const ctrl = new RotaController(rotaServiceInstance as IRotaService);

await ctrl.patchRota(<Request>req2, <Response>res2, <NextFunction>next);

sinon.assert.calledOnce(mock);
sinon.assert.calledWith(mock, sinon.match({"idArmazemPartida": req2.body.idArmazemPartida,
"idArmazemChegada": req2.body.idArmazemChegada,
"distancia": req2.body.distancia,
"tempoViagemCheio": req2.body.tempoViagemCheio,
"energiaGasta": req2.body.energiaGasta,
"tempoCarregamentoExtra": req2.body.tempoCarregamentoExtra}));

  mock.restore();
})

it('returns json with the values of Rota using getRotas', async function () {
  let body1 = { 
    "idArmazemPartida": 'str2',
    "idArmazemChegada": 'string2',
    "distancia": 122,
    "tempoViagemCheio": 132,
    "energiaGasta": 142,
    "tempoCarregamentoExtra": 152
  };

  let req: Partial<Request> = {};
  req.body = "";

  let res: Partial<Response> = {
      json: sinon.spy()
  };

let next: Partial<NextFunction> = () => {};


let rotaSchemaInstance = require("../persistence/schemas/rotaSchema").default;
Container.set("rotaSchema", rotaSchemaInstance);

let rotaRepoClass = require("../repos/rotaRepo").default;
let rotaRepoInstance = Container.get(rotaRepoClass);
Container.set("RotaRepo", rotaRepoInstance);

let rotaServiceClass = require("../services/rotaService").default;
let rotaServiceInstance = Container.get(rotaServiceClass);
Container.set("RotaService", rotaServiceInstance);

const mock = sinon.stub(rotaServiceInstance, "getRotas").returns( Result.ok<IRotaDTO[]>( [body1 as IRotaDTO] ));

const ctrl = new RotaController(rotaServiceInstance as IRotaService);

await ctrl.getRotas(<Request>req, <Response>res, <NextFunction>next);


sinon.assert.calledOnce(mock);
sinon.assert.calledWith(mock, );
  
  mock.restore();
})

it('returns json with the values of Rota using getRotaByFilter', async function () {

  let body1 = { 
    "idArmazemPartida": 'str2',
    "idArmazemChegada": 'string2',
    "distancia": 122,
    "tempoViagemCheio": 132,
    "energiaGasta": 142,
    "tempoCarregamentoExtra": 152
  };

  let body2 = { 
    "idArmazemPartida": 'str2',
    "idArmazemChegada": 'string2',
  };

  let req: Partial<Request> = {};
  req.body = body2;

  let res: Partial<Response> = {
      json: sinon.spy()
  };

let next: Partial<NextFunction> = () => {};


let rotaSchemaInstance = require("../persistence/schemas/rotaSchema").default;
Container.set("rotaSchema", rotaSchemaInstance);

let rotaRepoClass = require("../repos/rotaRepo").default;
let rotaRepoInstance = Container.get(rotaRepoClass);
Container.set("RotaRepo", rotaRepoInstance);

let rotaServiceClass = require("../services/rotaService").default;
let rotaServiceInstance = Container.get(rotaServiceClass);
Container.set("RotaService", rotaServiceInstance);

const mock = sinon.stub(rotaServiceInstance, "getRotaByFilter").returns( Result.ok<IRotaDTO[]>( [body1 as IRotaDTO] ));

const ctrl = new RotaController(rotaServiceInstance as IRotaService);

await ctrl.getRotaByFilter(<Request>req, <Response>res, <NextFunction>next);

sinon.assert.calledOnce(mock);
sinon.assert.calledWith(mock, body2);
  
  mock.restore();
})

});
