import expressLoader from './express';
import dependencyInjectorLoader from './dependencyInjector';
import mongooseLoader from './mongoose';
import Logger from './logger';

import config from '../../config';
import UserController from '../controllers/userController';

export default async ({ expressApp }) => {
  const mongoConnection = await mongooseLoader();
  Logger.info('✌️ DB loaded and connected!');

  const userSchema = {
    // compare with the approach followed in repos and services
    name: 'userSchema',
    schema: '../persistence/schemas/userSchema',
  };


  const userController = {
    name: config.controllers.user.name,
    path: config.controllers.user.path
  }


  const userRepo = {
    name: config.repos.user.name,
    path: config.repos.user.path
  }

  const userService = {
    name: config.services.user.name,
    path: config.services.user.path
  }

  const rotaSchema = {
    // compare with the approach followed in repos and services
    name: 'rotaSchema',
    schema: '../persistence/schemas/rotaSchema',
  };

  const rotaController = {
    name: config.controllers.rota.name,
    path: config.controllers.rota.path
  }

  const rotaRepo = {
    name: config.repos.rota.name,
    path: config.repos.rota.path
  }

  const rotaService = {
    name: config.services.rota.name,
    path: config.services.rota.path
  }

  const camiaoSchema = {
    // compare with the approach followed in repos and services
    name: 'camiaoSchema',
    schema: '../persistence/schemas/camiaoSchema',
  };

  const camiaoController = {
    name: config.controllers.camiao.name,
    path: config.controllers.camiao.path
  }

  const camiaoRepo = {
    name: config.repos.camiao.name,
    path: config.repos.camiao.path
  }

  const planeamentoRepo = {
    name: config.repos.planeamento.name,
    path: config.repos.planeamento.path
  }

  const camiaoService = {
    name: config.services.camiao.name,
    path: config.services.camiao.path
  }

  const planeamentoController = {
    name: config.controllers.planeamento.name,
    path: config.controllers.planeamento.path
  }

  const planeamentoService = {
    name: config.services.planeamento.name,
    path: config.services.planeamento.path
  }

  const viagemSchema = {
    // compare with the approach followed in repos and services
    name: 'viagemSchema',
    schema: '../persistence/schemas/viagemSchema',
  };

  await dependencyInjectorLoader({
    mongoConnection,
    schemas: [
      userSchema,
      rotaSchema,
      camiaoSchema,
      viagemSchema
    ],
    controllers: [
      userController,
      rotaController,
      camiaoController,
      planeamentoController
    ],
    repos: [
      userRepo,
      rotaRepo,
      camiaoRepo,
      planeamentoRepo
    ],
    services: [
      userService,
      rotaService,
      camiaoService,
      planeamentoService
    ]
  });
  Logger.info('✌️ Schemas, Controllers, Repositories, Services, etc. loaded');

  await expressLoader({ app: expressApp });
  Logger.info('✌️ Express loaded');
};