import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Camiao } from '../dto/camiao';
import { CamiaoService } from '../services/camiao.service';
import { CreateAccService } from '../services/create-acc.service';

@Component({
  selector: 'app-camiao-detail',
  templateUrl: './camiao-detail.component.html',
  styleUrls: [ './camiao-detail.component.css' ]
})
export class CamiaoDetailComponent implements OnInit {
  camiao: Camiao | undefined;
  bntStyle1: String = "btn-default";
  bntStyle2: String = "btn-default";

  constructor(
    private route: ActivatedRoute,
    private camiaoService: CamiaoService,
    private location: Location,
    private accService: CreateAccService
  ) {}

  ngOnInit(): void {
    this.accService.verificarAcesso('GF');
  }

  ngAfterViewInit(): void{
    this.getCamiao();
  }

  changeButton(button: number): void {
    if (button === 1 ) {
      this.bntStyle1 = "btn-change";
      this.bntStyle2 = "btn-default";
      }
      if (button === 2 ) {
      this.bntStyle1 = "btn-default";
      this.bntStyle2 = "btn-change";
      }
  }

  getCamiao(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.camiaoService.getCamiao(id)
      .subscribe(camiao => this.func(camiao));
  }

  func(camiao1: Camiao): void {
    this.camiao=camiao1;
    if(camiao1.disponibilidade==true){
      this.bntStyle1 = "btn-change";
      this.bntStyle2 = "btn-default";
    }else{
      this.bntStyle1 = "btn-default";
      this.bntStyle2 = "btn-change";
    }
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.camiao) {

      if(!this.camiao.tara|| !this.camiao.capacidade|| !this.camiao.cargaBateria|| !this.camiao.autonomia|| !this.camiao.tempoCarregamentoRapido){
        alert('É necessário preencher todos os campos.');
        return;
      }

      if(this.camiao.tara <= 0 || isNaN(+this.camiao.tara)){
        alert('Tara tem de ser um número maior que 0.');
        return;
      }
      if(this.camiao.capacidade <= 0 || isNaN(+this.camiao.capacidade)){
        alert('Capacidade tem de ser um número maior que 0.');
        return;
      }
      if(this.camiao.cargaBateria <= 0 || isNaN(+this.camiao.cargaBateria)){
        alert('A Carga da Bateria tem de ser um número maior que 0.');
        return;
      }
      if(this.camiao.autonomia <= 0 || isNaN(+this.camiao.autonomia)){
        alert('A Autonomia tem de ser um número maior que 0.');
        return;
      }
      if(this.camiao.tempoCarregamentoRapido <= 0 || isNaN(+this.camiao.tempoCarregamentoRapido)){
        alert('Tempo de Carregamento Rápido tem de ser um número maior que 0.');
        return;
      }

      this.camiaoService.updateCamiao(this.camiao)
        .subscribe(() => this.goBack());
    }
  }

}
