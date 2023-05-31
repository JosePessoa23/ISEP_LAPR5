import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Entrega } from '../dto/entrega';
import { EntregaService } from '../services/entrega.service';
import { CreateAccService } from '../services/create-acc.service';

@Component({
  selector: 'app-entrega-detail',
  templateUrl: './entrega-detail.component.html',
  styleUrls: ['./entrega-detail.component.css']
})
export class EntregaDetailComponent {
  entrega: Entrega | undefined;


  constructor(
    private route: ActivatedRoute,
    private entregaService: EntregaService,
    private location: Location
    ,private accService: CreateAccService
  ) {}

  ngOnInit(): void {
    this.accService.verificarAcesso('GA');
  }

  ngAfterViewInit(): void{
    this.getEntrega();
  }

  getEntrega(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.entregaService.getEntrega(id)
      .subscribe(entrega => this.entrega = entrega);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.entrega) {
      if(!this.entrega.idLoja|| !this.entrega.tempoCarga|| !this.entrega.tempoDescarga|| !this.entrega.peso|| !this.entrega.data){
        alert('É necessário preencher todos os campos.');
        return;
      }

      var idLoja = Number(this.entrega.idLoja);
      if(idLoja != 3 || isNaN(+idLoja)){
        alert('Id do armazém tem de ser um número com 3 algarismos.');
        return;
      }

      if(this.entrega.tempoCarga <= 0 || isNaN(+this.entrega.tempoCarga)){
        alert('Tempo de Carregamento tem de ser um número maior do que 0.');
        return;
      }
      if(this.entrega.tempoDescarga <= 0 || isNaN(+this.entrega.tempoDescarga)){
        alert('Tempo de Descarga tem de ser um número maior do que 0.');
        return;
      }
      if(this.entrega.data.toString().length !=8 || isNaN(+this.entrega.data)){
        alert('Data deve seguir o formato yyyyMMdd.');
        return;
      }
      if(this.entrega.peso <= 0 || isNaN(+this.entrega.peso)){
        alert('Peso deve ser maior do que 0.');
        return;
      }

      this.entregaService.updateEntrega(this.entrega)
        .subscribe(() => this.goBack());
    }
  }
}
