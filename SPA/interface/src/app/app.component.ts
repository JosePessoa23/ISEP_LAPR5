import { Component } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt'
import { Account } from './dto/account';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'EletricGo';
  role: string|undefined;
  jwtService: JwtHelperService = new JwtHelperService();

  ngOnInit(): void {
    var role2 = localStorage.getItem('Role');
    if(role2 != undefined && role2 != null){
      this.role=role2;
    }
  }

  
}
