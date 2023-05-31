import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Viagem } from '../dto/viagem';
import { MessageService } from './message.service';


@Injectable({ providedIn: 'root' })
export class ViagemService {

  private viagemUrl = 'http://localhost:3000/api/planeamento';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'ng':'1' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { 
      var token = localStorage.getItem('UserToken');
      if(token!=null){
      this.httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json', 'token': token })
      };
    }
    }

    
    addViagens(data:string, ng: string, dp:string,pc:string,pm:string, cp:string): Observable<Viagem[]>{
      var token = localStorage.getItem('UserToken');
      const url = `${this.viagemUrl}/plano/frota/${data}`;
      if(token!=null){
        
    
            var headers = new HttpHeaders({ 'Content-Type': 'application/json' ,
                                        'ng': ng,
                                        'dp': dp,
                                        'pc': pc,
                                        'pm': pm,
                                        'cp': cp,
                                        'Token': token})
        
      
        return this.http.get<Viagem[]>(url,{headers: headers}).pipe(
            tap(_ => this.log(`viagem created`)),
            catchError(this.handleError<Viagem[]>(`Viagem error`))
          );
        }else{
          var headers = new HttpHeaders({ 'Content-Type': 'application/json' ,
          'ng': ng,
          'dp': dp,
          'pc': pc,
          'pm': pm,
          'cp': cp})


          return this.http.get<Viagem[]>(url,{headers: headers}).pipe(
          tap(_ => this.log(`viagem created`)),
          catchError(this.handleError<Viagem[]>(`Viagem error`))
          );
        }


    }

  /** GET viagens from the server */
  getViagens(): Observable<Viagem[]> {
    return this.http.get<Viagem[]>(this.viagemUrl, this.httpOptions)
      .pipe(
        tap(_ => this.log('fetched viagens')),
        catchError(this.handleError<Viagem[]>('getviagens', []))
      );
  }

  getViagemPagina(pagina: string): Observable<Viagem[]> {
    const url = `${this.viagemUrl}/viagens/pagina/${pagina}`;
    return this.http.get<Viagem[]>(url, this.httpOptions)
      .pipe(
        tap(_ => this.log('fetched viagens with pagina')),
        catchError(this.handleError<Viagem[]>('getViagens with pagina', []))
      );
  }

  getViagem(camiao:string, data:string): Observable<Viagem> {
    return this.http.get<Viagem>(`${this.viagemUrl}/viagem/${camiao}/${data}`, this.httpOptions)
      .pipe(
        tap(_ => this.log('fetched viagens')),
        catchError(this.handleError<Viagem>('getViagem'))
      );
  }

  deleteViagem(camiao: string, data:number): Observable<Viagem> {
    const url = `${this.viagemUrl}/${camiao}/${data}`;
    return this.http.delete<Viagem>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted viagem id=${camiao} data=${data}`)),
      catchError(this.handleError<Viagem>('deleteViagem'))
    );
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

  /** Log a RotaService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`ViagemService: ${message}`);
  }
}