import { Inject, Service } from "typedi";
import IUserController from "./IControllers/IUserController";
import config from "../../config";
import IUserService from "../services/IServices/IUserService";
import { NextFunction, Request, Response } from "express";
import { IUserDTO } from "../dto/IUserDTO";
import { Result } from "../core/logic/Result";


@Service()
export default class UserController implements IUserController {
  constructor(
      @Inject(config.services.user.name) private userServiceInstance : IUserService
  ) {}

  public async signUp(req: Request, res: Response, next: NextFunction){
    try {
        const userOrError = await this.userServiceInstance.signUp(req.body as IUserDTO) as Result<IUserDTO>;
        if (userOrError.isFailure) {
          return res.status(402).send();
        }
  
        const rotaDTO = userOrError.getValue();
        return res.json( rotaDTO ).status(201);
      }
      catch (e) {
        return next(e);
      }
  }

  public async signIn(req: Request, res: Response, next: NextFunction){
    try {
        const userOrError = await this.userServiceInstance.SignIn(req.body.email) as Result<{ userDTO: IUserDTO, token: string }>;
          
        if (userOrError.isFailure) {
          return res.status(402).send();
        }
  
        const rotaDTO = userOrError.getValue();
        return res.json( rotaDTO ).status(201);
      }
      catch (e) {
        return next(e);
      }
  }

  public async getUsers(req: Request, res: Response, next: NextFunction){
    try {
        const userOrError = await this.userServiceInstance.getUsers() as Result<IUserDTO[]>;
          
        if (userOrError.isFailure) {
          return res.status(402).send();
        }
  
        const rotaDTO = userOrError.getValue();
        return res.json( rotaDTO ).status(201);
      }
      catch (e) {
        return next(e);
      }
  }

  public async getUserByEmail(req: Request, res: Response, next: NextFunction){
    try {
        const userOrError = await this.userServiceInstance.getUserByEmail(req.params.email) as Result<IUserDTO>;
          
        if (userOrError.isFailure) {
          return res.status(402).send();
        }
  
        const rotaDTO = userOrError.getValue();
        return res.json( rotaDTO ).status(201);
      }
      catch (e) {
        return next(e);
      }
  }

  public async updateUser(req: Request, res: Response, next: NextFunction){
    try {
        const userOrError = await this.userServiceInstance.updateUser(req.body as IUserDTO) as Result<IUserDTO>;
          
        if (userOrError.isFailure) {
          return res.status(402).send();
        }
  
        const rotaDTO = userOrError.getValue();
        return res.json( rotaDTO ).status(201);
      }
      catch (e) {
        return next(e);
      }
  }
}