import { Container, Service, Inject } from 'typedi';

import jwt from 'jsonwebtoken';
import config from '../../config';
import argon2 from 'argon2';
import { randomBytes } from 'crypto';

//import MailerService from './mailer.ts.bak';

import IRotaService from '../services/IServices/IRotaService';
import { RotaMap } from "../mappers/RotaMap";
import  IRotaDTO  from '../dto/IRotaDTO';

import IRotaRepo from './IRepos/IRotaRepo';

import { Rota } from '../domain/rota';

import { Result } from "../core/logic/Result";
import { RotaDistancia } from '../domain/rotaDistancia';
import { RotaTempoViagemCheio } from '../domain/rotaTempoViagemCheio';
import { RotaEnergiaGasta } from '../domain/rotaEnergiaGasta';
import { RotaTempoCarregamentoExtra } from '../domain/rotaTempoCarregamentoExtra';

@Service()
export default class RotaService implements IRotaService{
  constructor(
    @Inject(config.repos.rota.name) private rotaRepo : IRotaRepo
  ) {}

  public async createRota(rotaDTO: IRotaDTO): Promise<Result<IRotaDTO>> {
    
    try {
      const distancia = await RotaDistancia.create(rotaDTO.distancia).getValue();
      const tempoViagemCheio = await RotaTempoViagemCheio.create( rotaDTO.tempoViagemCheio ).getValue();
      const energiaGasta = await RotaDistancia.create(rotaDTO.energiaGasta).getValue();
      const tempoCarregamentoExtra = await RotaDistancia.create(rotaDTO.tempoCarregamentoExtra).getValue();

      const rotaOrError = await Rota.create({
        idArmazemPartida: rotaDTO.idArmazemPartida,
        idArmazemChegada: rotaDTO.idArmazemChegada,
       distancia: distancia,
       tempoViagemCheio: tempoViagemCheio,
       energiaGasta: energiaGasta,
       tempoCarregamentoExtra: tempoCarregamentoExtra,
      });

      if (rotaOrError.isFailure) {
        return Result.fail<IRotaDTO>(rotaOrError.errorValue());
      }

      const rotaResult = rotaOrError.getValue();

      await this.rotaRepo.save(rotaResult);

      const rotaDTOResult = RotaMap.toDTO( rotaResult ) as IRotaDTO;
      return Result.ok<IRotaDTO>( rotaDTOResult )
    } catch (e) {
      throw e;
    }
 
  }

  public async updateRota(rotaDTO: IRotaDTO): Promise<Result<IRotaDTO>> {
    
    try {
      const chegada = rotaDTO.idArmazemChegada;
      const partida = rotaDTO.idArmazemPartida;
      let rota = await this.rotaRepo.findByIdArmazens(partida,chegada);

      if (rota === null) {
        return Result.fail<IRotaDTO>("Rota not found");
      }
      else {
        
        const distancia = await RotaDistancia.create(rotaDTO.distancia).getValue();
        const tempoViagemCheio = await RotaTempoViagemCheio.create( rotaDTO.tempoViagemCheio ).getValue();
        const energiaGasta = await RotaDistancia.create(rotaDTO.energiaGasta).getValue();
        const tempoCarregamentoExtra = await RotaDistancia.create(rotaDTO.tempoCarregamentoExtra).getValue();
        rota.idArmazemChegada = rotaDTO.idArmazemChegada;
        rota.idArmazemPartida = rotaDTO.idArmazemPartida;
        rota.distancia = distancia;
        rota.tempoViagemCheio = tempoViagemCheio;
        rota.energiaGasta = energiaGasta;
        rota.tempoCarregamentoExtra = tempoCarregamentoExtra;
        
        await this.rotaRepo.save(rota);

        const rotaDTOResult = RotaMap.toDTO( rota ) as IRotaDTO;
        return Result.ok<IRotaDTO>( rotaDTOResult )
        }
    } catch (e) {
      throw e;
    }
  }

