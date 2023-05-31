import { Component, OnInit } from '@angular/core';
import { CreateAccService } from '../services/create-acc.service';
import { Viagem } from '../dto/viagem';
import { ViagemService } from '../services/viagem.service';

@Component({
  selector: 'app-viagem',
  templateUrl: './viagem.component.html',
  styleUrls: ['./viagem.component.css']
})
export class ViagemComponent implements OnInit {
  viagens: Viagem[] = [];
  pagina: number = 1;

  constructor(private viagemService: ViagemService,private accService: CreateAccService) { }

  ngOnInit(): void {
    this.accService.verificarAcesso('GL');
  }

  ngAfterViewInit(): void{
    this.viagemService.getViagemPagina(String(this.pagina))
    .subscribe(viagens => this.viagens = viagens);
  }

  addViagem(data:string, ng:string,dp:string,pc:string,pm:string,cp:string):void {

    if(!data||!ng||!dp||!pc||!pm||!cp){
      alert('É necessário preencher todos os campos.');
      return;
    }


    var data1 = Number(data);
    if(data.length != 8|| isNaN(+data1)){
      alert('Data deve seguir o formato yyyyMMdd.');
      return;
    }


    var ng1 = Number(ng);
    if(ng1 <= 0 || isNaN(+ng1)){
      alert('O número de gerações tem de ser maior que 0.');
      return;
    }

      var dp1 = Number(dp);
      if(dp1 <= 0 || isNaN(+dp1)){
        alert('A dimensão da população tem de ser um número maior que 0.');
        return;
      }


      var pc1 = Number(pc);
      if(pc1 <= 0 || pc1>100 || isNaN(+pc1)){
        alert('A Probabilidade de cruzamento tem de ser um número maior que 0 e menor ou igual a 100.');
        return;
      }

      var pm1 = Number(pm);
      if(pm1 <= 0 || pm1>100 || isNaN(+pm1)){
        alert('A Probabilidade de mutação tem de ser um número maior que 0 e menor ou igual a 100.');
        return;
      }
    

      var cp1 = Number(cp);
      if(cp1 <= 0 || isNaN(+cp1)){
        alert('O tempo mínimo aceitável tem de ser um número maior que 0.');
        return;
      }
  
    this.viagemService.addViagens(data,ng,dp,pc,pm,cp).subscribe(viagem => this.viagens = this.viagens.concat(viagem));
  }

  getViagens(): void {
    this.viagemService.getViagens()
    .subscribe(viagens => this.viagens = viagens);
  }

  delete(viagem: Viagem): void {
    var data1= Number(viagem.data);
    this.viagens = this.viagens.filter(h => h !== viagem);
    this.viagemService.deleteViagem(viagem.camiao, data1).subscribe();
  }

  getViagensPaginaNext(): void {
    const pag = this.pagina+1;
      this.viagemService.getViagemPagina(String(pag))
    .subscribe(viagens => this.func(viagens));

  }

  func(viagem:Viagem[]): void {
    if(viagem.length != 0){
      this.viagens=viagem;
      this.pagina = this.pagina+1;
    }
  }

  getViagensPaginaPrevious(): void {
    if(this.pagina>1){
    this.pagina= this.pagina-1;
    this.viagemService.getViagemPagina(String(this.pagina))
    .subscribe(viagens => this.viagens=viagens);
    }
    }
  

}
