import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Camiao } from '../dto/camiao';
import { MessageService } from './message.service';


@Injectable({ providedIn: 'root' })
export class CamiaoService {

  private camioesUrl = 'http://localhost:3000/api/Camioes';  // URL to web api

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
  getCamioes(): Observable<Camiao[]> {
    return this.http.get<Camiao[]>(this.camioesUrl, this.httpOptions)
      .pipe(
        tap(_ => this.log('fetched camiões')),
        catchError(this.handleError<Camiao[]>('getCamioes', []))
      );
  }

  /** GET camiao by id. Return `undefined` when id not found */
  getCamiaoNo404<Data>(id: string): Observable<Camiao> {
    const url = `${this.camioesUrl}/?id=${id}`;
    return this.http.get<Camiao[]>(url, this.httpOptions)
      .pipe(
        map(camioes => camioes[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? 'fetched' : 'did not find';
          this.log(`${outcome} camiao id=${id}`);
        }),
        catchError(this.handleError<Camiao>(`getCamiao id=${id}`))
      );
  }

  /** GET camiao by id. Will 404 if id not found */
  getCamiao(id: string): Observable<Camiao> {
    const url = `${this.camioesUrl}/${id}`;
    return this.http.get<Camiao>(url, this.httpOptions).pipe(
      tap(_ => this.log(`fetched camiao id=${id}`)),
      catchError(this.handleError<Camiao>(`getCamiao id=${id}`))
    );
  }

  /* GET camioes whose name contains search term */
  searchCamioes(term: string): Observable<Camiao[]> {
    if (!term.trim()) {
      // if not search term, return empty camiao array.
      return of([]);
    }
    return this.http.get<Camiao[]>(`${this.camioesUrl}/?name=${term}`, this.httpOptions).pipe(
      tap(x => x.length ?
         this.log(`found camioes matching "${term}"`) :
         this.log(`no camioes matching "${term}"`)),
      catchError(this.handleError<Camiao[]>('searchCamioes', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new camiao to the server */
  addCamiao(camiao: Camiao): Observable<Camiao> {
    return this.http.post<Camiao>(this.camioesUrl, camiao, this.httpOptions).pipe(
      tap((newCamiao: Camiao) => this.log(`added camiao w/ id=${newCamiao.matricula}`)),
      catchError(this.handleError<Camiao>('addCamiao'))
    );
  }

  /** DELETE: delete the camiao from the server */
  deleteCamiao(id: string): Observable<Camiao> {
    const url = `${this.camioesUrl}/${id}`;
    return this.http.delete<Camiao>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted camiao id=${id}`)),
      catchError(this.handleError<Camiao>('deleteCamiao'))
    );
  }

  /** PUT: update the camiao on the server */
  updateCamiao(camiao: Camiao): Observable<any> {
    return this.http.put(this.camioesUrl, camiao, this.httpOptions).pipe(
      tap(_ => this.log(`updated camiao id=${camiao.matricula}`)),
      catchError(this.handleError<any>('updateCamiao'))
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
