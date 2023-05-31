import { Mapper } from "../core/infra/Mapper";

import { Document, Model } from 'mongoose';


import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Viagem } from "../domain/viagem";
import IViagemDTO from "../dto/IViagemDTO";
import { MatriculaCamiao } from "../domain/camiaoMatricula";


export class ViagemMap extends Mapper<Viagem> {
  
  public static toDTO( viagem: Viagem): IViagemDTO {
    return {
      camiao: viagem.camiao.value,
      custo: viagem.custo,
      entregas: viagem.entregas,
      armazens: viagem.armazens,
      data: viagem.data,
    } as IViagemDTO;
  }

  public static async toDomain (raw: any): Promise<Viagem> {
    const camiaoMatriculaOrError = MatriculaCamiao.create(raw.camiao);
    const custoOrError = raw.custo;
    const entregasOrError = raw.entregas;
    const armazensOrError = raw.armazens;
    const dataOrError = raw.data;

    const viagemOrError = Viagem.create({
      camiao: camiaoMatriculaOrError.getValue(),
      custo: custoOrError,
      entregas: entregasOrError,
      armazens: armazensOrError,
      data: dataOrError
    }, new UniqueEntityID(raw.domainId))

    viagemOrError.isFailure ? console.log(viagemOrError.error) : '';
    
    return viagemOrError.isSuccess ? viagemOrError.getValue() : null;
  }

  public static toPersistence (viagem: Viagem): any {
    return {
      domainId: viagem.id.toString(),
      camiao: viagem.camiao.value,
      custo: viagem.custo,
      entregas: viagem.entregas,
      armazens: viagem.armazens,
      data: viagem.data,
    }
  }
}