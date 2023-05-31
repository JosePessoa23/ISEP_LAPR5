import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import { isNumber } from 'util';
import config from "../../config";
import { Result } from '../core/logic/Result';
import IPlaneamentoDTO from '../dto/IPlaneamentoDTO';
import IViagemDTO from '../dto/IViagemDTO';
import IPlaneamentoService from '../services/IServices/IPlaneamentoService';
import IPlaneamentoController from './IControllers/IPlaneamentoController';



@Service()
export default class PlaneamentoController implements IPlaneamentoController {
  constructor(
    @Inject(config.services.planeamento.name) private planeamentoServiceInstance : IPlaneamentoService
  ) {}

    public async getPlaneamento(req: Request, res: Response, next: NextFunction) {
        try {
            var data = Number(req.params.data);
            var planeamentoOrError = await this.planeamentoServiceInstance.getPlaneamento(data, req.params.heuristica);

        if (planeamentoOrError.isFailure) {
            return res.status(402).send();
          }
    
          const planeamentoDTO = planeamentoOrError;
          return res.json( planeamentoDTO ).status(201);
        }
        catch (e) {
          return next(e);
        }
    }

    public async getPlaneamentoFrota(req: Request, res: Response, next: NextFunction) {
      try {
          var data = Number(req.params.data);
          var ng = Number(req.header('ng'));
          var dp = Number(req.header('dp'));
          var pc = Number(req.header('pc'));
          var pm = Number(req.header('pm'));
          var cp = Number(req.header('cp'));
          var planeamentoOrError = await this.planeamentoServiceInstance.getPlaneamentoFrota(data, ng,dp,pc,pm,cp);

      if (planeamentoOrError.isFailure) {
          return res.status(402).send();
        }
  
        const planeamentoDTO = planeamentoOrError;
        return res.json( planeamentoDTO ).status(201);
      }
      catch (e) {
        return next(e);
      }
  }

  public async getPlano(req: Request, res: Response, next: NextFunction){
    try{
      const planoOrError = await this.planeamentoServiceInstance.planeamentoAlternativo(req.params.data);

      if (planoOrError==null) {
        return res.status(404).send();
      }

      return res.status(201).json(planoOrError);
    }
    catch (e) {
      return next(e);
    }
  };

  public async deleteViagem(req: Request, res: Response, next: NextFunction){
    try{
      var data = Number(req.params.data);
      const viagemOrError = await this.planeamentoServiceInstance.delete(req.params.matricula,data);

      if (viagemOrError.isFailure) {
        return res.status(404).send();
      }

      const viagemDTO = viagemOrError.getValue();
      return res.status(201).json( viagemDTO );
    }
    catch (e) {
      return next(e);
    }
  }

  public async getViagens(req: Request, res: Response, next: NextFunction){
    try{
      const viagemOrError = await this.planeamentoServiceInstance.getViagens() as Result<IViagemDTO[]>;

      if (viagemOrError.isFailure) {
        return res.status(404).send();
      }

      const viagemDTO = viagemOrError.getValue();
      return res.status(201).json( viagemDTO );
    }
    catch (e) {
      return next(e);
    }
  };

  public async getViagensPagina(req: Request, res: Response, next: NextFunction){
    try{
      const viagemOrError = await this.planeamentoServiceInstance.getViagensPagina(req.params.pagina) as Result<IViagemDTO[]>;

      if (viagemOrError.isFailure) {
        return res.status(404).send();
      }

      const viagemDTO = viagemOrError.getValue();
      return res.status(201).json( viagemDTO );
    }
    catch (e) {
      return next(e);
    }
  };

  public async getViagemByCamiaoData(req: Request, res: Response, next: NextFunction){
    try{
      var data1 = Number(req.params.data);
      const viagemOrError = await this.planeamentoServiceInstance.getViagemByCamiaoData(req.params.camiao, data1) as Result<IViagemDTO>;

      if (viagemOrError.isFailure) {
        return res.status(404).send();
      }

      const viagemDTO = viagemOrError.getValue();
      return res.status(201).json( viagemDTO );
    }
    catch (e) {
      return next(e);
    }
  };
};