  public async getRotaByFilter(rotaDTO: IRotaDTO): Promise<Result<IRotaDTO[]>> {
    try {
      const chegada = rotaDTO.idArmazemChegada;
      const partida = rotaDTO.idArmazemPartida;
      let rotas : Array<Rota> = [];
      if(chegada == null && partida == null){
        return Result.fail<IRotaDTO[]>("rota não encontrada");
      }else if(chegada !=null && partida ==null){
        rotas = await this.rotaRepo.findByIdArmazemChegada(chegada);
      }else if(chegada ==null && partida !=null){
        rotas = await this.rotaRepo.findByIdArmazemPartida(partida);
      }else if(chegada !=null && partida !=null){
        let rota = await this.rotaRepo.findByIdArmazens(partida,chegada);
        if(rota !=null){
          rotas.push(rota);
        }
      }

      if (rotas.length == 0) {
        return Result.fail<IRotaDTO[]>("rota não encontrada");
      }
      else {
        let rotasResult: Array<IRotaDTO> = [];
        rotas.forEach(function (rota){
          rotasResult.push(RotaMap.toDTO(rota) as IRotaDTO)
        });
        return Result.ok<IRotaDTO[]>( rotasResult )
        }
    } catch (e) {
      throw e;
    }
  }

  public async getRotaPartida(id: string): Promise<Result<IRotaDTO[]>> {
    try{

      const rotas = await this.rotaRepo.findByIdArmazemPartida(id);

      if (rotas === null) {
        return Result.fail<IRotaDTO[]>("rota não encontrado");
      }

        let rotasResult: Array<IRotaDTO> = [];
        rotas.forEach(function (rota){
          rotasResult.push(RotaMap.toDTO(rota) as IRotaDTO)
        });
        return Result.ok<IRotaDTO[]>( rotasResult )
        
    } catch (e) {
      throw e;
    }
  }

  public async getRotaChegada(id: string): Promise<Result<IRotaDTO[]>> {
   try{
      
      const rotas = await this.rotaRepo.findByIdArmazemChegada(id);

      if (rotas === null) {
        return Result.fail<IRotaDTO[]>("rota não encontrado");
      }

        let rotasResult: Array<IRotaDTO> = [];
        rotas.forEach(function (rota){
          rotasResult.push(RotaMap.toDTO(rota) as IRotaDTO)
        });
        return Result.ok<IRotaDTO[]>( rotasResult )
        
    } catch (e) {
      throw e;
    }
  }

  public async getRotaPagina(pagina: string): Promise<Result<IRotaDTO[]>> {
    try{
       
       const rotas = await this.rotaRepo.findByPagina(pagina);
 
       if (rotas === null) {
         return Result.fail<IRotaDTO[]>("rota não encontrado");
       }
 
         let rotasResult: Array<IRotaDTO> = [];
         rotas.forEach(function (rota){
           rotasResult.push(RotaMap.toDTO(rota) as IRotaDTO)
         });
         return Result.ok<IRotaDTO[]>( rotasResult )
         
     } catch (e) {
       throw e;
     }
   }

   public async getRotaPaginaPartida(pagina: string,idPartida: string): Promise<Result<IRotaDTO[]>> {
    try{
       
       const rotas = await this.rotaRepo.findByPaginaPartida(pagina,idPartida);
 
       if (rotas === null) {
         return Result.fail<IRotaDTO[]>("rota não encontrado");
       }
 
         let rotasResult: Array<IRotaDTO> = [];
         rotas.forEach(function (rota){
           rotasResult.push(RotaMap.toDTO(rota) as IRotaDTO)
         });
         return Result.ok<IRotaDTO[]>( rotasResult )
         
     } catch (e) {
       throw e;
     }
   }

