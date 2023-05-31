import { Result } from "../../core/logic/Result";
import IRotaDTO from "../../dto/IRotaDTO";

export default interface IRotaService  {
  createRota(rotaDTO: IRotaDTO): Promise<Result<IRotaDTO>>;
  updateRota(rotaDTO: IRotaDTO): Promise<Result<IRotaDTO>>;
  getRotaByFilter (rotaDTO: IRotaDTO): Promise<Result<IRotaDTO[]>>;
  getRotaPartida (id: string): Promise<Result<IRotaDTO[]>>;
  getRotaChegada (id: string): Promise<Result<IRotaDTO[]>>;
  getRotaPagina (pagina: string): Promise<Result<IRotaDTO[]>>;
  getRotaPaginaPartida (pagina: string,idPartida: string): Promise<Result<IRotaDTO[]>>;
  getRotaPaginaChegada (pagina: string,idChegada: string): Promise<Result<IRotaDTO[]>>;
  getRota (idPartida: string,idChegada: string): Promise<Result<IRotaDTO>>;
  getRotas (): Promise<Result<IRotaDTO[]>>;
  deleteRota (idPartida: string,idChegada: string): Promise<Result<IRotaDTO>>;
  patchRota(rotaDTO: IRotaDTO): Promise<Result<IRotaDTO>>
}