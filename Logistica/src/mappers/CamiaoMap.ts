import { Mapper } from "../core/infra/Mapper";

import { Document, Model } from 'mongoose';
import { ICamiaoPersistence } from '../dataschema/ICamiaoPersistence';

import ICamiaoDTO from "../dto/ICamiaoDTO";
import { Camiao } from "../domain/camiao";

import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { MatriculaCamiao } from "../domain/camiaoMatricula";
import { TaraCamiao } from "../domain/camiaoTara";
import { CapacidadeCamiao } from "../domain/camiaoCapacidade";
import { CargaBateriaCamiao } from "../domain/camiaoCargaBateria";
import { AutonomiaCamiao } from "../domain/camiaoAutonomia";
import { TempoCarregamentoCamiao } from "../domain/camiaoTempoCarregamento";

export class CamiaoMap extends Mapper<Camiao> {
  
  public static toDTO( camiao: Camiao): ICamiaoDTO {
    return {
      id: camiao.id.toString(),
      matricula: camiao.matricula.value,
      tara: camiao.tara.value,
      capacidade: camiao.capacidade.value,
      cargaBateria: camiao.cargaBateria.value,
      autonomia: camiao.autonomia.value,
      tempoCarregamentoRapido: camiao.tempoCarregamentoRapido.value,
      disponibilidade: camiao.disponibilidade,
    } as ICamiaoDTO;
  }

  public static async toDomain (raw: any): Promise<Camiao> {
    const camiaoMatriculaOrError = MatriculaCamiao.create(raw.matricula);
    const camiaoTaraOrError = TaraCamiao.create(raw.tara);
    const camiaoCapacidadeOrError = CapacidadeCamiao.create(raw.capacidade);
    const camiaoCargaBateriaOrError = CargaBateriaCamiao.create(raw.cargaBateria);
    const camiaoAutonomiaOrError = AutonomiaCamiao.create(raw.autonomia);
    const camiaoTempoCarregamentoOrError = TempoCarregamentoCamiao.create(raw.tempoCarregamentoRapido);

    const camiaoOrError = Camiao.create({
      matricula: camiaoMatriculaOrError.getValue(),
      tara: camiaoTaraOrError.getValue(),
      capacidade: camiaoCapacidadeOrError.getValue(),
      cargaBateria: camiaoCargaBateriaOrError.getValue(),
      autonomia: camiaoAutonomiaOrError.getValue(),
      tempoCarregamentoRapido: camiaoTempoCarregamentoOrError.getValue(),
      disponibilidade: raw.disponibilidade
    }, new UniqueEntityID(raw.domainId))

    camiaoOrError.isFailure ? console.log(camiaoOrError.error) : '';
    
    return camiaoOrError.isSuccess ? camiaoOrError.getValue() : null;
  }

  public static toPersistence (camiao: Camiao): any {
    return {
      domainId: camiao.id.toString(),
      matricula: camiao.matricula.value,
      tara: camiao.tara.value,
      capacidade: camiao.capacidade.value,
      cargaBateria: camiao.cargaBateria.value,
      autonomia: camiao.autonomia.value,
      tempoCarregamentoRapido: camiao.tempoCarregamentoRapido.value,
      disponibilidade: camiao.disponibilidade,
    }
  }
}