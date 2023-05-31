import { Request, Response, NextFunction } from 'express';

export default interface IRotaController  {
  createRota(req: Request, res: Response, next: NextFunction);
  updateRota(req: Request, res: Response, next: NextFunction);
  getRotaByFilter(req: Request, res: Response, next: NextFunction);
  getRotaPartida(req: Request, res: Response, next: NextFunction);
  getRotaChegada(req: Request, res: Response, next: NextFunction);
  getRotaPagina(req: Request, res: Response, next: NextFunction);
  getRotaPaginaPartida(req: Request, res: Response, next: NextFunction);
  getRotaPaginaChegada(req: Request, res: Response, next: NextFunction);
  getRota(req: Request, res: Response, next: NextFunction);
  getRotas(req: Request, res: Response, next: NextFunction);
  deleteRota(req: Request, res: Response, next: NextFunction);
  patchRota(req: Request, res: Response, next: NextFunction)
}