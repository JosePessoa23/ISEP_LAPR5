import { OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Component } from '@angular/core';
import { ElementRef } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Account } from '../dto/account';
import { CreateAccService } from '../services/create-acc.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  title = 'Codingvila Login With Google';
  jwtService: JwtHelperService = new JwtHelperService();
  auth2: any;
  @ViewChild('loginRef', { static: true }) loginElement!: ElementRef;
  constructor(private accService: CreateAccService) { }

  ngOnInit() {
    var role = localStorage.getItem('Role');
    if(role != undefined && role != null && role!=''){
      window.location.href='logout';
    }else{
      this.googleAuthSDK();
    }
  }

  callLogin() {


    this.auth2.attachClickHandler(this.loginElement.nativeElement, {},
      (googleAuthUser: any) => {

        //Print profile details in the console logs

        let profile = googleAuthUser.getBasicProfile();

        this.accService.signIn(profile.getEmail()).subscribe(token => this.getRole(token.token));

      }, (error: any) => {
        alert(JSON.stringify(error, undefined, 2));
        
      });

  }

  getRole(token:string): void {
    localStorage.setItem("UserToken", token);
    if(token != undefined && token != null){
      var user = this.jwtService.decodeToken(token) as Account
      localStorage.setItem("Role", user.role);
      window.location.href='logout';
      }
      
  }

  func(user: Account): void {
    console.log(user.role);
    
  }

  googleAuthSDK() {

    (<any>window)['googleSDKLoaded'] = () => {
      (<any>window)['gapi'].load('auth2', () => {
        this.auth2 = (<any>window)['gapi'].auth2.init({
          client_id: '862017600524-28ic1ulmv750bjqgmmvg8vgtgaij4ejb.apps.googleusercontent.com',
          plugin_name:'login',
          cookiepolicy: 'single_host_origin',
          scope: 'profile email'
        });
        this.callLogin();
      });
    }

    (function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) { return; }
      js = d.createElement('script');
      js.id = id;
      js.src = "https://apis.google.com/js/platform.js?onload=googleSDKLoaded";
      fjs?.parentNode?.insertBefore(js, fjs);
    }(document, 'script', 'google-jssdk'));
  }
}