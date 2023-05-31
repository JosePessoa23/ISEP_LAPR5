import { ValueObject } from "../core/domain/ValueObject";
import { Result } from "../core/logic/Result";
import { Guard } from "../core/logic/Guard";

interface AutonomiaCamiaoProps {
  value: number;
}

export class AutonomiaCamiao extends ValueObject<AutonomiaCamiaoProps> {
  get value (): number {
    return this.props.value;
  }

  
  private constructor (props: AutonomiaCamiaoProps) {
    super(props);
  }

  public static create (autonomia: number): Result<AutonomiaCamiao> {
    const guardResult = Guard.againstNullOrUndefined(autonomia, 'autonomia');
    if (!guardResult.succeeded) {
      return Result.fail<AutonomiaCamiao>(guardResult.message);
    } else {
      return Result.ok<AutonomiaCamiao>(new AutonomiaCamiao({ value: autonomia}))
    }
  }
}