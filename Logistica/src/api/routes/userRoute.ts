import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';

import AuthService from '../../services/userService';
import { IUserDTO } from '../../dto/IUserDTO';

import middlewares from '../middlewares';
import { celebrate, Joi } from 'celebrate';
import winston = require('winston');
import config from '../../../config';
import IUserController from '../../controllers/IControllers/IUserController';

const route = Router();

export default (app: Router) => {
  const ctrl = Container.get(config.controllers.user.name) as IUserController;
  app.use('/auth', route);

  route.post(
    '/signup',
    celebrate({
      body: Joi.object({
        name: Joi.string().required(),
        email: Joi.string().required(),
        phoneNumber: Joi.number().required(),
        role: Joi.string().required()
      }),
    }),
    (req, res, next) => ctrl.signUp(req, res, next) );
    

  route.post(
    '/signin',
    celebrate({
      body: Joi.object({
        email: Joi.string().required(),
      }),
    }),
    (req, res, next) => ctrl.signIn(req, res, next) );

    route.put(
      '/updateuser',
      celebrate({
        body: Joi.object({
          name: Joi.string().required(),
          email: Joi.string().required(),
          phoneNumber: Joi.number().required(),
          role: Joi.string().required()
        }),
      }),
      (req, res, next) => ctrl.updateUser(req, res, next)
    );

    route.get('',
    (req, res, next) => ctrl.getUsers(req, res, next) );

    route.get('/users/:email',
    (req, res, next) => ctrl.getUserByEmail(req, res, next) );


  /**
   * @TODO Let's leave this as a place holder for now
   * The reason for a logout route could be deleting a 'push notification token'
   * so the device stops receiving push notifications after logout.
   *
   * Another use case for advance/enterprise apps, you can store a record of the jwt token
   * emitted for the session and add it to a black list.
   * It's really annoying to develop that but if you had to, please use Redis as your data store
   */
  /*route.post('/logout', middlewares.isAuth, (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get('logger') as winston.Logger;
    logger.debug('Calling Sign-Out endpoint with body: %o', req.body)
    try {
      //@TODO AuthService.Logout(req.user) do some clever stuff
      return res.status(200).end();
    } catch (e) {
      logger.error('🔥 error %o', e);
      return next(e);
    }
  });

  app.use('/users', route);*/

  //route.get('/me', middlewares.isAuth, middlewares.attachCurrentUser, user_controller.getMe);
};
