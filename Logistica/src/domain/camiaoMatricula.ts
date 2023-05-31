import { ValueObject } from "../core/domain/ValueObject";
import { Result } from "../core/logic/Result";
import { Guard } from "../core/logic/Guard";

interface MatriculaCamiaoProps {
  value: string;
}

export class MatriculaCamiao extends ValueObject<MatriculaCamiaoProps> {
  get value (): string {
    return this.props.value;
  }
  
  private constructor (props: MatriculaCamiaoProps) {
    super(props);
  }

  public static create (matricula: string): Result<MatriculaCamiao> {
    const guardResult = Guard.againstNullOrUndefined(matricula, 'matricula');
    if (guardResult.succeeded && (matricula.match('[A-Z][A-Z]-[0-9][0-9]-[A-Z][A-Z]') || matricula.match('[A-Z][A-Z]-[A-Z][A-Z]-[0-9][0-9]') ||
        matricula.match('[0-9][0-9]-[A-Z][A-Z]-[A-Z][A-Z]') || matricula.match('[A-Z][A-Z]-[0-9][0-9]-[0-9][0-9]') || matricula.match('[0-9][0-9]-[0-9][0-9]-[A-Z][A-Z]') ||
        matricula.match('[0-9][0-9]-[A-Z][A-Z]-[0-9][0-9]'))) {
        return Result.ok<MatriculaCamiao>(new MatriculaCamiao({ value: matricula }))
    } else {
      return Result.fail<MatriculaCamiao>(guardResult.message);
    }
  }
}