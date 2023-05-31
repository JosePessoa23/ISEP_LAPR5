import { Request, Response, NextFunction } from 'express';

export default interface IPlaneamentoController  {
  getPlaneamento(req: Request, res: Response, next: NextFunction);
  getPlaneamentoFrota(req: Request, res: Response, next: NextFunction);
  getViagens(req: Request, res: Response, next: NextFunction);
  getViagensPagina(req: Request, res: Response, next: NextFunction);
  deleteViagem(req: Request, res: Response, next: NextFunction);
  getViagemByCamiaoData(req: Request, res: Response, next: NextFunction);
  getPlano(req: Request, res: Response, next: NextFunction)
}