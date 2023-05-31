import { Viagem } from "../../domain/viagem";

export default interface IPlaneamentoRepo {
    getPlaneamento (data: number, heuristica: string);
    getPlaneamentoFrota(data: number, ng: number, dp: number, pc: number, pm: number, cp: number);
    save(viagem: Viagem, data: number);
    findAllViagens ();
    getEntregas(data:string): Promise<JSON>;
    findAllViagensPagina (pagina:string);
    deleteViagem(matricula: string, data: number): Promise<Viagem> ;
    findViagensByCamiaoData (camiao: string, data: number): Promise<Viagem>;
}