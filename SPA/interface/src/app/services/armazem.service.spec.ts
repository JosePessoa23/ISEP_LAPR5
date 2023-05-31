import { HttpResponse } from "@angular/common/http";
import { HttpTestingController, HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { Armazem } from "../dto/armazem";
import { ArmazemService } from "./armazem.service";

describe('ArmazemService', () => {
    let service: ArmazemService;
    let http: HttpTestingController;
    const URL = 'http://localhost:5000/api/armazens';
  
    beforeEach(() => {
      localStorage.setItem('UserToken','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImRiNDkwNzFiLTA2ZDctNDVmNS1hNWY1LTg0MzUzZTFhOWYwNyIsImVtYWlsIjoiZmFmYXJvY2FzQGdtYWlsLmNvbSIsInJvbGUiOiJHQSIsIm5hbWUiOiJQb2xpYW5kbyIsInBob25lTnVtYmVyIjp7InByb3BzIjp7InZhbHVlIjoxMjMzNTQ4NTl9fSwiZXhwIjoxNjgzMzM1MjU2Ljg5OCwiaWF0IjoxNjcyOTcwODU2fQ.8YBJkws6QIX9Kqhx-W5YLwkgbtSrD8L94_5sO0Fm2GQ');
    localStorage.setItem('Role','GA');
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      
      });
      service = TestBed.inject(ArmazemService);
      http = TestBed.inject(HttpTestingController);
    });
  
    afterEach(() => {
      localStorage.setItem('UserToken','');
      localStorage.setItem('Role','');
      http.verify();
    });
  
    
  
    
    describe('#criarArmazemeEliminar', () => {
      
      let armazem: Armazem;
  
      beforeEach(() => {
        service = TestBed.inject(ArmazemService);
      });
     
      it('criar um armazem OK e returna-lo', () => {
        armazem = {idProprio:'G22',morada:'Travessa das Ribeiras, 71',codigoPostal:'4455-547',localidade:'Matosinhos',pais:'Portugal',designacao:'Freixieiro',latitude:41.22,longitude:8.69, altitude:0,disponibilidade:true};
        
        service.addArmazem(armazem).subscribe({
          next: data => expect(data)
          .withContext('').toEqual(armazem),
         error: fail 
        });
  
        const req = http.expectOne(URL);
        expect(req.request.method).toEqual('POST');
        expect(req.request.body).toEqual(armazem);
  
        const expectedResponse = new HttpResponse(
          { status: 200, statusText: 'OK', body: armazem });
        req.event(expectedResponse);

        service.deleteArmazem(armazem.id).subscribe({
          next: data => expect(data)
          .withContext('')
          .toEqual(armazem),
        error: fail
        });
  
        const req1 = http.expectOne(URL+'/'+armazem.id+'/hard');
        expect(req1.request.method).toEqual('DELETE');
  
        const expectedResponse1 = new HttpResponse(
          { status: 200, statusText: 'OK' , body: armazem});
        req.event(expectedResponse1);
      });
      
    })
    
  });
  