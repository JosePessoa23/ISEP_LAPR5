import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Account } from '../dto/account';
import { MessageService } from './message.service';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({ providedIn: 'root' })
export class CreateAccService {

  private accUrl = 'http://localhost:3000/api/auth';  // URL to web api
  jwtService: JwtHelperService = new JwtHelperService();

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  
  /** POST: add a new user to the server */
  addUser(user: Account): Observable<Account> {
    const url = `${this.accUrl}/signup`;
    return this.http.post<Account>(url, user, this.httpOptions).pipe(
      tap((newUser: Account) => this.log(`added user w/ id=${newUser.email}`)),
      catchError(this.handleError<Account>('addUser'))
    );
  }

  signIn(email: string): Observable<{user: Account, token: string}> {
    return this.http.post<{user: Account, token: string}>(this.accUrl+'/signin', {"email": email}, this.httpOptions);
  }

  anonimizarUser(user: Account): Observable<any> {
    return this.http.put(this.accUrl+'/updateuser', user, this.httpOptions).pipe(
      tap(_ => this.log(`updated user email=${user.email}`)),
      catchError(this.handleError<any>('updateUser'))
    );
  }

  getUsers(): Observable<Account[]> {
    return this.http.get<Account[]>(this.accUrl)
      .pipe(
        tap(_ => this.log('fetched users')),
        catchError(this.handleError<Account[]>('getUsers', []))
      );
  }

  getUser(email: string): Observable<Account> {
    const url = `${this.accUrl}/users/${email}`;
    return this.http.get<Account>(url).pipe(
      tap(_ => this.log(`fetched user email=${email}`)),
      catchError(this.handleError<Account>(`getUser email=${email}`))
    );
  }

  verificarAcesso(roleAtual: string): void {
    var token = localStorage.getItem('UserToken');
    var role = localStorage.getItem('Role');
    var isTokenExpired = this.jwtService.isTokenExpired(token);
    console.log(isTokenExpired);
    if(isTokenExpired){
      alert('A sua sessão expirou.');
      localStorage.setItem('UserToken','');
      localStorage.setItem('Role','');
      window.location.href='home';
    }else{
    if(role!=roleAtual){
      alert('You dont have acess to this page');
      if(role != undefined && role != null && role!=''){
        window.location.href='logout';
      }else{
        window.location.href='home';
      }
    }
    }
    
  }


  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a CamiaoService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`CreateAccService: ${message}`);
  }
}
