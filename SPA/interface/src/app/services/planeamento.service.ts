import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from './message.service';
import { Planeamento } from '../dto/planeamento';
import { PlaneamentoSimulado } from '../dto/planeamentoSimulado';
 

@Injectable({ providedIn: 'root' })
export class PlaneamentoService {


  private planeamentoUrl = 'http://localhost:3000/api/planeamento';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
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

  /** GET camioes from the server */
  getPlanoEntregas(data:number,value: string): Observable<Planeamento> {
    const url = `${this.planeamentoUrl}/${data}/${value}`;
    return this.http.get<Planeamento>(url, this.httpOptions).pipe(
      catchError(this.handleError<Planeamento>(`getPlaneamento data=${data}`))
    );
    
  }

  getPlano(data:number): Observable<PlaneamentoSimulado[]> {
    const url = `${this.planeamentoUrl}/plano/alternativo/${data}`;
    return this.http.get<PlaneamentoSimulado[]>(url, this.httpOptions).pipe(
      catchError(this.handleError<PlaneamentoSimulado[]>(`getPlaneamento data=${data}`))
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

  /** Log a CamiaoService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`CamiaoService: ${message}`);
  }
}
