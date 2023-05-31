import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Armazem } from '../dto/armazem';
import { MessageService } from './message.service';


@Injectable({ providedIn: 'root' })
export class ArmazemService {

  private armazensUrl = 'http://localhost:5000/api/armazens';  // URL to web api

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

  /** GET armazem from the server */
  getArmazens(): Observable<Armazem[]> {
    return this.http.get<Armazem[]>(this.armazensUrl, this.httpOptions)
      .pipe(
        tap(_ => this.log('fetched armazens')),
        catchError(this.handleError<Armazem[]>('getArmazens', []))
      );
  }

  /** GET armazem by id. Return `undefined` when id not found */
  getArmazemNo404<Data>(id: string): Observable<Armazem> {
    const url = `${this.armazensUrl}/?id=${id}`;
    return this.http.get<Armazem[]>(url,this.httpOptions)
      .pipe(
        map(armazens => armazens[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? 'fetched' : 'did not find';
          this.log(`${outcome} armazem id=${id}`);
        }),
        catchError(this.handleError<Armazem>(`getArmazem id=${id}`))
      );
  }

  /** GET armazem by id. Will 404 if id not found */
  getArmazem(id: string): Observable<Armazem> {
    const url = `${this.armazensUrl}/idProprio/${id}`;
    return this.http.get<Armazem>(url,this.httpOptions).pipe(
      tap(_ => this.log(`fetched armazem id=${id}`)),
      catchError(this.handleError<Armazem>(`getArmazem id=${id}`))
    );
  }

  /* GET armazens whose name contains search term */
  searchArmazens(term: string): Observable<Armazem[]> {
    if (!term.trim()) {
      // if not search term, return empty armazem array.
      return of([]);
    }
    return this.http.get<Armazem[]>(`${this.armazensUrl}/?name=${term}`,this.httpOptions).pipe(
      tap(x => x.length ?
         this.log(`found armazens matching "${term}"`) :
         this.log(`no armazens matching "${term}"`)),
      catchError(this.handleError<Armazem[]>('searchArmazens', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new armazem to the server */
  addArmazem(armazem: Armazem): Observable<Armazem> {
    return this.http.post<Armazem>(this.armazensUrl, armazem, this.httpOptions).pipe(
      tap((newArmazem: Armazem) => this.log(`added armazem w/ id=${newArmazem.idProprio}`)),
      catchError(this.handleError<Armazem>('addArmazem'))
    );
  }

  /** DELETE: delete the armazem from the server */
  deleteArmazem(id: string | undefined): Observable<Armazem> {
    const urlHardDelete = `${this.armazensUrl}/${id}/hard`;
    return this.http.delete<Armazem>(urlHardDelete, this.httpOptions).pipe(
      tap(_ => this.log(`deleted armazem id=${id}`)),
      catchError(this.handleError<Armazem>('deleteArmazem'))
    );
  }

  /** PUT: update the armazem on the server */
  updateArmazem(armazem: Armazem): Observable<any> {
    const url = `${this.armazensUrl}/${armazem.id}`;
    return this.http.put(url, armazem, this.httpOptions).pipe(
      tap(_ => this.log(`updated armazem id=${armazem.idProprio}`)),
      catchError(this.handleError<any>('updateArmazem'))
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

  /** Log a ArmazemService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`ArmazemService: ${message}`);
  }
}
