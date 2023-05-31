import { Component, OnInit } from '@angular/core';
import { PlaneamentoService } from '../services/planeamento.service';
import { Planeamento } from '../dto/planeamento';
import { CreateAccService } from '../services/create-acc.service';
import { PlaneamentoSimulado } from '../dto/planeamentoSimulado';

@Component({
  selector: 'app-planeamento',
  templateUrl: './planeamento.component.html',
  styleUrls: ['./planeamento.component.css']
})
export class PlaneamentoComponent implements OnInit {

  constructor(private planeamentoService: PlaneamentoService,private accService: CreateAccService) { }

  planeamento : Planeamento[]=[];
  selectedDay: string = '';
  plano : PlaneamentoSimulado[]=[];
  Armazens : string[]=[];
  data: string = '';


  ngOnInit(): void {
    this.accService.verificarAcesso('GL');
  }

  getPlaneamento(data1:string,selectedDay: string): void {

    this.planeamento=[];

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

    selectedDay.trim();
    if(!selectedDay || selectedDay=="Select an option"){
      alert('É necessário escolher uma opção.');
      return;
    }

    var d1 = data1.substring(0,4);

    var d2 = data1.substring(4,6);

    var d3 = data1.substring(6,8);

    var string = d1+"-"+d2+"-"+d3;

    if(selectedDay!='4'){
    this.planeamentoService.getPlanoEntregas(data,selectedDay).subscribe(plan => this.func(string,plan));
    }else{
      this.planeamentoService.getPlano(data).subscribe(plano => this.func2(string,plano));
    }

  }

  func2(data2:string,plan:PlaneamentoSimulado[]): void {
    this.data=data2;
    this.plano=plan;
  }

  getArmazens(plan:PlaneamentoSimulado): void {
    var nameArr = plan.entregas.split(',');
    this.Armazens= nameArr;
  }

  selectChangeHandler (event: any) {
    this.selectedDay = event.target.value;
  }

  func(data2:string,plan:Planeamento): void {
    plan.data=data2;
    this.planeamento.push(plan);
  }
  

}
