import { AutonomiaCamiao } from "./camiaoAutonomia";
import { Camiao } from "./camiao";
import { CapacidadeCamiao } from "./camiaoCapacidade";
import { CargaBateriaCamiao } from "./camiaoCargaBateria";
import { MatriculaCamiao } from "./camiaoMatricula";
import { TaraCamiao } from "./camiaoTara";
import { TempoCarregamentoCamiao } from "./camiaoTempoCarregamento";


describe('Create a valid camiao',() =>{
    const matricula1 = 'AA-02-BG';
    const tara1 = 20;
    const capacidade1 = 500;
    const cargaBateria1 = 2123;
    const autonomia1 = 114;
    const tempoCarregamentoRapido1 = 67;

    var camiao = Camiao.create({matricula: MatriculaCamiao.create('AA-02-BG').getValue(),
                                tara: TaraCamiao.create(20).getValue(),
                                capacidade: CapacidadeCamiao.create(500).getValue(),
                                cargaBateria: CargaBateriaCamiao.create(2123).getValue(),
                                autonomia: AutonomiaCamiao.create(114).getValue(),
                                tempoCarregamentoRapido: TempoCarregamentoCamiao.create(67).getValue(),
                                disponibilidade: true});
                                
    
    var expect = require('expect');
    it("ensure all Parameters are well formed", () => {
        expect(camiao.getValue().props.matricula.value).toEqual(matricula1);
    });
    it("ensure all Parameters are well formed", () => {
        expect(camiao.getValue().props.tara.value).toEqual(tara1);
    });
    it("ensure all Parameters are well formed", () => {
        expect(camiao.getValue().props.capacidade.value).toEqual(capacidade1);
    });
    it("ensure all Parameters are well formed", () => {
        expect(camiao.getValue().props.cargaBateria.value).toEqual(cargaBateria1);
    });
    it("ensure all Parameters are well formed", () => {
        expect(camiao.getValue().props.autonomia.value).toEqual(autonomia1);
    });
    it("ensure all Parameters are well formed", () => {
        expect(camiao.getValue().props.tempoCarregamentoRapido.value).toEqual(tempoCarregamentoRapido1);
    });

});

/*
describe('Create a non valid camiao, matricula errada',() =>{
    const matricula1 = 'AA-02-BG';
    const tara1 = 20;
    const capacidade1 = 500;
    const cargaBateria1 = 2123;
    const autonomia1 = 114;
    const tempoCarregamentoRapido1 = 67;

    var camiao = Camiao.create({matricula: MatriculaCamiao.create('batata').getValue(),
                            tara: TaraCamiao.create(20).getValue(),
                            capacidade: CapacidadeCamiao.create(500).getValue(),
                            cargaBateria: CargaBateriaCamiao.create(2123).getValue(),
                            autonomia: AutonomiaCamiao.create(114).getValue(),
                            tempoCarregamentoRapido: TempoCarregamentoCamiao.create(67).getValue(),
                            disponibilidade: true});

    
    console.log(camiao.getValue().props.matricula.value);
    var expect = require('expect');
    it("ensure matricula is wrong", () => {
        expect(camiao.error).toEqual('undefined');
    });
    

});*/