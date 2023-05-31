import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';
import ICamiaoController from '../../controllers/IControllers/ICamiaoController'; 
import middlewares from '../middlewares';

import config from "../../../config";

const route = Router();

export default (app: Router) => {
  app.use('/camioes',middlewares.verifyTokenGF);
  app.use('/camioes', route);

  const ctrl = Container.get(config.controllers.camiao.name) as ICamiaoController;

  route.post('',
    celebrate({
      body: Joi.object({
        matricula: Joi.string().required(),
        tara: Joi.number().required(),
        capacidade: Joi.number().required(),
        cargaBateria: Joi.number().required(),
        autonomia: Joi.number().required(),
        tempoCarregamentoRapido: Joi.number().required(),
    })
    }),
    (req, res, next) => ctrl.createCamiao(req, res, next) );

    route.put('',
    celebrate({
      body: Joi.object({
        id: Joi.string(),
        matricula: Joi.string().required(),
        tara: Joi.number().required(),
        capacidade: Joi.number().required(),
        cargaBateria: Joi.number().required(),
        autonomia: Joi.number().required(),
        tempoCarregamentoRapido: Joi.number().required(),
        disponibilidade: Joi.boolean(),
      }),
    }),
    (req, res, next) => ctrl.updateCamiao(req, res, next) );

    route.get('/:matricula',
    (req, res, next) => ctrl.getCamiao(req, res, next) );

    route.get('',
    (req, res, next) => ctrl.getCamioes(req, res, next) );

    route.get('/disponibilidade/true',
    (req, res, next) => ctrl.getCamioesDisponiveis(req, res, next) );

    route.patch('',
    celebrate({
      body: Joi.object({
        matricula: Joi.string().required(),
        tara: Joi.number(),
        capacidade: Joi.number(),
        cargaBateria: Joi.number(),
        autonomia: Joi.number(),
        tempoCarregamentoRapido: Joi.number(),
        disponibilidade: Joi.boolean(),
      }),
    }),
    (req, res, next) => ctrl.updateParcialCamiao(req, res, next));

    route.delete('/:matricula',
    (req, res, next) => ctrl.deleteByMatricula(req, res, next) );

};