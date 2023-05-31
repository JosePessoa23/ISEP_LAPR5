import { ValueObject } from "../core/domain/ValueObject";
import { Result } from "../core/logic/Result";
import { Guard } from "../core/logic/Guard";

interface CargaBateriaCamiaoProps {
  value: number;
}

export class CargaBateriaCamiao extends ValueObject<CargaBateriaCamiaoProps> {
  get value (): number {
    return this.props.value;
  }

  
  private constructor (props: CargaBateriaCamiaoProps) {
    super(props);
  }

  public static create (cargaBateria: number): Result<CargaBateriaCamiao> {
    const guardResult = Guard.againstNullOrUndefined(cargaBateria, 'carga bateria');
    if (!guardResult.succeeded || cargaBateria<=0) {
      return Result.fail<CargaBateriaCamiao>(guardResult.message);
    } else {
      return Result.ok<CargaBateriaCamiao>(new CargaBateriaCamiao({ value: cargaBateria}))
    }
  }
}