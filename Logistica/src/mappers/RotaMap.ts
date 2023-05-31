import { Mapper } from "../core/infra/Mapper";

import { Document, Model } from 'mongoose';
import { IRotaPersistence } from '../dataschema/IRotaPersistence';

import IRotaDTO from "../dto/IRotaDTO";
import { Rota } from "../domain/rota";

import { RotaDistancia } from "../domain/rotaDistancia";
import { RotaTempoViagemCheio } from "../domain/rotaTempoViagemCheio";
import { RotaEnergiaGasta } from "../domain/rotaEnergiaGasta";
import { RotaTempoCarregamentoExtra } from "../domain/rotaTempoCarregamentoExtra";

import { UniqueEntityID } from "../core/domain/UniqueEntityID";

export class RotaMap extends Mapper<Rota> {
  
  public static toDTO( rota: Rota): IRotaDTO {
    return {
      idArmazemChegada: rota.idArmazemChegada,
      idArmazemPartida: rota.idArmazemPartida,
      distancia: rota.distancia.value,
      tempoViagemCheio: rota.tempoViagemCheio.value,
      energiaGasta: rota.energiaGasta.value,
      tempoCarregamentoExtra: rota.tempoCarregamentoExtra.value
    } as IRotaDTO;
  }

  public static async toDomain (raw: any): Promise<Rota> {
    const rotaDistanciaOrError = RotaDistancia.create(raw.distancia);
    const rotaTempoViagemCheioOrError = RotaTempoViagemCheio.create(raw.tempoViagemCheio);
    const rotaEnergiaGastaOrError = RotaEnergiaGasta.create(raw.energiaGasta);
    const rotaTempoCarregamentoExtraOrError = RotaTempoCarregamentoExtra.create(raw.tempoCarregamentoExtra);

    const rotaOrError = Rota.create({
      idArmazemChegada: raw.idArmazemChegada,
      idArmazemPartida: raw.idArmazemPartida,
      distancia: rotaDistanciaOrError.getValue(),
      tempoViagemCheio: rotaTempoViagemCheioOrError.getValue(),
      energiaGasta: rotaEnergiaGastaOrError.getValue(),
      tempoCarregamentoExtra: rotaTempoCarregamentoExtraOrError.getValue()
    }, new UniqueEntityID(raw.domainId))

    rotaOrError.isFailure ? console.log(rotaOrError.error) : '';
    
    return rotaOrError.isSuccess ? rotaOrError.getValue() : null;
  }

  public static toPersistence (rota: Rota): any {
    const a = {
      domainId: rota.id.toString(),
      idArmazemChegada: rota.idArmazemChegada,
      idArmazemPartida: rota.idArmazemPartida,
      distancia: rota.distancia.value,
      tempoViagemCheio: rota.tempoViagemCheio.value,
      energiaGasta: rota.energiaGasta.value,
      tempoCarregamentoExtra: rota.tempoCarregamentoExtra.value
    }
    return a;
  }
}