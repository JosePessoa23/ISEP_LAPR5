import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';

import config from "../../../config";
import IPlaneamentoController from '../../controllers/IControllers/IPlaneamentoController';
import middlewares from '../middlewares';


const route = Router();

export default (app: Router) => {
  app.use('/planeamento', middlewares.verifyTokenGL);
  app.use('/planeamento', route);

  const ctrl = Container.get(config.controllers.planeamento.name) as IPlaneamentoController;

  route.get('/:data/:heuristica',
    (req, res, next) => ctrl.getPlaneamento(req, res, next) );

    route.get('/plano/frota/:data',
    (req, res, next) => ctrl.getPlaneamentoFrota(req, res, next) );

    route.get('/plano/alternativo/:data',
    (req, res, next) => ctrl.getPlano(req, res, next) );

    route.get('',
    (req, res, next) => ctrl.getViagens(req, res, next) );

    route.get('/viagens/pagina/:pagina',
    (req, res, next) => ctrl.getViagensPagina(req, res, next) );

    route.get('/viagem/:camiao/:data',
    (req, res, next) => ctrl.getViagemByCamiaoData(req, res, next) );

    route.delete('/:matricula/:data',
    (req, res, next) => ctrl.deleteViagem(req, res, next) );
}