import { Service, Inject } from 'typedi';
import config from "../../config";
import ICamiaoDTO from '../dto/ICamiaoDTO';
import { Camiao } from "../domain/camiao";
import ICamiaoRepo from '../services/IRepos/ICamiaoRepo';
import ICamiaoService from './IServices/ICamiaoService';
import { Result } from "../core/logic/Result";
import { CamiaoMap } from "../mappers/CamiaoMap";
import { MatriculaCamiao } from '../domain/camiaoMatricula';
import { TaraCamiao } from '../domain/camiaoTara';
import { CapacidadeCamiao } from '../domain/camiaoCapacidade';
import { CargaBateriaCamiao } from '../domain/camiaoCargaBateria';
import { AutonomiaCamiao } from '../domain/camiaoAutonomia';
import { TempoCarregamentoCamiao } from '../domain/camiaoTempoCarregamento';

@Service()
export default class CamiaoService implements ICamiaoService {
  constructor(
      @Inject(config.repos.camiao.name) private camiaoRepo : ICamiaoRepo
  ) {}

public async createCamiao(camiaoDTO: ICamiaoDTO): Promise<Result<ICamiaoDTO>> {
    try {

      const matricula = MatriculaCamiao.create(camiaoDTO.matricula).getValue();
      const tara = TaraCamiao.create(camiaoDTO.tara).getValue();
      const capacidade = CapacidadeCamiao.create(camiaoDTO.capacidade).getValue();
      const cargaBateria = CargaBateriaCamiao.create(camiaoDTO.cargaBateria).getValue();
      const autonomia = AutonomiaCamiao.create(camiaoDTO.autonomia).getValue();
      const tempoCarregamento = TempoCarregamentoCamiao.create(camiaoDTO.tempoCarregamentoRapido).getValue();
      const camiaoOrError = Camiao.create( {matricula: matricula, tara: tara, capacidade: capacidade, cargaBateria: cargaBateria, autonomia: autonomia, tempoCarregamentoRapido: tempoCarregamento, disponibilidade: true} );

      if (camiaoOrError.isFailure) {
        return Result.fail<ICamiaoDTO>(camiaoOrError.errorValue());
      }

      const camiaoResult = camiaoOrError.getValue();

      await this.camiaoRepo.save(camiaoResult);

      const camiaoDTOResult = CamiaoMap.toDTO( camiaoResult ) as ICamiaoDTO;
      return Result.ok<ICamiaoDTO>( camiaoDTOResult )
    } catch (e) {
      throw e;
    }
  }


  public async updateCamiao(camiaoDTO: ICamiaoDTO): Promise<Result<ICamiaoDTO>> {
    try {
      const camiao = await this.camiaoRepo.findByMatricula(camiaoDTO.matricula);

      if (camiao === null) {
        return Result.fail<ICamiaoDTO>("Camiao não encontrado");
      }
      else {

      const tara = TaraCamiao.create(camiaoDTO.tara).getValue();
      const capacidade = CapacidadeCamiao.create(camiaoDTO.capacidade).getValue();
      const cargaBateria = CargaBateriaCamiao.create(camiaoDTO.cargaBateria).getValue();
      const autonomia = AutonomiaCamiao.create(camiaoDTO.autonomia).getValue();
      const tempoCarregamento = TempoCarregamentoCamiao.create(camiaoDTO.tempoCarregamentoRapido).getValue();
      const disponibilidade = camiaoDTO.disponibilidade;

      
      camiao.tara = tara;
      camiao.capacidade = capacidade;
      camiao.cargaBateria = cargaBateria;
      camiao.autonomia = autonomia;
      camiao.tempoCarregamentoRapido = tempoCarregamento;
      camiao.disponibilidade = disponibilidade;

        await this.camiaoRepo.save(camiao);


        const camiaoDTOResult = CamiaoMap.toDTO( camiao ) as ICamiaoDTO;
        return Result.ok<ICamiaoDTO>( camiaoDTOResult )
        }
    } catch (e) {
      throw e;
    }
  }

