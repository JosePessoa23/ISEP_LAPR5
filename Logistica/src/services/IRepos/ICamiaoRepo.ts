import { Repo } from "../../core/infra/Repo";
import { Camiao } from "../../domain/camiao";
import { CamiaoId } from "../../domain/camiaoId";
import { MatriculaCamiao } from "../../domain/camiaoMatricula";

export default interface ICamiaoRepo extends Repo<Camiao> {
  save(camiao: Camiao): Promise<Camiao>;
  findByDomainId (camiaoId: CamiaoId | string): Promise<Camiao>;
  findByMatricula (camiaoMatricula: MatriculaCamiao | string): Promise<Camiao>;
  findAllCamioes (): Promise<Array<Camiao>>;
  deleteByMatricula(matricula: string): Promise<Camiao>;
  findCamioesDisponiveis (): Promise<Array<Camiao>>
}