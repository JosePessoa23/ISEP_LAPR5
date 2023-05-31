import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { RotaService } from './rota.service';
import { Rota } from '../dto/rota';

describe('RotaService', () => {
  let service: RotaService;
  let http: HttpTestingController;
  const URL = 'http://localhost:3000/api/rotas';

  beforeEach(() => {
    localStorage.setItem('UserToken','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImRiNDkwNzFiLTA2ZDctNDVmNS1hNWY1LTg0MzUzZTFhOWYwNyIsImVtYWlsIjoiZmFmYXJvY2FzQGdtYWlsLmNvbSIsInJvbGUiOiJHTCIsIm5hbWUiOiJQb2xpYW5kbyIsInBob25lTnVtYmVyIjp7InByb3BzIjp7InZhbHVlIjoxMjMzNTQ4NTl9fSwiZXhwIjoxNjgzMzM1MzYwLjkzNSwiaWF0IjoxNjcyOTcwOTYwfQ.xpsjmD2y0e4mGrTiR-acqFP8q6iW3xpDL3EwP-7U588');
    localStorage.setItem('Role','GL');
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    
    });
    service = TestBed.inject(RotaService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    localStorage.setItem('UserToken','');
      localStorage.setItem('Role','');
    http.verify();
  });

  

  
  describe('#criarRota', () => {
    
    let rota: Rota;

    beforeEach(() => {
      service = TestBed.inject(RotaService);
    });
   
    it('criar uma rota OK e returna-lo', () => {
      rota = {idArmazemPartida:'Matosinhos', idArmazemChegada:'Arouca' ,distancia:40,tempoViagemCheio:60,energiaGasta:134,tempoCarregamentoExtra:10};
      
      service.addRota(rota).subscribe({
        next: data => expect(data)
        .withContext('').toEqual(rota),
       error: fail 
      });

      const req = http.expectOne(URL);
      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual(rota);

      const expectedResponse = new HttpResponse(
        { status: 200, statusText: 'OK', body: rota });
      req.event(expectedResponse);
    });
    
  })
  
  describe('#eliminarRota', () => {

    beforeEach(() => {
      service = TestBed.inject(RotaService);
    });
    
    let rota: Rota =  {idArmazemPartida:'Matosinhos', idArmazemChegada:'Arouca' ,distancia:40,tempoViagemCheio:60,energiaGasta:134,tempoCarregamentoExtra:10};

    it('eliminar uma rota OK', () => {
      service.deleteRota(rota.idArmazemPartida,rota.idArmazemChegada).subscribe({
        next: data => expect(data)
        .withContext('')
        .toEqual(rota),
      error: fail
      });

      const req = http.expectOne(URL+'/Matosinhos/Arouca'); 
      expect(req.request.method).toEqual('DELETE');

      const expectedResponse = new HttpResponse(
        { status: 200, statusText: 'OK' , body: rota});
      req.event(expectedResponse);
    });
  });
  
});