import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { RotaDistancia } from "./rotaDistancia";
import { RotaId } from "./rotaId";
import { RotaTempoViagemCheio } from "./rotaTempoViagemCheio";
import { RotaEnergiaGasta } from "./rotaEnergiaGasta";
import { RotaTempoCarregamentoExtra } from "./rotaTempoCarregamentoExtra";
import { Result } from "../core/logic/Result";
import { Guard } from "../core/logic/Guard";


interface RotaProps {
idArmazemPartida: string;
idArmazemChegada: string;
distancia: RotaDistancia;
tempoViagemCheio: RotaTempoViagemCheio;
energiaGasta: RotaEnergiaGasta;
tempoCarregamentoExtra: RotaTempoCarregamentoExtra;
}

export class Rota extends AggregateRoot<RotaProps> {
  get id (): UniqueEntityID {
    return this._id;
  }
  
  get rotaId (): RotaId {
    return RotaId.caller(this.id)
  }

  get idArmazemPartida (): string {
    return this.props.idArmazemPartida;
  }

  set idArmazemPartida ( value: string) {
    this.props.idArmazemPartida = value;
  }

  get idArmazemChegada (): string {
    return this.props.idArmazemChegada;
  }

  set idArmazemChegada ( value: string) {
    this.props.idArmazemChegada = value;
  }

  get distancia (): RotaDistancia {
    return this.props.distancia;
  }

  set distancia ( value: RotaDistancia) {
    this.props.distancia = value;
  }

  get tempoViagemCheio (): RotaTempoViagemCheio {
    return this.props.tempoViagemCheio;
  }

  set tempoViagemCheio ( value: RotaTempoViagemCheio) {
    this.props.tempoViagemCheio = value;
  }

  get energiaGasta (): RotaEnergiaGasta {
    return this.props.energiaGasta;
  }

  set energiaGasta ( value: RotaEnergiaGasta) {
    this.props.energiaGasta = value;
  }

  get tempoCarregamentoExtra (): RotaTempoCarregamentoExtra {
    return this.props.tempoCarregamentoExtra;
  }

  set tempoCarregamentoExtra ( value: RotaTempoCarregamentoExtra) {
    this.props.tempoCarregamentoExtra = value;
  }

  private constructor (props: RotaProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create (props: RotaProps, id?: UniqueEntityID): Result<Rota> {

    const guardedProps = [
      { argument: props.idArmazemPartida, argumentName: 'idArmazemPartida' },
      { argument: props.idArmazemChegada, argumentName: 'idArmazemChegada' },
      { argument: props.distancia, argumentName: 'distancia' },
      { argument: props.tempoViagemCheio, argumentName: 'tempoViagemCheio' },
      { argument: props.energiaGasta, argumentName: 'energiaGasta' },
      { argument: props.tempoCarregamentoExtra, argumentName: 'tempoCarregamentoExtra' }
    ];

    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

    if (!guardResult.succeeded) {
      return Result.fail<Rota>(guardResult.message)
    }     
    else {
      const rota = new Rota({
        ...props
      }, id);

      return Result.ok<Rota>(rota);
    }
  }

}