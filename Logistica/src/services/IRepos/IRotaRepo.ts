import { Repo } from "../../core/infra/Repo";
import { Rota } from "../../domain/rota";
import { RotaId } from "../../domain/rotaId";

export default interface IRotaRepo extends Repo<Rota> {
  save(rota: Rota): Promise<Rota>;
  findByDomainId (rotaId: RotaId | string): Promise<Rota>;
  findAllRotas (): Promise<Array<Rota>>;
  findByIdArmazemPartida (idArmazemPartida: string): Promise<Array<Rota>>;
  findByIdArmazemChegada (idArmazemChegada: string): Promise<Array<Rota>>;
  findByPagina (pagina: string): Promise<Array<Rota>>;
  findByPaginaPartida (pagina: string,idPartida: string): Promise<Array<Rota>>;
  findByPaginaChegada (pagina: string,idChegada: string): Promise<Array<Rota>>;
  findByIdArmazens (idArmazemPartida: string,idArmazemChegada: string): Promise<Rota>;
  deleteByArmazensId (idArmazemPartida: string,idArmazemChegada: string): Promise<Rota>;
}