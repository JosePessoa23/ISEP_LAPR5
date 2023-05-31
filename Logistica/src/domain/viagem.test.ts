import { Viagem } from "./viagem";
import { MatriculaCamiao } from "./camiaoMatricula";

describe('Create a valid viagem',() =>{
    const matricula1 = 'AF-90-RF';
    const custo1 = 520;
    const entregas1: string[]= ["batata","cebolas","frutas"];
    const armazens1: number[] = [2,7,4];
    const data1 = 20201205;

    var viagem = Viagem.create({camiao: MatriculaCamiao.create('AF-90-RF').getValue(),
                                custo: 520,
                                entregas: ["batata","cebolas","frutas"],
                                armazens: [2,7,4],
                                data: 20201205});
                                
    
    var expect = require('expect');
    it("ensure all Parameters are well formed", () => {
        expect(viagem.getValue().props.camiao.value).toEqual(matricula1);
    });
    it("ensure all Parameters are well formed", () => {
        expect(viagem.getValue().props.custo).toEqual(custo1);
    });
    it("ensure all Parameters are well formed", () => {
        expect(viagem.getValue().props.entregas).toEqual(entregas1);
    });
    it("ensure all Parameters are well formed", () => {
        expect(viagem.getValue().props.armazens).toEqual(armazens1);
    });
    it("ensure all Parameters are well formed", () => {
        expect(viagem.getValue().props.data).toEqual(data1);
    });
    

});