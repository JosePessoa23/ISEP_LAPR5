import internal from "stream";

export default interface IViagemDTO {
    camiao: string;
    custo: number;
    armazens: number[];
    entregas: string[];
    data: number;
}