  public async updateParcialCamiao(camiaoDTO: ICamiaoDTO): Promise<Result<ICamiaoDTO>>
  {
    try{
    const camiao = await this.camiaoRepo.findByMatricula(camiaoDTO.matricula);

      if (camiao === null) {
        return Result.fail<ICamiaoDTO>("Camiao não encontrado");
      }
      else {
        if(camiaoDTO.tara != null){
          const tara = TaraCamiao.create(camiaoDTO.tara).getValue();
          camiao.tara = tara;
        }
        if(camiaoDTO.capacidade != null){
          const capacidade = CapacidadeCamiao.create(camiaoDTO.capacidade).getValue();
          camiao.capacidade = capacidade;
        }
        if(camiaoDTO.cargaBateria != null){
          const cargaBateria = CargaBateriaCamiao.create(camiaoDTO.cargaBateria).getValue();
          camiao.cargaBateria = cargaBateria;
        }
        if(camiaoDTO.autonomia != null){
          const autonomia = AutonomiaCamiao.create(camiaoDTO.autonomia).getValue();
          camiao.autonomia = autonomia;
        }
        if(camiaoDTO.tempoCarregamentoRapido != null){
          const tempoCarregamento = TempoCarregamentoCamiao.create(camiaoDTO.tempoCarregamentoRapido).getValue();
          camiao.tempoCarregamentoRapido = tempoCarregamento;
        }
        if(camiaoDTO.disponibilidade != null){
          camiao.disponibilidade = camiaoDTO.disponibilidade;
        }

        await this.camiaoRepo.save(camiao);


        const camiaoDTOResult = CamiaoMap.toDTO( camiao ) as ICamiaoDTO;
        return Result.ok<ICamiaoDTO>( camiaoDTOResult )
        }
      } catch (e) {
        throw e;
      }
      }

  public async getCamiao( matricula: string): Promise<Result<ICamiaoDTO>> {
    try {
      const camiao = await this.camiaoRepo.findByMatricula(matricula);

      if (camiao === null) {
        return Result.fail<ICamiaoDTO>("Camiao não encontrado");
      }
      else {
        const camiaoDTOResult = CamiaoMap.toDTO( camiao ) as ICamiaoDTO;
        return Result.ok<ICamiaoDTO>( camiaoDTOResult )
        }
    } catch (e) {
      throw e;
    }
  }

  public async getCamioes (): Promise<Result<ICamiaoDTO[]>> {
    try {
      const camioes = await this.camiaoRepo.findAllCamioes();

      if (camioes === null) {
        return Result.fail<ICamiaoDTO[]>("Camiao não encontrado");
      }
      else {
        let camioesResult: Array<ICamiaoDTO> = [];
        camioes.forEach(function (camiao){
          camioesResult.push(CamiaoMap.toDTO(camiao) as ICamiaoDTO)
        });
        return Result.ok<ICamiaoDTO[]>( camioesResult )
        }
    } catch (e) {
      throw e;
    }
  }

  public async getCamioesDisponiveis (): Promise<Result<ICamiaoDTO[]>> {
    try {
      const camioes = await this.camiaoRepo.findCamioesDisponiveis();

      if (camioes === null) {
        return Result.fail<ICamiaoDTO[]>("Camiao não encontrado");
      }
      else {
        let camioesResult: Array<ICamiaoDTO> = [];
        camioes.forEach(function (camiao){
          camioesResult.push(CamiaoMap.toDTO(camiao) as ICamiaoDTO)
        });
        return Result.ok<ICamiaoDTO[]>( camioesResult )
        }
    } catch (e) {
      throw e;
    }
  }

  public async deleteByMatricula(matricula: string): Promise<Result<ICamiaoDTO>> {
    try {
      const camiao = await this.camiaoRepo.deleteByMatricula(matricula);

      if (camiao === null) {
        return Result.fail<ICamiaoDTO>("Camiao não encontrado");
      }
      else {
        const camiaoDTOResult = CamiaoMap.toDTO( camiao ) as ICamiaoDTO;
        return Result.ok<ICamiaoDTO>( camiaoDTOResult )
        }
    } catch (e) {
      throw e;
    }
  }
}