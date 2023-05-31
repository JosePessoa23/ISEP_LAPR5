import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";

import { Result } from "../core/logic/Result";
import { CamiaoId } from "./camiaoId";
import { Guard } from "../core/logic/Guard";


import { TaraCamiao } from "./camiaoTara";
import { CapacidadeCamiao } from "./camiaoCapacidade";
import { CargaBateriaCamiao } from "./camiaoCargaBateria";
import { AutonomiaCamiao } from "./camiaoAutonomia";
import { TempoCarregamentoCamiao } from "./camiaoTempoCarregamento";
import { MatriculaCamiao } from "./camiaoMatricula";

interface CamiaoProps {
    matricula: MatriculaCamiao
    tara: TaraCamiao;
    capacidade: CapacidadeCamiao;
    cargaBateria: CargaBateriaCamiao;
    autonomia: AutonomiaCamiao;
    tempoCarregamentoRapido: TempoCarregamentoCamiao;
    disponibilidade: boolean;
  }
  
  export class Camiao extends AggregateRoot<CamiaoProps> {
    get id (): UniqueEntityID {
      return this._id;
    }
  
    get camiaoId (): CamiaoId {
      return new CamiaoId(this.camiaoId.toValue());
    }

    get matricula (): MatriculaCamiao {
      return this.props.matricula;
    }
  
  
    get tara (): TaraCamiao {
      return this.props.tara;
    }
  
    set tara ( value: TaraCamiao) {
      this.props.tara = value;
    }

    get capacidade (): CapacidadeCamiao {
        return this.props.capacidade;
      }
    
    set capacidade ( value: CapacidadeCamiao) {
        this.props.capacidade = value;
    }

    get cargaBateria (): CargaBateriaCamiao {
        return this.props.cargaBateria;
      }
    
    set cargaBateria ( value: CargaBateriaCamiao) {
        this.props.cargaBateria = value;
    }

    get autonomia (): AutonomiaCamiao {
        return this.props.autonomia;
      }
    
    set autonomia ( value: AutonomiaCamiao) {
        this.props.autonomia = value;
    }

    get tempoCarregamentoRapido (): TempoCarregamentoCamiao {
        return this.props.tempoCarregamentoRapido;
    }
    
    set tempoCarregamentoRapido ( value: TempoCarregamentoCamiao) {
        this.props.tempoCarregamentoRapido = value;
    }

    get disponibilidade () : boolean{
      return this.props.disponibilidade;
    }

    set disponibilidade (value: boolean){
      this.props.disponibilidade = value;
    }


    private constructor (props: CamiaoProps, id?: UniqueEntityID) {
      super(props, id);
    }
  
    public static create (props: CamiaoProps, id?: UniqueEntityID): Result<Camiao> {
      const guardedProps = [
        { argument: props.matricula, argumentName: 'matricula' },
        { argument: props.tara, argumentName: 'tara' },
        { argument: props.capacidade, argumentName: 'capacidade' },
        { argument: props.cargaBateria, argumentName: 'carga bateria' },
        { argument: props.autonomia, argumentName: 'autonomia' },
        { argument: props.tempoCarregamentoRapido, argumentName: 'tempo carregamento' },
        { argument: props.disponibilidade, argumentName: 'disponibilidade'}
      ];
  
      const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);
  
      if (!guardResult.succeeded) {
        return Result.fail<Camiao>(guardResult.message)
      }     
      else {
        const camiao = new Camiao({
          ...props
        }, id);
  
        return Result.ok<Camiao>(camiao);
      }
    }
  }