
import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';
import IRotaController from '../../controllers/IControllers/IRotaController'; 

import config from "../../../config";
import middlewares from '../middlewares';

const route = Router();

export default (app: Router) => {
  app.use('/rotas', middlewares.verifyTokenGL);
  app.use('/rotas', route);

  const ctrl = Container.get(config.controllers.rota.name) as IRotaController;

  route.post('',
    celebrate({
      body: Joi.object({
        idArmazemPartida: Joi.string().required(),
        idArmazemChegada: Joi.string().required(),
        distancia: Joi.number().required(),
        tempoViagemCheio: Joi.number().required(),
        energiaGasta: Joi.number().required(),
        tempoCarregamentoExtra: Joi.number().required()
      })
    }),
    (req, res, next) => ctrl.createRota(req, res, next) );

    
    route.put('',
    celebrate({
      body: Joi.object({
        idArmazemPartida: Joi.string().required(),
        idArmazemChegada: Joi.string().required(),
        distancia: Joi.number().required(),
        tempoViagemCheio: Joi.number().required(),
        energiaGasta: Joi.number().required(),
        tempoCarregamentoExtra: Joi.number().required()
      }),
    }),
    (req, res, next) => ctrl.updateRota(req, res, next) );

    route.get('/filter',
    (req, res, next) => ctrl.getRotaByFilter(req, res, next) );

    route.get('/filtro/:idPartida/:idChegada',
    (req, res, next) => ctrl.getRota(req, res, next) );

    route.get('/partida/:id',
    (req, res, next) => ctrl.getRotaPartida(req, res, next) );

    route.get('/chegada/:id',
    (req, res, next) => ctrl.getRotaChegada(req, res, next) );

    route.get('/pagina/:pagina',
    (req, res, next) => ctrl.getRotaPagina(req, res, next) );

    route.get('/paginapartida/:pagina/:idPartida',
    (req, res, next) => ctrl.getRotaPaginaPartida(req, res, next) );

    route.get('/paginachegada/:pagina/:idChegada',
    (req, res, next) => ctrl.getRotaPaginaChegada(req, res, next) );

    route.get('',
    (req, res, next) => ctrl.getRotas(req, res, next) );

    route.patch('',
    celebrate({
      body: Joi.object({
        idArmazemPartida: Joi.string(),
        idArmazemChegada: Joi.string(),
        distancia: Joi.number(),
        tempoViagemCheio: Joi.number(),
        energiaGasta: Joi.number(),
        tempoCarregamentoExtra: Joi.number()
      }),
    }),
    (req, res, next) => ctrl.patchRota(req, res, next));

    route.delete('/:idPartida/:idChegada',
    (req, res, next) => ctrl.deleteRota(req, res, next));
};