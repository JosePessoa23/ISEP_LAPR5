import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Entrega } from '../dto/entrega';
import { MessageService } from './message.service';


@Injectable({ providedIn: 'root' })
export class EntregaService {

  private entregasUrl = 'http://localhost:5000/api/entregas';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) {
      var token = localStorage.getItem('UserToken');
      if(token!=null){
      this.httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Token': token })
      };
    }
     }

  /** GET entregas from the server */
  getEntregas(): Observable<Entrega[]> {
    return this.http.get<Entrega[]>(this.entregasUrl, this.httpOptions)
      .pipe(
        tap(_ => this.log('fetched entregas')),
        catchError(this.handleError<Entrega[]>('getEntregas', []))
      );
  }


  /** GET entrega by id. Return `undefined` when id not found */
  getEntregaNo404<Data>(id: string): Observable<Entrega> {
    const url = `${this.entregasUrl}/?id=${id}`;
    return this.http.get<Entrega[]>(url, this.httpOptions)
      .pipe(
        map(entregas => entregas[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? 'fetched' : 'did not find';
          this.log(`${outcome} entrega id=${id}`);
        }),
        catchError(this.handleError<Entrega>(`getHero id=${id}`))
      );
  }

  /** GET entrega by id. Will 404 if id not found */
  getEntrega(id: string): Observable<Entrega> {
    const url = `${this.entregasUrl}/${id}`;
    return this.http.get<Entrega>(url, this.httpOptions).pipe(
      tap(_ => this.log(`fetched entrega id=${id}`)),
      catchError(this.handleError<Entrega>(`getEntrega id=${id}`))
    );
  }

  getEntregaByData(data: string): Observable<Entrega[]> {
    if(!Number(data)){
      return this.http.get<Entrega[]>(this.entregasUrl, this.httpOptions)
      .pipe(
        tap(_ => this.log('Formato de data inválido')),
        catchError(this.handleError<Entrega[]>('Formato de data inválido', []))
      );
    }else{
      const url = `${this.entregasUrl}/data/${data}`;
      return this.http.get<Entrega[]>(url, this.httpOptions).pipe(
        tap(_ => this.log('fetched entregas')),
        catchError(this.handleError<Entrega[]>('getEntregas', []))
      );
    }
  }

  getEntregaByArmazem(armazem: string): Observable<Entrega[]> {
    if(!Number(armazem)){
      return this.http.get<Entrega[]>(this.entregasUrl, this.httpOptions)
      .pipe(
        tap(_ => this.log('Armazém inválido')),
        catchError(this.handleError<Entrega[]>('Armazém inválido', []))
      );
    }else{
      const url = `${this.entregasUrl}/armazem/${armazem}`;
      return this.http.get<Entrega[]>(url, this.httpOptions).pipe(
        tap(_ => this.log('fetched entregas')),
        catchError(this.handleError<Entrega[]>('getEntregas', []))
      );
    }
  }

  getEntregaOrderedByArmazem(): Observable<Entrega[]> {
      const url = `${this.entregasUrl}/armazem/ascendente`;
      return this.http.get<Entrega[]>(url, this.httpOptions).pipe(
        tap(_ => this.log('fetched entregas')),
        catchError(this.handleError<Entrega[]>('getEntregas', []))
      );
    }

    getEntregaOrderedByData(): Observable<Entrega[]> {
      const url = `${this.entregasUrl}/data/descendente`;
      return this.http.get<Entrega[]>(url, this.httpOptions).pipe(
        tap(_ => this.log('fetched entregas')),
        catchError(this.handleError<Entrega[]>('getEntregas', []))
      );
    }

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

  //////// Save methods //////////

  /** POST: add a new entrega to the server */
  addEntrega(entrega: Entrega): Observable<Entrega> {
    return this.http.post<Entrega>(this.entregasUrl, entrega, this.httpOptions).pipe(
      tap((newEntrega: Entrega) => this.log(`added entrega w/ id=${newEntrega.id}`)),
      catchError(this.handleError<Entrega>('addEntrega'))
    );
  }

  /** DELETE: delete the entrega from the server */
  deleteEntrega(id: string | undefined): Observable<Entrega> {
    const url = `${this.entregasUrl}/${id}`;
    return this.http.delete<Entrega>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted entrega id=${id}`)),
      catchError(this.handleError<Entrega>('deleteEntrega'))
    );
  }

  /** PUT: update the entrega on the server */
  updateEntrega(entrega: Entrega): Observable<any> {
    const url = `${this.entregasUrl}/${entrega.id}`;
    return this.http.put(url, entrega, this.httpOptions).pipe(
      tap(_ => this.log(`updated entrega id=${entrega.id}`)),
      catchError(this.handleError<any>('updateEntrega'))
    );
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`EntregaService: ${message}`);
  }
}