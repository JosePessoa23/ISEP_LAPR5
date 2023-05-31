import { Request, Response, NextFunction } from 'express';

export default interface ICamiaoController  {
  createCamiao(req: Request, res: Response, next: NextFunction);
  updateCamiao(req: Request, res: Response, next: NextFunction);
  getCamiao(req: Request, res: Response, next: NextFunction);
  getCamioes(req: Request, res: Response, next: NextFunction);
  updateParcialCamiao(req: Request, res: Response, next: NextFunction);
  deleteByMatricula(req: Request, res: Response, next: NextFunction);
  getCamioesDisponiveis(req: Request, res: Response, next: NextFunction);
}