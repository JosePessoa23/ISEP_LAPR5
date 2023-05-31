import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Armazem } from '../dto/armazem';
import { ArmazemService } from '../services/armazem.service';
import { CreateAccService } from '../services/create-acc.service';

@Component({
  selector: 'app-armazem-detail',
  templateUrl: './armazem-detail.component.html',
  styleUrls: ['./armazem-detail.component.css']
})
export class ArmazemDetailComponent {

  armazem: Armazem | undefined;
  bntStyle1: String = "btn-default";
  bntStyle2: String = "btn-default";

  constructor(
    private route: ActivatedRoute,
    private armazemService: ArmazemService,
    private location: Location,
    private accService: CreateAccService,
  ) {}

  ngOnInit(): void {
    this.accService.verificarAcesso('GA');
  }

  ngAfterViewInit(): void{
    this.getArmazem();
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

  getArmazem(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.armazemService.getArmazem(id)
      .subscribe(armazem => this.func(armazem));
  }

 
  func(armazem1: Armazem): void {
    this.armazem=armazem1;
    if(armazem1.disponibilidade==true){
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
    if (this.armazem) {

      //Verificação de campos vazios
      if(!this.armazem.idProprio || !this.armazem.morada || !this.armazem.codigoPostal || !this.armazem.localidade || !this.armazem.pais || !this.armazem.designacao || !this.armazem.latitude || !this.armazem.longitude){
        alert('É necessário preencher todos os campos.');
        return;
      }

      //Verificação do idProprio
      var reg = /^[a-zA-Z0-9][a-zA-Z0-9][a-zA-Z0-9]$/g;
      if(!reg.test(this.armazem.idProprio)){
        alert("ID deve ser um codigo alfanumérico de três caracteres.");
        return;
      }

      //Verificação do codigoPostal
      var reg = /^[0-9]{4}[-]{1}[0-9]{3}$/g;
      if(!reg.test(this.armazem.codigoPostal)){
        alert("O Código Postal deve ter 8 caracteres: 7 dígitos (4+3) separados por um hífen (-) e sem espaços.");
        return;
      }

      //Verificação da designacao
      if(this.armazem.designacao.length > 50){
        alert("A designacao do armazem nao deve ter mais que 50 caracteres.");
        return;
      }

      //Verificação da latitude
      if(this.armazem.latitude < -90 || this.armazem.latitude > 90){
        alert("A latitude tem que estar entre -90 e 90.");
        return;
      }

      //Verificação da longitude
      if(this.armazem.longitude < -180 || this.armazem.longitude > 180){
        alert("A longitude tem que estar entre -180 e 180.");
        return;
      }

      this.armazemService.updateArmazem(this.armazem)
        .subscribe(() => this.goBack());
    }
  }
}