   public async getRotaPaginaChegada(pagina: string,idChegada: string): Promise<Result<IRotaDTO[]>> {
    try{
       
       const rotas = await this.rotaRepo.findByPaginaChegada(pagina,idChegada);
 
       if (rotas === null) {
         return Result.fail<IRotaDTO[]>("rota não encontrado");
       }
 
         let rotasResult: Array<IRotaDTO> = [];
         rotas.forEach(function (rota){
           rotasResult.push(RotaMap.toDTO(rota) as IRotaDTO)
         });
         return Result.ok<IRotaDTO[]>( rotasResult )
         
     } catch (e) {
       throw e;
     }
   }

  public async getRota( idPartida: string,idChegada: string): Promise<Result<IRotaDTO>> {
    try {
      const rota = await this.rotaRepo.findByIdArmazens(idPartida,idChegada);

      if (rota === null) {
        return Result.fail<IRotaDTO>("Rota não encontrada");
      }
      else {
        const rotaDTOResult = RotaMap.toDTO( rota ) as IRotaDTO;
        return Result.ok<IRotaDTO>( rotaDTOResult )
        }
    } catch (e) {
      throw e;
    }
  }

  public async getRotas (): Promise<Result<IRotaDTO[]>> {
    try {
      const rotas = await this.rotaRepo.findAllRotas();

      if (rotas === null) {
        return Result.fail<IRotaDTO[]>("rota não encontrado");
      }
      else {
        let rotasResult: Array<IRotaDTO> = [];
        rotas.forEach(function (rota){
          rotasResult.push(RotaMap.toDTO(rota) as IRotaDTO)
        });
        return Result.ok<IRotaDTO[]>( rotasResult )
        }
    } catch (e) {
      throw e;
    }
  }

  public async patchRota(rotaDTO: IRotaDTO): Promise<Result<IRotaDTO>>
  {
    try{
      const chegada = rotaDTO.idArmazemChegada;
      const partida = rotaDTO.idArmazemPartida;
      let rota = await this.rotaRepo.findByIdArmazens(partida,chegada);

      if (rota === null) {
        return Result.fail<IRotaDTO>("Rota não encontrada");
      }
      else {
        if(rotaDTO.idArmazemChegada != null){
          rota.idArmazemChegada = rotaDTO.idArmazemChegada;
        }
        if(rotaDTO.idArmazemPartida != null){
          rota.idArmazemPartida= rotaDTO.idArmazemPartida;
        }
        if(rotaDTO.distancia != null){
          const distancia = await RotaDistancia.create(rotaDTO.distancia).getValue();
          rota.distancia = distancia;
        }
        if(rotaDTO.energiaGasta != null){
          const energiaGasta = await RotaEnergiaGasta.create(rotaDTO.energiaGasta).getValue();
          rota.energiaGasta = energiaGasta;
        }
        if(rotaDTO.tempoCarregamentoExtra != null){
          const tempoCarregamentoExtra = await RotaTempoCarregamentoExtra.create(rotaDTO.tempoCarregamentoExtra).getValue();
          rota.tempoCarregamentoExtra = tempoCarregamentoExtra;
        }
        if(rotaDTO.tempoViagemCheio != null){
          const tempoViagemCheio = await RotaTempoViagemCheio.create(rotaDTO.tempoViagemCheio).getValue();
          rota.tempoViagemCheio = tempoViagemCheio;
        }

        await this.rotaRepo.save(rota);


        const rotaDTOResult = RotaMap.toDTO( rota ) as IRotaDTO;
        return Result.ok<IRotaDTO>( rotaDTOResult )
        }
      } catch (e) {
        throw e;
      }
      }

      public async deleteRota( idPartida: string,idChegada: string): Promise<Result<IRotaDTO>> {
        try {
          const rota = await this.rotaRepo.deleteByArmazensId(idPartida,idChegada);
    
          if (rota === null) {
            return Result.fail<IRotaDTO>("Rota não encontrada");
          }
          else {

            const rotaDTOResult = RotaMap.toDTO( rota ) as IRotaDTO;
            return Result.ok<IRotaDTO>( rotaDTOResult )
            }
        } catch (e) {
          throw e;
        }
      }


}
