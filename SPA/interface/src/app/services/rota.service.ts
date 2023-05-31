import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Rota } from '../dto/rota';
import { MessageService } from './message.service';


@Injectable({ providedIn: 'root' })
export class RotaService {

  private rotasUrl = 'http://localhost:3000/api/rotas';  // URL to web api

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

  /** GET rotas from the server */
  getRotas(): Observable<Rota[]> {
    return this.http.get<Rota[]>(this.rotasUrl, this.httpOptions)
      .pipe(
        tap(_ => this.log('fetched rotas')),
        catchError(this.handleError<Rota[]>('getRotas', []))
      );
  }

  /** GET rota by id. Will 404 if id not found */
  getRota(idPartida: string,idChegada: string): Observable<Rota> {
    const url = `${this.rotasUrl}/filtro/${idPartida}/${idChegada}`;
    return this.http.get<Rota>(url, this.httpOptions).pipe(
      tap(_ => this.log(`fetched rota idArmazemPartida=${idPartida} and idArmazemChegada=${idChegada}`)),
      catchError(this.handleError<Rota>(`getRota idArmazemPartida=${idPartida} and idArmazemChegada=${idChegada}`))
    );
  }

  getRotaPartida(idPartida: string): Observable<Rota[]> {
    const url = `${this.rotasUrl}/partida/${idPartida}`;
    this.log(url);
    return this.http.get<Rota[]>(url, this.httpOptions)
      .pipe(
        tap(_ => this.log('fetched rotas with idArmazemPartida')),
        catchError(this.handleError<Rota[]>('getRotas with idArmazemPartida', []))
      );
  }

  getRotaChegada(idChegada: string): Observable<Rota[]> {
    const url = `${this.rotasUrl}/chegada/${idChegada}`;
    return this.http.get<Rota[]>(url, this.httpOptions)
      .pipe(
        tap(_ => this.log('fetched rotas with idArmazemChegada')),
        catchError(this.handleError<Rota[]>('getRotas with idArmazemChegada', []))
      );
  }

  getRotaPagina(pagina: string): Observable<Rota[]> {
    const url = `${this.rotasUrl}/pagina/${pagina}`;
    return this.http.get<Rota[]>(url, this.httpOptions)
      .pipe(
        tap(_ => this.log('fetched rotas with pagina')),
        catchError(this.handleError<Rota[]>('getRotas with pagina', []))
      );
  }

  getRotaPaginaPartida(pagina: string,idPartida: string): Observable<Rota[]> {
    const url = `${this.rotasUrl}/paginapartida/${pagina}/${idPartida}`;
    return this.http.get<Rota[]>(url, this.httpOptions)
      .pipe(
        tap(_ => this.log('fetched rotas with pagina and idPartida')),
        catchError(this.handleError<Rota[]>('getRotas with pagina and idPartida', []))
      );
  }

  getRotaPaginaChegada(pagina: string,idChegada: string): Observable<Rota[]> {
    const url = `${this.rotasUrl}/paginachegada/${pagina}/${idChegada}`;
    return this.http.get<Rota[]>(url, this.httpOptions)
      .pipe(
        tap(_ => this.log('fetched rotas with pagina and idChegada')),
        catchError(this.handleError<Rota[]>('getRotas with pagina and idChegada', []))
      );
  }

  //////// Save methods //////////

  /** POST: add a new rota to the server */
  addRota(rota: Rota): Observable<Rota> {
    return this.http.post<Rota>(this.rotasUrl, rota, this.httpOptions).pipe(
      tap((newRota: Rota) => this.log(`added rota w/ id=${newRota.id}`)),
      catchError(this.handleError<Rota>('addRota'))
    );
  }

  /** DELETE: delete the rota from the server */
  deleteRota(idPartida: string,idChegada: string): Observable<Rota> {
    const url = `${this.rotasUrl}/${idPartida}/${idChegada}`;
    return this.http.delete<Rota>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted rota id=${idPartida}/${idChegada}`)),
      catchError(this.handleError<Rota>('deleteRota'))
    );
  }

  /** PUT: update the rota on the server */
  updateRota(rota: Rota): Observable<any> {
    return this.http.put(this.rotasUrl, rota, this.httpOptions).pipe(
      tap(_ => this.log(`updated rota id=${rota.id}`)),
      catchError(this.handleError<any>('updateRota'))
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
    this.messageService.add(`RotaService: ${message}`);
  }
}
