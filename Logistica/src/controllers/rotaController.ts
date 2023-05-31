import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from "../../config";

import IRotaController from "./IControllers/IRotaController";
import IRotaService from '../services/IServices/IRotaService';
import IRotaDTO from '../dto/IRotaDTO';

import { Result } from "../core/logic/Result";

@Service()
export default class RotaController implements IRotaController /* TODO: extends ../core/infra/BaseController */ {
  constructor(
      @Inject(config.services.rota.name) private rotaServiceInstance : IRotaService
  ) {}

  public async createRota(req: Request, res: Response, next: NextFunction) {
    try {
      const rotaOrError = await this.rotaServiceInstance.createRota(req.body as IRotaDTO) as Result<IRotaDTO>;
        
      if (rotaOrError.isFailure) {
        return res.status(402).send();
      }

      const rotaDTO = rotaOrError.getValue();
      return res.json( rotaDTO ).status(201);
    }
    catch (e) {
      return next(e);
    }
  };

  public async updateRota(req: Request, res: Response, next: NextFunction) {
    try {
      const rotaOrError = await this.rotaServiceInstance.updateRota(req.body as IRotaDTO) as Result<IRotaDTO>;

      if (rotaOrError.isFailure) {
        return res.status(404).send();
      }

      const rotaDTO = rotaOrError.getValue();
      return res.status(201).json( rotaDTO );
    }
    catch (e) {
      return next(e);
    }
  };
  public async getRotaByFilter(req: Request, res: Response, next: NextFunction) {
    try{
      const rotaOrError = await this.rotaServiceInstance.getRotaByFilter(req.body as IRotaDTO) as Result<IRotaDTO[]>;

      if (rotaOrError.isFailure) {
        return res.status(404).send();
      }

      const rotaDTO = rotaOrError.getValue();
      return res.status(201).json( rotaDTO );
    }
    catch (e) {
      return next(e);
    }
  };

  public async getRotaPartida(req: Request, res: Response, next: NextFunction) {
    try{
      const rotaOrError = await this.rotaServiceInstance.getRotaPartida(req.params.id) as Result<IRotaDTO[]>;

      if (rotaOrError.isFailure) {
        return res.status(404).send();
      }

      const rotaDTO = rotaOrError.getValue();
      return res.status(201).json( rotaDTO );
    }
    catch (e) {
      return next(e);
    }
  };

  public async getRotaChegada(req: Request, res: Response, next: NextFunction) {
    try{
      const rotaOrError = await this.rotaServiceInstance.getRotaChegada(req.params.id) as Result<IRotaDTO[]>;

      if (rotaOrError.isFailure) {
        return res.status(404).send();
      }

      const rotaDTO = rotaOrError.getValue();
      return res.status(201).json( rotaDTO );
    }
    catch (e) {
      return next(e);
    }
  };

  public async getRotaPagina(req: Request, res: Response, next: NextFunction) {
    try{
      const rotaOrError = await this.rotaServiceInstance.getRotaPagina(req.params.pagina) as Result<IRotaDTO[]>;

      if (rotaOrError.isFailure) {
        return res.status(404).send();
      }

      const rotaDTO = rotaOrError.getValue();
      return res.status(201).json( rotaDTO );
    }
    catch (e) {
      return next(e);
    }
  };

  public async getRotaPaginaPartida(req: Request, res: Response, next: NextFunction) {
    try{
      const rotaOrError = await this.rotaServiceInstance.getRotaPaginaPartida(req.params.pagina,req.params.idPartida) as Result<IRotaDTO[]>;

      if (rotaOrError.isFailure) {
        return res.status(404).send();
      }

      const rotaDTO = rotaOrError.getValue();
      return res.status(201).json( rotaDTO );
    }
    catch (e) {
      return next(e);
    }
  };

  public async getRotaPaginaChegada(req: Request, res: Response, next: NextFunction) {
    try{
      const rotaOrError = await this.rotaServiceInstance.getRotaPaginaChegada(req.params.pagina,req.params.idChegada) as Result<IRotaDTO[]>;

      if (rotaOrError.isFailure) {
        return res.status(404).send();
      }

      const rotaDTO = rotaOrError.getValue();
      return res.status(201).json( rotaDTO );
    }
    catch (e) {
      return next(e);
    }
  };

  public async getRotas(req: Request, res: Response, next: NextFunction){
    try{
      const rotaOrError = await this.rotaServiceInstance.getRotas() as Result<IRotaDTO[]>;

      if (rotaOrError.isFailure) {
        return res.status(404).send();
      }

      const rotaDTO = rotaOrError.getValue();
      return res.status(201).json( rotaDTO );
    }
    catch (e) {
      return next(e);
    }
  };

  public async getRota(req: Request, res: Response, next: NextFunction) {
    try{
      const rotaOrError = await this.rotaServiceInstance.getRota(req.params.idPartida,req.params.idChegada) as Result<IRotaDTO>;

      if (rotaOrError.isFailure) {
        return res.status(404).send();
      }

      const rotaDTO = rotaOrError.getValue();
      return res.status(201).json( rotaDTO );
    }
    catch (e) {
      return next(e);
    }
  };

  public async patchRota(req: Request, res: Response, next: NextFunction) {
    try {
      const rotaOrError = await this.rotaServiceInstance.patchRota(req.body as IRotaDTO) as Result<IRotaDTO>;

      if (rotaOrError.isFailure) {
        return res.status(404).send();
      }

      const rotaDTO = rotaOrError.getValue();
      return res.status(201).json( rotaDTO );
    }
    catch (e) {
      return next(e);
    }
  };

  public async deleteRota(req: Request, res: Response, next: NextFunction) {
    try{
      const rotaOrError = await this.rotaServiceInstance.deleteRota(req.params.idPartida,req.params.idChegada) as Result<IRotaDTO>;

      if (rotaOrError.isFailure) {
        return res.status(404).send();
      }

      const rotaDTO = rotaOrError.getValue();
      return res.status(201).json( rotaDTO );
    }
    catch (e) {
      return next(e);
    }
  };
}