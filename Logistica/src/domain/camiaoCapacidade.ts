import { ValueObject } from "../core/domain/ValueObject";
import { Result } from "../core/logic/Result";
import { Guard } from "../core/logic/Guard";

interface CapacidadeCamiaoProps {
  value: number;
}

export class CapacidadeCamiao extends ValueObject<CapacidadeCamiaoProps> {
  get value (): number {
    return this.props.value;
  }
  
  
  private constructor (props: CapacidadeCamiaoProps) {
    super(props);
  }

  public static create (capacidade: number): Result<CapacidadeCamiao> {
    const guardResult = Guard.againstNullOrUndefined(capacidade, 'capacidade');
    if (!guardResult.succeeded || capacidade<0) {
      return Result.fail<CapacidadeCamiao>(guardResult.message);
    } else {
      return Result.ok<CapacidadeCamiao>(new CapacidadeCamiao({ value: capacidade}))
    }
  }
}