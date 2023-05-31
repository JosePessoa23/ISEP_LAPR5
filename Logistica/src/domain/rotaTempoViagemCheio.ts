
import { ValueObject } from "../core/domain/ValueObject";
import { Result } from "../core/logic/Result";
import { Guard } from "../core/logic/Guard";

interface RotaTempoViagemCheioProps {
  value: number;
}

export class RotaTempoViagemCheio extends ValueObject<RotaTempoViagemCheioProps> {
  get value (): number {
    return this.props.value;
  }

  private constructor (props: RotaTempoViagemCheioProps) {
    super(props);
  }

  public static create (tempoViagemCheio: number): Result<RotaTempoViagemCheio> {
    const guardResult = Guard.againstNullOrUndefined(tempoViagemCheio, 'tempoViagemCheio');
    if (!guardResult.succeeded||tempoViagemCheio<0) {
      return Result.fail<RotaTempoViagemCheio>(guardResult.message);
    } else {
      return Result.ok<RotaTempoViagemCheio>(new RotaTempoViagemCheio({ value: tempoViagemCheio }))
    }
  }
}