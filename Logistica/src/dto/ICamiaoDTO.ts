export default interface ICamiaoDTO {
  matricula: string;
  tara: number;
  capacidade: number;
  cargaBateria: number;
  autonomia: number;
  tempoCarregamentoRapido: number;
  disponibilidade?: boolean;
}
