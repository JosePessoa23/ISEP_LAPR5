import { Result } from "../../core/logic/Result";
import ICamiaoDTO from "../../dto/ICamiaoDTO";

export default interface ICamiaoService  {
  createCamiao(camiaoDTO: ICamiaoDTO): Promise<Result<ICamiaoDTO>>;
  updateCamiao(camiaoDTO: ICamiaoDTO): Promise<Result<ICamiaoDTO>>;
  getCamiao (matricula: string): Promise<Result<ICamiaoDTO>>;
  getCamioes (): Promise<Result<ICamiaoDTO[]>>;
  updateParcialCamiao(camiaoDTO: ICamiaoDTO): Promise<Result<ICamiaoDTO>>;
  deleteByMatricula(matricula: string): Promise<Result<ICamiaoDTO>>;
  getCamioesDisponiveis (): Promise<Result<ICamiaoDTO[]>>
}
