import { Component, OnInit } from '@angular/core';
import { CreateAccService } from '../services/create-acc.service';

import { Entrega } from '../dto/entrega';
import { EntregaService } from '../services/entrega.service';

@Component({
  selector: 'app-entrega',
  templateUrl: './entrega.component.html',
  styleUrls: ['./entrega.component.css']
})
export class EntregaComponent implements OnInit{
  entregas: Entrega[] = [];

  constructor(private entregaService: EntregaService,private accService: CreateAccService) { }

  ngOnInit(): void {
    this.accService.verificarAcesso('GA');
  }

  ngAfterViewInit(): void{
    this.getEntregas();
  }

  getEntregas(): void {
    this.entregaService.getEntregas()
    .subscribe(entregas => this.entregas = entregas);
  }

  getEntrega(id:string): void {
    this.entregas=[];
    id = id.trim();
    if(id == ""){this.getEntregas();}
    this.entregaService.getEntrega(id)
    .subscribe(entregas => this.entregas.push(entregas));
  }

  getEntregaByData(data:string): void {
    this.entregas=[];
    if(data == null || data == ""){
      this.getEntregas();
    }else{
      this.entregaService.getEntregaByData(data)
      .subscribe(entregas => this.entregas = entregas);
    }

  }

  getEntregaByArmazem(armazem:string): void {
    this.entregas=[];
    if(armazem == null || armazem == ""){
      this.getEntregas();
    }else{
      this.entregaService.getEntregaByArmazem(armazem)
      .subscribe(entregas => this.entregas = entregas);
    }
  }

  getEntregasOrderedByData(): void{
    this.entregaService.getEntregaOrderedByData()
    .subscribe(entregas => this.entregas = entregas);
  }

  getEntregasOrderedByArmazem(): void{
    this.entregaService.getEntregaOrderedByArmazem()
    .subscribe(entregas => this.entregas = entregas);
  }

  add(idLoja: string, tempoCarga1: string, tempoDescarga1: string, data1: string, peso1: string): void {
    if(!idLoja){
      alert('É necessário preencher todos os campos.');
      return;
    }else{
      var idLoja1 = Number(idLoja);
      if(idLoja.length != 3|| isNaN(+idLoja1)){
        alert('Id do armazém tem de ser um número com 3 algarismos.');
        return;
      }
    }

    if(!tempoCarga1){
      alert('É necessário preencher todos os campos.');
      return;
    }else{
      var tempoCarga = Number(tempoCarga1);
      if(tempoCarga <= 0|| isNaN(+tempoCarga)){
        alert('Tempo de Carregamento tem de ser um número maior do que 0.');
        return;
      }
    }

    if(!tempoDescarga1){
      alert('É necessário preencher todos os campos.');
      return;
    }else{
      var tempoDescarga = Number(tempoDescarga1);
      if(tempoDescarga <= 0|| isNaN(+tempoDescarga)){
        alert('Tempo de Descarga tem de ser um número maior do que 0.');
        return;
      }
    }

    if(!data1){
      alert('É necessário preencher todos os campos.');
      return;
    }else{
      var data = Number(data1);
      if(data1.length != 8|| isNaN(+data)){
        alert('Data deve seguir o formato yyyyMMdd.');
        return;
      }
    }

    if(!peso1){
      alert('É necessário preencher todos os campos.');
      return;
    }else{
      var peso = Number(peso1);
      if(peso <= 0|| isNaN(+peso)){
        alert('Peso deve ser maior do que 0.');
        return;
      }
    }


    idLoja = idLoja.trim();
    var tempoCarga = Number(tempoCarga1);
    var tempoDescarga = Number(tempoDescarga1);
    var data = Number(data1);
    var peso = Number(peso1);
    this.entregaService.addEntrega({idLoja:idLoja, tempoCarga:tempoCarga, tempoDescarga:tempoDescarga, data:data, peso:peso } as Entrega)
      .subscribe(entrega => {
        this.entregas.push(entrega);
      });
  }

  delete(entrega: Entrega): void {
    this.entregas = this.entregas.filter(h => h !== entrega);
    this.entregaService.deleteEntrega(entrega.id).subscribe();
  }
}
