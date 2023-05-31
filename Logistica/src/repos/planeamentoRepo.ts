import { Service, Inject } from "typedi";
import IPlaneamentoRepo from "../services/IRepos/IPlaneamentoRepo";
import fetch from 'node-fetch';
import IPlaneamentoDTO from "../dto/IPlaneamentoDTO";
import IViagemDTO from "../dto/IViagemDTO";
import { Viagem } from "../domain/viagem";
import { IViagemPersistence } from "../dataschema/IViagemPersistence";
import { Document, FilterQuery, Model } from "mongoose";
import { ViagemMap } from "../mappers/ViagemMap";
import https from 'https';

@Service()
export default class PlaneamentoRepo implements IPlaneamentoRepo {
  private models: any;
  

  
  constructor(
    @Inject('viagemSchema') private viagemSchema : Model<IViagemPersistence & Document>,
  ) {}    
  
  
    public async getPlaneamento(data: number, heuristica: string): Promise<IPlaneamentoDTO> {
        try {
            var planoJson;
            const response = await fetch(
                'http://127.0.0.1:5002/entregas'+heuristica,
                {method: 'GET',
                 headers: {'Content-Type': 'application/json','Data':data},
                 mode: 'cors',                  
                 cache: 'no-cache',             
                 credentials: 'same-origin',    
                 redirect: 'follow',           
                 referrerPolicy: 'no-referrer', 
                })
                .then(response => response.json())
                .then((json) => {
                   planoJson = json;
                });

                let zeros: Array<string> = [];
                var planeamentodto = planoJson as IPlaneamentoDTO;
                planeamentodto.caminho.forEach(async function (caminho){
                    caminho='00'+caminho;
                    zeros.push(caminho);
                  })
                planeamentodto.caminho=zeros;
                return planeamentodto;
               
                
        } catch(err) {
            console.error('Fetch error:', err, 'request:');
        }
    }

    public async getPlaneamentoFrota(data: number, ng: number, dp: number, pc: number, pm: number, cp: number): Promise<IViagemDTO[]> {
        try {
            var planoJson;
            const response = await fetch(
                'http://127.0.0.1:5002/frota',
                {method: 'GET',
                 headers: {'Content-Type': 'application/json','Data':data,
                'ng': ng,
                'dp': dp,
                'pc': pc,
                'pm': pm,
                'cp': cp},
                 mode: 'cors',                  
                 cache: 'no-cache',             
                 credentials: 'same-origin',    
                 redirect: 'follow',           
                 referrerPolicy: 'no-referrer', 
                })
                .then(response => response.json())
                .then((json) => {
                   planoJson = json;
                });

                var camioes = planoJson['camioes'];
                var caminhos = planoJson['caminhos'];
                var custo = planoJson['custos'];
                var entregas = planoJson['entregas'];

                var viagens: Array<IViagemDTO> =[];

                for (let i = 0; i < camioes.length; i++) {
                    var viagem = {'camiao': camioes[i], 'custo': custo[i], 'armazens': caminhos[i], 'entregas': entregas[i], 'data' : data} as IViagemDTO;
                    viagens.push(viagem);
                }
                  
                return viagens;
               
                
        } catch(err) {
            console.error('Fetch error:', err, 'request:');
        }
    }

    public async save(viagem: Viagem, data: number): Promise<Viagem> {
        const query = { domainId: viagem.id.toString()}; 
      
    
        const viagemDocument = await this.viagemSchema.findOne( query );
    
        try {
          if (viagemDocument === null ) {
            viagem.data=data;
            const rawViagem: any = ViagemMap.toPersistence(viagem);
    
            const viagemCreated = await this.viagemSchema.create(rawViagem);
    
            return ViagemMap.toDomain(viagemCreated);
          } else {
            viagemDocument.camiao = viagem.camiao.value;
            viagemDocument.custo = viagem.custo;
            viagemDocument.entregas = viagem.entregas;
            viagemDocument.armazens = viagem.armazens;
            viagemDocument.data = data;
            await viagemDocument.save();
    
            return viagem;
          }
        } catch (err) {
          throw err;
        }
      }

      public async findAllViagens (): Promise<Array<Viagem>>{
        const query = {};
        const viagensRecords = await this.viagemSchema.find(query as FilterQuery<IViagemPersistence & Document>);
    
        if( viagensRecords != null) {
          let viagens: Array<Viagem> = [];
          viagensRecords.forEach(async function (viagemRecord){
            viagens.push(await ViagemMap.toDomain(viagemRecord))
          })
          return viagens;
        }
        else
          return null;
      }

      public async getEntregas(data:string): Promise<JSON>{
        try{

          const httpsAgent = new https.Agent({
            rejectUnauthorized: false,
          });

          var planoJson;
          
            const response = await fetch(
                'https://localhost:5001/api/entregas/data/'+data,
                {method: 'GET',
                 headers: {'Content-Type': 'application/json','Token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImRiNDkwNzFiLTA2ZDctNDVmNS1hNWY1LTg0MzUzZTFhOWYwNyIsImVtYWlsIjoiZmFmYXJvY2FzQGdtYWlsLmNvbSIsInJvbGUiOiJHQSIsIm5hbWUiOiJQb2xpYW5kbyIsInBob25lTnVtYmVyIjp7InByb3BzIjp7InZhbHVlIjoxMjMzNTQ4NTl9fSwiZXhwIjoxNjgzMzM1MjU2Ljg5OCwiaWF0IjoxNjcyOTcwODU2fQ.8YBJkws6QIX9Kqhx-W5YLwkgbtSrD8L94_5sO0Fm2GQ'},
                 mode: 'cors',                  
                 cache: 'no-cache',             
                 credentials: 'same-origin',    
                 redirect: 'follow',  
                 agent: httpsAgent,        
                 referrerPolicy: 'no-referrer', 
                })
                .then(response => response.json())
                .then((json) => {
                   planoJson = json;
                });

        } catch (err){
          console.error('Fetch error:', err, 'request:');
        }
        

        return planoJson;
      }

      public async findAllViagensPagina (pagina: string): Promise<Array<Viagem>>{
        const pag = Number(pagina);
        const query = {};
        const viagensRecords = await this.viagemSchema.find(query as FilterQuery<IViagemPersistence & Document>).limit(5).skip(5*(pag-1));
    
        if( viagensRecords != null) {
          let viagens: Array<Viagem> = [];
          viagensRecords.forEach(async function (viagemRecord){
            viagens.push(await ViagemMap.toDomain(viagemRecord))
          })
          return viagens;
        }
        else
          return null;
      }

      public async findViagensByCamiaoData (camiao: string, data: number): Promise<Viagem>{
        const query = {camiao: camiao, data: data};
        const viagensRecord = await this.viagemSchema.findOne(query as FilterQuery<IViagemPersistence & Document>);
    
        if( viagensRecord != null) {
          var viagem = await ViagemMap.toDomain(viagensRecord);
          return viagem;
        }
        else
          return null;
      }

      public async deleteViagem(matricula: string, data:number): Promise<Viagem> {

        const query = { camiao: matricula, data: data};
        const viagemDeleted = await this.viagemSchema.findOne(query as FilterQuery<IViagemPersistence & Document>);
        if (viagemDeleted != null) {
            await this.viagemSchema.deleteOne(query as FilterQuery<IViagemPersistence & Document>);
            return ViagemMap.toDomain(viagemDeleted);
        }
        return null;
     }
}
