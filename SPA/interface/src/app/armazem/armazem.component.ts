import { Component } from '@angular/core';
import { CreateAccService } from '../services/create-acc.service';
import { Armazem } from '../dto/armazem';
import { ArmazemService } from '../services/armazem.service';

@Component({
  selector: 'app-armazem',
  templateUrl: './armazem.component.html',
  styleUrls: ['./armazem.component.css']
})
export class ArmazemComponent {
  armazens: Armazem[] = [];

  constructor(private armazemService: ArmazemService,private accService: CreateAccService) { }

  ngOnInit(): void {
    this.accService.verificarAcesso('GA');
  }

  ngAfterViewInit(): void{
    this.getArmazens();
  }

  getArmazens(): void {
    this.armazemService.getArmazens()
    .subscribe(armazens => this.armazens = armazens);
  }

  getArmazem(idProprio:string): void {
    this.armazens=[];
    idProprio = idProprio.trim();
    if(idProprio == ""){this.getArmazens();}
    this.armazemService.getArmazem(idProprio)
    .subscribe(armazens => this.armazens.push(armazens));
  }

  add(idProprio: string, morada: string, codigoPostal: string, localidade: string, pais: string, designacao: string, latitudeStr: string, longitudeStr: string, altitudeStr: string){
    
    idProprio = idProprio.trim();
    morada = morada.trim();
    codigoPostal = codigoPostal.trim();
    localidade = localidade.trim();
    pais = pais.trim();
    designacao = designacao.trim();
    var latitude = Number(latitudeStr);
    var longitude = Number(longitudeStr);
    var altitude = Number(altitudeStr);
    
    //Verificação de campos vazios
    if(!idProprio || !morada || !codigoPostal || !localidade || !pais || !designacao || !latitudeStr || !longitudeStr || !altitudeStr){
      alert('É necessário preencher todos os campos.');
      return;
    }

    //Verificação do idProprio
    var reg = /^[a-zA-Z0-9][a-zA-Z0-9][a-zA-Z0-9]$/g;
    if(!reg.test(idProprio)){
      alert("ID deve ser um codigo alfanumérico de três caracteres.");
      return;
    }

    //Verificação do codigoPostal
    var reg = /^[0-9]{4}[-]{1}[0-9]{3}$/g;
    if(!reg.test(codigoPostal)){
      alert("O Código Postal deve ter 8 caracteres: 7 dígitos (4+3) separados por um hífen (-) e sem espaços.");
      return;
    }

    //Verificação da designacao
    if(designacao.length > 50){
      alert("A designacao do armazem nao deve ter mais que 50 caracteres.");
      return;
    }

    //Verificação da latitude
    if(latitude < -90 || latitude > 90){
      alert("A latitude tem que estar entre -90 e 90.");
      return;
    }

    //Verificação da longitude
    if(longitude < -180 || longitude > 180){
      alert("A longitude tem que estar entre -180 e 180.");
      return;
    }

    //Verificacao se o idProprio ja existe no sistema
    this.armazens.forEach( (armazem) => {
      if(armazem.idProprio == idProprio){
        alert('ID ja existe no sistema');
        return;
      }
    });

    var disponibilidade=true;

    this.armazemService.addArmazem( { 
        idProprio, 
        morada, 
        codigoPostal, 
        localidade, 
        pais, 
        designacao, 
        latitude, 
        longitude,
        altitude,
        disponibilidade,
      } as Armazem
    )
    .subscribe(
      armazem => {
        this.armazens.push(armazem);
      }
    );
  }

  delete(armazem: Armazem): void {
    this.armazens = this.armazens.filter(h => h !== armazem);
    this.armazemService.deleteArmazem(armazem.id).subscribe();
  }
}
