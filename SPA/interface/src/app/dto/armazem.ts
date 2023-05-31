export interface Armazem {
  id?: string;
  idProprio: string;
  morada: string;
  codigoPostal: string;
  localidade: string;
  pais: string;
  designacao: string;
  latitude: number;
  longitude: number;
  altitude: number;
  disponibilidade: boolean;
}