import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";

import { Result } from "../core/logic/Result";
import IViagemDTO from "../dto/IViagemDTO";
import { MatriculaCamiao } from "./camiaoMatricula";
import { ViagemId } from "./viagemId";


interface ViagemProps {
  camiao: MatriculaCamiao;
  custo: number;
  entregas: string[];
  armazens: number[];
  data:number;
}

export class Viagem extends AggregateRoot<ViagemProps> {
  get id (): UniqueEntityID {
    return this._id;
  }

  get viagemId (): ViagemId {
    return new ViagemId(this.viagemId.toValue());
  }

  get camiao (): MatriculaCamiao {
    return this.props.camiao;
  }

  set camiao ( value: MatriculaCamiao) {
    this.props.camiao = value;
  }

  get custo (): number {
    return this.props.custo;
  }

  set custo ( value: number) {
    this.props.custo = value;
  }

  get entregas (): string[] {
    return this.props.entregas;
  }

  set entregas ( value: string[]) {
    this.props.entregas = value;
  }

  get armazens (): number[] {
    return this.props.armazens;
  }

  set armazens ( value: number[]) {
    this.props.armazens = value;
  }

  get data (): number {
    return this.props.data;
  }

  set data ( value: number) {
    this.props.data = value;
  }

  private constructor (props: ViagemProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create (props: ViagemProps, id?: UniqueEntityID): Result<Viagem> {
    const camiao = props.camiao;
    const custo = props.custo;
    const entregas = props.entregas;
    const armazens = props.armazens;
    const data = props.data;

    const viagem = new Viagem({ camiao: camiao,custo: custo, entregas: entregas, armazens: armazens, data: data }, id);
    return Result.ok<Viagem>( viagem )

  }

  public static createWithDTO (dto: IViagemDTO, id?: UniqueEntityID): Result<Viagem> {
    const camiao = MatriculaCamiao.create(dto.camiao).getValue();
    const custo = dto.custo;
    const entregas = dto.entregas;
    const armazens = dto.armazens;
    const data = dto.data;

    const viagem = new Viagem({ camiao: camiao,custo: custo, entregas: entregas, armazens: armazens, data: data }, id);
    return Result.ok<Viagem>( viagem )

  }
}
