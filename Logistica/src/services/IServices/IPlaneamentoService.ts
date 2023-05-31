import { Result } from "../../core/logic/Result";
import IPlaneamentoDTO from "../../dto/IPlaneamentoDTO";
import IViagemDTO from "../../dto/IViagemDTO";

export default interface IPlaneamentoService{
    getPlaneamento(data: number, heuristica:string): Promise<Result<IPlaneamentoDTO>>;
    getPlaneamentoFrota(data: number,  ng: number, dp: number, pc: number, pm: number, cp: number);
    getViagens (): Promise<Result<IViagemDTO[]>>;
    getViagensPagina (pagina: string): Promise<Result<IViagemDTO[]>>;
    planeamentoAlternativo(data:string): Promise<JSON[]>;
    delete(matricula: string, data:number): Promise<Result<IViagemDTO>> ;
    getViagemByCamiaoData (camiao: string, data:number): Promise<Result<IViagemDTO>>
}