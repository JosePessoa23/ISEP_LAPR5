import { Service, Inject } from 'typedi';

import ICamiaoRepo from "../services/IRepos/ICamiaoRepo";
import { Camiao } from "../domain/camiao";
import { CamiaoId } from "../domain/camiaoId";
import { CamiaoMap } from "../mappers/CamiaoMap";

import { Document, FilterQuery, Model } from 'mongoose';
import { ICamiaoPersistence } from '../dataschema/ICamiaoPersistence';
import { MatriculaCamiao } from '../domain/camiaoMatricula';

@Service()
export default class CamiaoRepo implements ICamiaoRepo {
  private models: any;

  constructor(
    @Inject('camiaoSchema') private camiaoSchema : Model<ICamiaoPersistence & Document>,
  ) {}

  private createBaseQuery (): any {
    return {
      where: {},
    }
  }

  public async exists(camiao: Camiao): Promise<boolean> {
    
    const idX = camiao.id instanceof CamiaoId ? (<CamiaoId>camiao.id).toValue() : camiao.id;

    const query = { domainId: idX}; 
    const camiaoDocument = await this.camiaoSchema.findOne( query as FilterQuery<ICamiaoPersistence & Document>);

    return !!camiaoDocument === true;
  }

  public async save (camiao: Camiao): Promise<Camiao> {
    const query = { domainId: camiao.id.toString()}; 

    const camiaoDocument = await this.camiaoSchema.findOne( query );

    try {
      if (camiaoDocument === null ) {
        const rawCamiao: any = CamiaoMap.toPersistence(camiao);

        const camiaoCreated = await this.camiaoSchema.create(rawCamiao);

        return CamiaoMap.toDomain(camiaoCreated);
      } else {
        camiaoDocument.tara = camiao.tara.value;
        camiaoDocument.capacidade = camiao.capacidade.value;
        camiaoDocument.cargaBateria = camiao.cargaBateria.value;
        camiaoDocument.autonomia = camiao.autonomia.value;
        camiaoDocument.tempoCarregamentoRapido = camiao.tempoCarregamentoRapido.value;
        camiaoDocument.disponibilidade = camiao.disponibilidade;
        await camiaoDocument.save();

        return camiao;
      }
    } catch (err) {
      throw err;
    }
  }

  public async findByDomainId (camiaoId: CamiaoId | string): Promise<Camiao> {
    const query = { domainId: camiaoId};
    const camiaoRecord = await this.camiaoSchema.findOne( query as FilterQuery<ICamiaoPersistence & Document> );

    if( camiaoRecord != null) {
      return CamiaoMap.toDomain(camiaoRecord);
    }
    else
      return null;
  }

  public async findByMatricula (camiaoMatricula: MatriculaCamiao | string): Promise<Camiao> {
    const query = { matricula: camiaoMatricula};
    const camiaoRecord = await this.camiaoSchema.findOne( query as FilterQuery<ICamiaoPersistence & Document> );

    if( camiaoRecord != null) {
      return CamiaoMap.toDomain(camiaoRecord);
    }
    else
      return null;
  }

  public async findAllCamioes (): Promise<Array<Camiao>>{
    const query = {};
    const camioesRecords = await this.camiaoSchema.find(query as FilterQuery<ICamiaoPersistence & Document>);

    if( camioesRecords != null) {
      let camioes: Array<Camiao> = [];
      camioesRecords.forEach(async function (camiaoRecord){
        camioes.push(await CamiaoMap.toDomain(camiaoRecord))
      })
      return camioes
    }
    else
      return null;
  }

  public async findCamioesDisponiveis (): Promise<Array<Camiao>>{
    const query = { disponibilidade: true };
    const camioesRecords = await this.camiaoSchema.find(query as FilterQuery<ICamiaoPersistence & Document>);

    if( camioesRecords != null) {
      let camioes: Array<Camiao> = [];
      camioesRecords.forEach(async function (camiaoRecord){
        camioes.push(await CamiaoMap.toDomain(camiaoRecord))
      })
      return camioes
    }
    else
      return null;
  }

  public async deleteByMatricula(matricula: string): Promise<Camiao> {

    const query = { matricula: matricula };
    const camiaoDeleted = await this.camiaoSchema.findOne(query as FilterQuery<ICamiaoPersistence & Document>);
    if (camiaoDeleted != null) {
        await this.camiaoSchema.deleteOne(query as FilterQuery<ICamiaoPersistence & Document>);
        return CamiaoMap.toDomain(camiaoDeleted);
    }
    return null;
 }
}