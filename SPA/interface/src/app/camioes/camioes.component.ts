import { Component, InjectFlags, OnInit } from '@angular/core';

import { Camiao } from '../dto/camiao';
import { CamiaoService } from '../services/camiao.service';
import { CreateAccService } from '../services/create-acc.service';

@Component({
  selector: 'app-camioes',
  templateUrl: './camioes.component.html',
  styleUrls: ['./camioes.component.css']
})
export class CamioesComponent implements OnInit {
  camioes: Camiao[] = [];

  constructor(private camiaoService: CamiaoService,private accService: CreateAccService) { }

  ngOnInit(): void {
    this.accService.verificarAcesso('GF');
  }

  ngAfterViewInit(): void{
    this.getCamioes();
  }

  getCamioes(): void {
    this.camiaoService.getCamioes()
    .subscribe(camioes => this.camioes = camioes);
  }

  getCamiao(matricula:string): void {
    this.camioes=[];
    matricula = matricula.trim();
    if(matricula == ""){this.getCamioes();}
    this.camiaoService.getCamiao(matricula)
    .subscribe(camioes => this.camioes.push(camioes));
  }

  add(matricula: string,tara1: string,capacidade1: string,cargaBateria1: string,autonomia1: string,tempoCarregamentoRapido1: string): void {


    //Verificação da matrícula
    if(!matricula){
      alert('É necessário preencher todos os campos.');
      return;
    }
    var reg = /^[0-9A-Z][0-9A-Z]-[0-9A-Z][0-9A-Z]-[0-9A-Z][0-9A-Z]/g;
    
    if(!reg.test(matricula)){
      alert("Matricula com o formato inválido.");
      return;
    }

    matricula = matricula.trim();

    //Verificação da tara
    if(!tara1){
      alert('É necessário preencher todos os campos.');
      return;
    }else{
      var tara = Number(tara1);
      if(tara <= 0 || isNaN(+tara)){
        alert('Tara tem de ser um número maior que 0.');
        return;
      }
    }

    //Verificação da capacidade
    if(!capacidade1){
      alert('É necessário preencher todos os campos.');
      return;
    }else{
      var capacidade = Number(capacidade1);
      if(capacidade <= 0|| isNaN(+capacidade)){
        alert('Capacidade tem de ser um número maior que 0.');
        return;
      }
    }

    //Verificação da carga da bateria
    if(!cargaBateria1){
      alert('É necessário preencher todos os campos.');
      return;
    }else{
      var cargaBateria = Number(cargaBateria1);
      if(cargaBateria <= 0 || isNaN(+cargaBateria)){
        alert('A Carga da Bateria tem de ser um número maior que 0.');
        return;
      }
    }

    //Verificação da Autonomia
    if(!autonomia1){
      alert('É necessário preencher todos os campos.');
      return;
    }else{
      var autonomia = Number(autonomia1);
      if(autonomia <= 0 || isNaN(+autonomia)){
        alert('A Autonomia tem de ser um número maior que 0.');
        return;
      }
    }

    //Verificação do Tempo de Carregamento Rapido
    if(!tempoCarregamentoRapido1){
      alert('É necessário preencher todos os campos.');
      return;
    }else{
      var tempoCarregamentoRapido = Number(tempoCarregamentoRapido1);
      if(tempoCarregamentoRapido <= 0 || isNaN(+tempoCarregamentoRapido)){
        alert('Tempo de Carregamento Rápido tem de ser um número maior que 0.');
        return;
      }
    }

    var flag=false;
    this.camioes.forEach( (element) => {
      if(element.matricula == matricula){
        alert('Matrícula ja existe no sistema');
        flag = true;
      }
    });

    if(flag){
      return;
    }

    this.camiaoService.addCamiao({ matricula,tara,capacidade,cargaBateria,autonomia,tempoCarregamentoRapido} as Camiao)
      .subscribe(camiao => {
        this.camioes.push(camiao);
      });
  }

  delete(camiao: Camiao): void {
    this.camioes = this.camioes.filter(h => h !== camiao);
    this.camiaoService.deleteCamiao(camiao.matricula).subscribe();
  }

}
