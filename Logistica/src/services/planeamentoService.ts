import { Inject, Service } from "typedi";
import { Result } from "../core/logic/Result";
import IPlaneamentoDTO from "../dto/IPlaneamentoDTO";
import IPlaneamentoService from "./IServices/IPlaneamentoService";
import fetch from 'node-fetch';
import config from "../../config";
import IPlaneamentoRepo from "./IRepos/IPlaneamentoRepo";
import ICamiaoRepo from "./IRepos/ICamiaoRepo";
import IViagemDTO from "../dto/IViagemDTO";
import { Viagem } from "../domain/viagem";
import { ViagemMap } from "../mappers/ViagemMap";
import { Camiao } from "../domain/camiao";



@Service()
export default class PlaneamentoService implements IPlaneamentoService {

    

  constructor(
    @Inject(config.repos.planeamento.name) private planeamentoRepo : IPlaneamentoRepo,
    @Inject(config.repos.camiao.name) private camiaoRepo : ICamiaoRepo
  ) {}

  public async getPlaneamento(data: number, heuristica: string): Promise<Result<IPlaneamentoDTO>> {
    return this.planeamentoRepo.getPlaneamento(data, heuristica);
  }

  public async getPlaneamentoFrota(data: number,  ng: number, dp: number, pc: number, pm: number, cp: number): Promise<IViagemDTO[]> {
    var viagens: Array<IViagemDTO>;
    var repo = this.planeamentoRepo;
    viagens = await this.planeamentoRepo.getPlaneamentoFrota(data,  ng, dp, pc, pm, cp);
    viagens.forEach(function (viagemDto){
      var viagemDomain = Viagem.createWithDTO(viagemDto).getValue();
      repo.save(viagemDomain, data);
    })
    return viagens;
  }

  public async getViagens (): Promise<Result<IViagemDTO[]>> {
    try {
      const viagens = await this.planeamentoRepo.findAllViagens();

      if (viagens === null) {
        return Result.fail<IViagemDTO[]>("Viagem não encontrado");
      }
      else {
        let viagensResult: Array<IViagemDTO> = [];
        viagens.forEach(function (viagem: Viagem){
          viagensResult.push(ViagemMap.toDTO(viagem))
        });
        return Result.ok<IViagemDTO[]>( viagensResult )
        }
    } catch (e) {
      throw e;
    }
  }

  public async planeamentoAlternativo(data:string): Promise<JSON[]>{
    try {
      var camioes = await this.camiaoRepo.findAllCamioes();

      var entregas = await this.planeamentoRepo.getEntregas(data);

      var massaTotal = await this.calculaMassaTotal(entregas);

      var numEntregas = Object.keys(entregas).length;

      var massaAtual: number =0;

      var camiaoAtual: number =0;

      var entregasCamiao: number[]=[];

      var plano:JSON[]=[];
     
      var massaT = 0;
      
      for(var i=0;i<numEntregas;i++){
        massaT = massaAtual +entregas[i]['peso']
        if(massaT>camioes[camiaoAtual].capacidade.value){
          var str : string = '{"camiao":"'+ camioes[camiaoAtual].matricula.value +'", "entregas":"'+entregasCamiao+'"}';
          var j : JSON = JSON.parse(str);
          plano.push(j);
          massaAtual=0;
          camiaoAtual++;
          entregasCamiao = [];
        }
          massaAtual+=entregas[i]['peso'];
          entregasCamiao.push(entregas[i]['idLoja']);
        }
      

      var str : string = '{"camiao":"'+ camioes[camiaoAtual].matricula.value +'", "entregas":"'+entregasCamiao+'"}';
          var j : JSON = JSON.parse(str)
          plano.push(j);
      

    } catch (error) {
      throw error;
    }

    return plano;
  }

  public async calculaMassaTotal(entregas:JSON): Promise<Number>{
    var numEntregas = Object.keys(entregas).length;
    var massaTotal: number=0;
    for(var i=0;i<numEntregas;i++){
      massaTotal+=entregas[i]['peso'];
    }
    return massaTotal;
  }

  public async getViagensPagina (pagina: string): Promise<Result<IViagemDTO[]>> {
    try {
      const viagens = await this.planeamentoRepo.findAllViagensPagina(pagina);

      if (viagens === null) {
        return Result.fail<IViagemDTO[]>("Viagem não encontrado");
      }
      else {
        let viagensResult: Array<IViagemDTO> = [];
        viagens.forEach(function (viagem: Viagem){
          viagensResult.push(ViagemMap.toDTO(viagem))
        });
        return Result.ok<IViagemDTO[]>( viagensResult )
        }
    } catch (e) {
      throw e;
    }
  }

  public async getViagemByCamiaoData (camiao: string, data:number): Promise<Result<IViagemDTO>> {
    try {
      const viagem = await this.planeamentoRepo.findViagensByCamiaoData(camiao,data);

      if (viagem === null) {
        return Result.fail<IViagemDTO>("Viagem não encontrado");
      }
      else {
        var viagensResult = ViagemMap.toDTO(viagem);
        return Result.ok<IViagemDTO>( viagensResult )
        }
    } catch (e) {
      throw e;
    }
  }

  public async delete(matricula: string, data:number): Promise<Result<IViagemDTO>> {
    try {
      const viagem = await this.planeamentoRepo.deleteViagem(matricula,data);

      if (viagem === null) {
        return Result.fail<IViagemDTO>("Viagem não encontrado");
      }
      else {
        const viagemDTOResult = ViagemMap.toDTO( viagem ) as IViagemDTO;
        return Result.ok<IViagemDTO>( viagemDTOResult )
        }
    } catch (e) {
      throw e;
    }
  }
  
}
