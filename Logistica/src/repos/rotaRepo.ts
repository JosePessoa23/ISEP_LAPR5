import { Service, Inject } from 'typedi';

import IRotaRepo from "../services/IRepos/IRotaRepo";
import { Rota } from "../domain/rota";
import { RotaId } from "../domain/rotaId";
import { RotaMap } from "../mappers/RotaMap";

import { Document, FilterQuery, Model } from 'mongoose';
import { IRotaPersistence } from '../dataschema/IRotaPersistence';

@Service()
export default class RotaRepo implements IRotaRepo {
  private models: any;

  constructor(
    @Inject('rotaSchema') private rotaSchema : Model<IRotaPersistence & Document>,
  ) {}

  private createBaseQuery (): any {
    return {
      where: {},
    }
  }

  public async exists(rota: Rota): Promise<boolean> {
    
    const idX = rota.id instanceof RotaId ? (<RotaId>rota.id).toValue() : rota.id;

    const query = { domainId: idX}; 
    const rotaDocument = await this.rotaSchema.findOne( query as FilterQuery<IRotaPersistence & Document>);

    return !!rotaDocument === true;
  }

  public async save (rota: Rota): Promise<Rota> {
    const query = { domainId: rota.id.toString()}; 

    const rotaDocument = await this.rotaSchema.findOne( query );

    try {
      if (rotaDocument === null ) {
        const rawRota: any = RotaMap.toPersistence(rota);

        const rotaCreated = await this.rotaSchema.create(rawRota);

        return RotaMap.toDomain(rotaCreated);
      } else {
        rotaDocument.idArmazemChegada = rota.idArmazemChegada;
        rotaDocument.idArmazemPartida = rota.idArmazemPartida;
        rotaDocument.distancia = rota.distancia.value;
        rotaDocument.tempoViagemCheio = rota.tempoViagemCheio.value;
        rotaDocument.energiaGasta = rota.energiaGasta.value;
        rotaDocument.tempoCarregamentoExtra = rota.tempoCarregamentoExtra.value;
        await rotaDocument.save();

        return rota;
      }
    } catch (err) {
      throw err;
    }
  }

  public async findByDomainId (rotaId: RotaId | string): Promise<Rota> {
    const query = { domainId: rotaId};
    const rotaRecord = await this.rotaSchema.findOne( query as FilterQuery<IRotaPersistence & Document> );

    if( rotaRecord != null) {
      return RotaMap.toDomain(rotaRecord);
    }
    else
      return null;
  }

  public async findAllRotas (): Promise<Array<Rota>>{
    const query = {};
    const rotasRecords = await this.rotaSchema.find(query as FilterQuery<IRotaPersistence & Document>);

    if( rotasRecords != null) {
      let rotas: Array<Rota> = [];
      rotasRecords.forEach(async function (RotaRecord){
        rotas.push(await RotaMap.toDomain(RotaRecord))
      })
      return rotas
    }
    else
      return null;
  }

  public async findByIdArmazemPartida (idArmazemPartida: string): Promise<Array<Rota>>{
    const query = {idArmazemPartida : idArmazemPartida};
    const rotasRecords = await this.rotaSchema.find(query as FilterQuery<IRotaPersistence & Document>);

    if( rotasRecords != null) {
      let rotas: Array<Rota> = [];
      rotasRecords.forEach(async function (RotaRecord){
        rotas.push(await RotaMap.toDomain(RotaRecord))
      })
      return rotas
    }
    else
      return null;
  }

  public async findByIdArmazemChegada (idArmazemChegada: string): Promise<Array<Rota>>{
    const query = {idArmazemChegada : idArmazemChegada};
    const rotasRecords = await this.rotaSchema.find(query as FilterQuery<IRotaPersistence & Document>);

    if( rotasRecords != null) {
      let rotas: Array<Rota> = [];
      rotasRecords.forEach(async function (RotaRecord){
        rotas.push(await RotaMap.toDomain(RotaRecord))
      })
      return rotas
    }
    else
      return null;
  }

  public async findByPagina (pagina: string): Promise<Array<Rota>>{
    const pag = Number(pagina);
    const query = {};
    const rotasRecords = await this.rotaSchema.find(query as FilterQuery<IRotaPersistence & Document>).limit(5).skip(5*(pag-1));

    if( rotasRecords != null) {
      let rotas: Array<Rota> = [];
      rotasRecords.forEach(async function (RotaRecord){
        rotas.push(await RotaMap.toDomain(RotaRecord))
      })
      return rotas
    }
    else
      return null;
  }

  public async findByPaginaPartida (pagina: string,idPartida: string): Promise<Array<Rota>>{
    const pag = Number(pagina);
    const query = {idArmazemPartida: idPartida};
    const rotasRecords = await this.rotaSchema.find(query as FilterQuery<IRotaPersistence & Document>).limit(5).skip(5*(pag-1));

    if( rotasRecords != null) {
      let rotas: Array<Rota> = [];
      rotasRecords.forEach(async function (RotaRecord){
        rotas.push(await RotaMap.toDomain(RotaRecord))
      })
      return rotas
    }
    else
      return null;
  }

  public async findByPaginaChegada (pagina: string,idChegada: string): Promise<Array<Rota>>{
    const pag = Number(pagina);
    const query = {idArmazemChegada: idChegada};
    const rotasRecords = await this.rotaSchema.find(query as FilterQuery<IRotaPersistence & Document>).limit(5).skip(5*(pag-1));

    if( rotasRecords != null) {
      let rotas: Array<Rota> = [];
      rotasRecords.forEach(async function (RotaRecord){
        rotas.push(await RotaMap.toDomain(RotaRecord))
      })
      return rotas
    }
    else
      return null;
  }

  public async findByIdArmazens (idArmazemPartida: string,idArmazemChegada: string): Promise<Rota>{
    const query = {idArmazemPartida : idArmazemPartida,idArmazemChegada: idArmazemChegada};
    const rotaRecord = await this.rotaSchema.findOne( query as FilterQuery<IRotaPersistence & Document> );

    if( rotaRecord != null) {
      return RotaMap.toDomain(rotaRecord);
    }
    else
      return null;
  }

  public async deleteByArmazensId(idArmazemPartida: string,idArmazemChegada: string): Promise<Rota> {

    const query = { idArmazemPartida : idArmazemPartida,idArmazemChegada: idArmazemChegada};
    const rotaDeleted = await this.rotaSchema.findOne(query as FilterQuery<IRotaPersistence & Document>);
    if (rotaDeleted != null) {
        await this.rotaSchema.deleteOne(query as FilterQuery<IRotaPersistence & Document>);
        return RotaMap.toDomain(rotaDeleted);
    }
    return null;
}
}