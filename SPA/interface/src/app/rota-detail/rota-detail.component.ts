import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Rota } from '../dto/rota';
import { RotaService } from '../services/rota.service';
import { CreateAccService } from '../services/create-acc.service';

@Component({
  selector: 'app-rota-detail',
  templateUrl: './rota-detail.component.html',
  styleUrls: [ './rota-detail.component.css' ]
})
export class RotaDetailComponent implements OnInit {
  rota: Rota | undefined;

  constructor(
    private route: ActivatedRoute,
    private rotaService: RotaService,
    private location: Location
    ,private accService: CreateAccService
  ) {}

  ngOnInit(): void {
    this.accService.verificarAcesso('GL');
  }

  ngAfterViewInit(): void{
    this.getRota();
  }

  getRota(): void {
    
    const idPartida = this.route.snapshot.paramMap.get('idPartida')!;
    const idChegada = this.route.snapshot.paramMap.get('idChegada')!;
    this.rotaService.getRota(idPartida,idChegada)
      .subscribe(rota => this.rota = rota);
      
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.rota) {

      if(!this.rota.idArmazemPartida||!this.rota.idArmazemChegada||!this.rota.distancia|| !this.rota.tempoViagemCheio|| !this.rota.energiaGasta|| !this.rota.tempoCarregamentoExtra){
        alert('É necessário preencher todos os campos.');
        return;
      }

      if(this.rota.distancia <= 0 || isNaN(+this.rota.distancia)){
        alert('A Distância tem de ser um número maior que 0.');
        return;
      }
      if(this.rota.tempoViagemCheio <= 0 || isNaN(+this.rota.tempoViagemCheio)){
        alert('O Tempo Viagem Cheio tem de ser um número maior que 0.');
        return;
      }
      if(this.rota.energiaGasta <= 0 || isNaN(+this.rota.energiaGasta)){
        alert('A Energia Gasta tem de ser um número maior que 0.');
        return;
      }
      if(this.rota.tempoCarregamentoExtra < 0 || isNaN(+this.rota.tempoCarregamentoExtra)){
        alert('Obrigatório campo tempo carregamento extra da rota positivo!!');
        return;
      }

      this. rotaService.updateRota(this.rota)
        .subscribe(() => this.goBack());
    }
  }

}