import { RotaDistancia } from "./rotaDistancia";
import { Rota } from "./rota";
import { RotaEnergiaGasta } from "./rotaEnergiaGasta";
import { RotaTempoCarregamentoExtra } from "./rotaTempoCarregamentoExtra";
import { RotaTempoViagemCheio } from "./rotaTempoViagemCheio";

describe('Create a valid rota',() =>{
    const idArmazemPartida1 = '005';
    const idArmazemChegada1 = '007';
    const distancia1 = 500;
    const tempoViagemCheio1 = 123;
    const energiaGasta1 = 85;
    const tempoCarregamentoExtra1 = 67;

    var rota = Rota.create({idArmazemPartida: '005',
                                idArmazemChegada: '007',
                                distancia: RotaDistancia.create(500).getValue(),
                                tempoViagemCheio: RotaTempoViagemCheio.create(123).getValue(),
                                energiaGasta: RotaEnergiaGasta.create(85).getValue(),
                                tempoCarregamentoExtra: RotaTempoCarregamentoExtra.create(67).getValue()});
                                
    
    var expect = require('expect');
    it("ensure all Parameters are well formed", () => {
        expect(rota.getValue().props.idArmazemPartida).toEqual(idArmazemPartida1);
    });
    it("ensure all Parameters are well formed", () => {
        expect(rota.getValue().props.idArmazemChegada).toEqual(idArmazemChegada1);
    });
    it("ensure all Parameters are well formed", () => {
        expect(rota.getValue().props.distancia.value).toEqual(distancia1);
    });
    it("ensure all Parameters are well formed", () => {
        expect(rota.getValue().props.tempoViagemCheio.value).toEqual(tempoViagemCheio1);
    });
    it("ensure all Parameters are well formed", () => {
        expect(rota.getValue().props.energiaGasta.value).toEqual(energiaGasta1);
    });
    it("ensure all Parameters are well formed", () => {
        expect(rota.getValue().props.tempoCarregamentoExtra.value).toEqual(tempoCarregamentoExtra1);
    });

});