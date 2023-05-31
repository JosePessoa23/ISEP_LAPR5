
import { ValueObject } from "../core/domain/ValueObject";
import { Result } from "../core/logic/Result";
import { Guard } from "../core/logic/Guard";

interface RotaEnergiaGastaProps {
  value: number;
}

export class RotaEnergiaGasta extends ValueObject<RotaEnergiaGastaProps> {
  get value (): number {
    return this.props.value;
  }

  private constructor (props: RotaEnergiaGastaProps) {
    super(props);
  }

  public static create (energiaGasta: number): Result<RotaEnergiaGasta> {
    const guardResult = Guard.againstNullOrUndefined(energiaGasta, 'energiaGasta');
    if (!guardResult.succeeded||energiaGasta<0) {
      return Result.fail<RotaEnergiaGasta>(guardResult.message);
    } else {
      return Result.ok<RotaEnergiaGasta>(new RotaEnergiaGasta({ value: energiaGasta }))
    }
  }
}