import { Component, OnInit } from '@angular/core';
import { CreateAccService } from '../services/create-acc.service';

import { Rota } from '../dto/rota';
import { RotaService } from '../services/rota.service';

@Component({
  selector: 'app-rota',
  templateUrl: './rota.component.html',
  styleUrls: ['./rota.component.css']
})
export class RotaComponent implements OnInit{
  rotas: Rota[] = [];
  pagina: number = 1;

  constructor(private rotaService: RotaService,private accService: CreateAccService) { }

  ngOnInit(): void {
    this.accService.verificarAcesso('GL');
  }

  ngAfterViewInit(): void{
    this.rotaService.getRotaPagina(String(this.pagina))
    .subscribe(rotas => this.rotas = rotas);
  }

  getRotasPartida(idPartida: string): void {
    this.rotaService.getRotaPartida(idPartida)
    .subscribe(rotas => this.rotas = rotas);
  }

  getRotasChegada(idChegada: string): void {
    this.rotaService.getRotaChegada(idChegada)
    .subscribe(rotas => this.rotas = rotas);
  }

  

  getRotasPagina(): void {
    this.rotaService.getRotaPagina(String(this.pagina))
    .subscribe(rotas => this.rotas = rotas);
  }

  getRotasPaginaPartida(idPartida: string): void {
    this.rotaService.getRotaPaginaPartida(String(this.pagina),idPartida)
    .subscribe(rotas => this.rotas = rotas);
  }

  getRotasPaginaChegada(idChegada: string): void {
    this.rotaService.getRotaPaginaChegada(String(this.pagina),idChegada)
    .subscribe(rotas => this.rotas = rotas);
  }

  getRota(idPartida:string,idChegada:string): void {
    this.rotas=[];
    idPartida = idPartida.trim();
    idChegada = idChegada.trim();
    if(idPartida != "" && idChegada == ""){
      this.getRotasPaginaPartida(idPartida);
    }
    else if(idPartida == "" && idChegada != ""){
      this.getRotasPaginaChegada(idChegada);
    }
    else if(idPartida == "" && idChegada == ""){
      this.getRotasPagina();
    }else{
    this.rotaService.getRota(idPartida,idChegada)
    .subscribe(rotas => this.rotas.push(rotas));
    }
  }

  getRotasPaginaNext(idPartida: string,idChegada: string): void {
    const pag = this.pagina+1;
    
    if(idPartida != "" && idChegada == ""){
      this.rotaService.getRotaPaginaPartida(String(pag),idPartida)
    .subscribe(rotas => this.func(rotas));
    }
    else if(idPartida == "" && idChegada != ""){
      this.rotaService.getRotaPaginaChegada(String(pag),idChegada)
    .subscribe(rotas => this.func(rotas));
    }
    else if(idPartida == "" && idChegada == ""){
      this.rotaService.getRotaPagina(String(pag))
    .subscribe(rotas => this.func(rotas));
    }else{
    this.rotaService.getRota(idPartida,idChegada)
    .subscribe(rotas => this.func2(rotas));
    }
  }

  func(rota:Rota[]): void {
    if(rota.length != 0){
      this.rotas=rota;
      this.pagina = this.pagina+1;
    }
  }

  func2(rota:Rota): void {
    if(this.rotas.length == 0){
      this.rotas.push(rota);
    }
  }

  getRotasPaginaPrevious(idPartida: string,idChegada: string): void {
    if(this.pagina>1){
    this.pagina= this.pagina-1;
    if(idPartida != "" && idChegada == ""){
      this.getRotasPaginaPartida(idPartida);
    }
    else if(idPartida == "" && idChegada != ""){
      this.getRotasPaginaChegada(idChegada);
    }
    else if(idPartida == "" && idChegada == ""){
      this.getRotasPagina();
    }else{
    this.rotaService.getRota(idPartida,idChegada)
    .subscribe(rotas => this.rotas.push(rotas));
    }
    }
  }


  add(idArmazemPartida1: string, idArmazemChegada1: string, distancia1: string, tempoViagemCheio1: string, energiaGasta1: string, tempoCarregamentoExtra1: string): void {
    //Verificação do armazém de partida
    if(!idArmazemPartida1){
      alert('É necessário preencher todos os campos.');
      return;
    }else{
      var idArmazemPartida = idArmazemPartida1.trim();
    }

    //Verificação do armazém de chegada
    if(!idArmazemChegada1){
      alert('É necessário preencher todos os campos.');
      return;
    }else{
      var idArmazemChegada = idArmazemChegada1.trim();
    }

    //Verificação da distancia
    if(!distancia1){
      alert('É necessário preencher todos os campos.');
      return;
    }else{
      var distancia = Number(distancia1);
      if(distancia <= 0|| isNaN(+distancia)){
        alert('Obrigatório campo Distância da rota maior que 0!!');
        return;
      }
    }

    //Verificação do tempo de viagem cheio
    if(!tempoViagemCheio1){
      alert('É necessário preencher todos os campos.');
      return;
    }else{
      var tempoViagemCheio = Number(tempoViagemCheio1);
      if(tempoViagemCheio <= 0 || isNaN(+tempoViagemCheio)){
        alert('Obrigatório campo tempo viagem cheio da rota maior que 0!!');
        return;
      }
    }

    //Verificação da energia gasta
    if(!energiaGasta1){
      alert('É necessário preencher todos os campos.');
      return;
    }else{
      var energiaGasta = Number(energiaGasta1);
      if(energiaGasta <= 0 || isNaN(+energiaGasta)){
        alert('Obrigatório campo energia gasta da rota maior que 0!!');
        return;
      }
    }

    //Verificação do Tempo de Carregamento Extra
    if(!tempoCarregamentoExtra1){
      alert('É necessário preencher todos os campos.');
      return;
    }else{
      var tempoCarregamentoExtra = Number(tempoCarregamentoExtra1);
      if(tempoCarregamentoExtra < 0 || isNaN(+tempoCarregamentoExtra)){
        alert('Obrigatório campo tempo carregamento extra da rota positivo!!');
        return;
      }
    }
    
    this.rotaService.addRota({idArmazemPartida:idArmazemPartida, idArmazemChegada:idArmazemChegada, distancia:distancia, tempoViagemCheio:tempoViagemCheio, energiaGasta:energiaGasta, tempoCarregamentoExtra:tempoCarregamentoExtra } as Rota)
      .subscribe(rota => {
        this.rotas.push(rota);
      });
  }

  delete(rota: Rota): void {
    this.rotas = this.rotas.filter(h => h !== rota);
    this.rotaService.deleteRota(rota.idArmazemPartida,rota.idArmazemChegada).subscribe();
  }
}