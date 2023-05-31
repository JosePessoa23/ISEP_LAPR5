import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Viagem } from '../dto/viagem';
import { ViagemService } from '../services/viagem.service';
import { Location } from '@angular/common';
import { CreateAccService } from '../services/create-acc.service';

@Component({
  selector: 'app-viagem-detail',
  templateUrl: './viagem-detail.component.html',
  styleUrls: ['./viagem-detail.component.css']
})
export class ViagemDetailComponent implements OnInit {

  viagem: Viagem | undefined;
  idArmazem: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private viagemService: ViagemService,
    private location: Location,
    private accService: CreateAccService
  ) { }

  ngOnInit(): void {
    this.accService.verificarAcesso('GL');
  }

  ngAfterViewInit(): void{
    this.getViagem();
  }

  getViagem(): void {
    const camiao = this.route.snapshot.paramMap.get('camiao')!;
    const data = this.route.snapshot.paramMap.get('data')!;
    this.viagemService.getViagem(camiao, data)
      .subscribe(viagem => this.getNomeArmazem(viagem));
  }

  goBack(): void {
    this.location.back();
  }


  getNomeArmazem(viagem :Viagem): void{
    var aux1 : string = '00';
    var aux2 : string = '0';
    var id2 : string;
    this.viagem = viagem;
    var tamanho = viagem.armazens.length;
    for(var i= 0; i<tamanho; i++){
      var id1 = viagem.armazens[i].toString();
      if(id1.length === 1){
        id2 = aux1.concat(id1);
      }else if(id1.length ===2){
        id2 = aux2.concat(id1);
      }else{
        id2 = id1;
      }
      this.idArmazem.push(id2);
    }
    
    
  }



}
