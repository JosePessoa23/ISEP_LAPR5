import { ValueObject } from "../core/domain/ValueObject";
import { Result } from "../core/logic/Result";
import { Guard } from "../core/logic/Guard";

interface TempoCarregamentoCamiaoProps {
  value: number;
}

export class TempoCarregamentoCamiao extends ValueObject<TempoCarregamentoCamiaoProps> {
  get value (): number {
    return this.props.value;
  }
  
  private constructor (props: TempoCarregamentoCamiaoProps) {
    super(props);
  }

  public static create (tempoCarregamento: number): Result<TempoCarregamentoCamiao> {
    const guardResult = Guard.againstNullOrUndefined(tempoCarregamento, 'tempo carregamento');
    if (!guardResult.succeeded || tempoCarregamento<=0) {
      return Result.fail<TempoCarregamentoCamiao>(guardResult.message);
    } else {
      return Result.ok<TempoCarregamentoCamiao>(new TempoCarregamentoCamiao({ value: tempoCarregamento}))
    }
  }
}