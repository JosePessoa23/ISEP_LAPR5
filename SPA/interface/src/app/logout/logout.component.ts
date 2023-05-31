import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Account } from '../dto/account';
import { CreateAccService } from '../services/create-acc.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  jwtService: JwtHelperService = new JwtHelperService();

    utilizador: Account|undefined;
  
  constructor(private accService: CreateAccService) { }

  ngOnInit(): void {
    var token = localStorage.getItem('UserToken');
    var role = localStorage.getItem('Role');
    var isTokenExpired = this.jwtService.isTokenExpired(token);
    if(isTokenExpired){
      alert('A sua sessão expirou.');
      localStorage.setItem('UserToken','');
      localStorage.setItem('Role','');
      window.location.href='home';
    }else{
      if(role === undefined && role === null && role == ''){
        alert('You dont have acess to this page');
        window.location.href='home';
      }else{
        if(token != undefined && token != null){
          this.utilizador = this.jwtService.decodeToken(token) as Account
        }
      }
    }
  }

  destroyToken(): void{
    localStorage.setItem('Role','');
    localStorage.setItem('UserToken','');
    window.location.href='home';
  }

  anonimizarUser(): void {
    var token = localStorage.getItem('UserToken');
    var isTokenExpired = this.jwtService.isTokenExpired(token);
    if(isTokenExpired){
      alert('A sua sessão expirou.');
      localStorage.setItem('UserToken','');
      localStorage.setItem('Role','');
      window.location.href='home';
    }
    if(token != undefined && token != null){
      var user = this.jwtService.decodeToken(token) as Account
      user.name="empty";
      user.phoneNumber=999999999;
      user.role="empty";
      
      this.accService.anonimizarUser({name: user.name,email: user.email,phoneNumber: user.phoneNumber,role: user.role} as Account).subscribe();
      localStorage.setItem('UserToken','');
      localStorage.setItem('Role','');
      window.location.href='home';
    }
  }

}
