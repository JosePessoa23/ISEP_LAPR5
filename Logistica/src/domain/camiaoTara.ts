import { ValueObject } from "../core/domain/ValueObject";
import { Result } from "../core/logic/Result";
import { Guard } from "../core/logic/Guard";

interface TaraCamiaoProps {
  value: number;
}

export class TaraCamiao extends ValueObject<TaraCamiaoProps> {
  get value (): number {
    return this.props.value;
  }

  
  private constructor (props: TaraCamiaoProps) {
    super(props);
  }

  public static create (tara: number): Result<TaraCamiao> {
    const guardResult = Guard.againstNullOrUndefined(tara, 'tara');
    if (!guardResult.succeeded || tara<0) {
      return Result.fail<TaraCamiao>(guardResult.message);
    } else {
      return Result.ok<TaraCamiao>(new TaraCamiao({ value: tara }))
    }
  }
}