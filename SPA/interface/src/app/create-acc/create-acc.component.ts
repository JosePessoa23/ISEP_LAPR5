import { Component, OnInit } from '@angular/core';
import { Account } from '../dto/account';
import { CreateAccService } from '../services/create-acc.service';

@Component({
  selector: 'app-create-acc',
  templateUrl: './create-acc.component.html',
  styleUrls: ['./create-acc.component.css']
})
export class CreateAccComponent implements OnInit {

  selectedDay: string = '';

  users: Account[] = [];
  

  constructor(private accService: CreateAccService) { }

  ngOnInit(): void {
    this.accService.verificarAcesso('Admin');
  }

  ngAfterViewInit(): void{
    this.getUsers();
  }

  addUser(email1:string,name1: string,phoneNumber1:string,selectedDay: string): void {
    if(!email1||!name1||!phoneNumber1){
      alert('É necessário preencher todos os campos.');
      return;
    }

    //Verificação do email

    const expression: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    const result: boolean = expression.test(email1); // true

    if(result==false){
      alert('O formato do email esta incorreto');
      return;
    }

    //Verificação do número de telemóvel

    var phoneNumber = Number(phoneNumber1);
    if(phoneNumber1.length != 9|| isNaN(+phoneNumber)){
      alert('O número de telemovél é tem de conter 9 digitos.');
      return;
    }

    if(!selectedDay || selectedDay=="Selecione uma Opção"){
      alert('É necessário escolher uma opção.');
      return;
    }

    var email=email1.trim();
    var name =name1.trim();
    var role= selectedDay.trim();
    
    this.accService.addUser({name,email,phoneNumber,role} as Account).subscribe(user => {
      this.users.push(user);
    });;
    
  }
  

  selectChangeHandler (event: any) {
    this.selectedDay = event.target.value;
  }

  getUsers(): void {
    this.accService.getUsers()
    .subscribe(users => this.users = users);
  }

  anonimizarUser(user: Account): void {
    this.users = this.users.filter(h => h !== user);
    user.name="empty";
    user.phoneNumber=999999999;
    user.role="empty";
    this.accService.anonimizarUser(user).subscribe();
  }

}
