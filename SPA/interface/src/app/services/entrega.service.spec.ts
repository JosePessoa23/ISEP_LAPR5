import { HttpResponse } from "@angular/common/http";
import { HttpTestingController, HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { Entrega } from "../dto/entrega";
import { EntregaService } from "./entrega.service";

describe('EntregaService', () => {
    let service: EntregaService;
    let http: HttpTestingController;
    const URL = 'http://localhost:5000/api/entregas';
  
    beforeEach(() => {
      localStorage.setItem('UserToken','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImRiNDkwNzFiLTA2ZDctNDVmNS1hNWY1LTg0MzUzZTFhOWYwNyIsImVtYWlsIjoiZmFmYXJvY2FzQGdtYWlsLmNvbSIsInJvbGUiOiJHQSIsIm5hbWUiOiJQb2xpYW5kbyIsInBob25lTnVtYmVyIjp7InByb3BzIjp7InZhbHVlIjoxMjMzNTQ4NTl9fSwiZXhwIjoxNjgzMzM1MjU2Ljg5OCwiaWF0IjoxNjcyOTcwODU2fQ.8YBJkws6QIX9Kqhx-W5YLwkgbtSrD8L94_5sO0Fm2GQ');
    localStorage.setItem('Role','GA');
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      
      });
      service = TestBed.inject(EntregaService);
      http = TestBed.inject(HttpTestingController);
    });
  
    afterEach(() => {
      localStorage.setItem('UserToken','');
      localStorage.setItem('Role','');
      http.verify();
    });
  
    
  
    
    describe('#criarEntregaeEliminar', () => {
      
      let entrega: Entrega;
  
      beforeEach(() => {
        service = TestBed.inject(EntregaService);
      });
     
      it('criar uma entrega OK e returna-lo', () => {
        entrega = {idLoja:'001',tempoCarga:12,tempoDescarga:13,data:14,peso:200};
        
        service.addEntrega(entrega).subscribe({
          next: data => expect(data)
          .withContext('').toEqual(entrega),
         error: fail 
        });
  
        const req = http.expectOne(URL);
        expect(req.request.method).toEqual('POST');
        expect(req.request.body).toEqual(entrega);
  
        const expectedResponse = new HttpResponse(
          { status: 200, statusText: 'OK', body: entrega });
        req.event(expectedResponse);

        service.deleteEntrega(entrega.id).subscribe({
          next: data => expect(data)
          .withContext('')
          .toEqual(entrega),
        error: fail
        });
  
        const req1 = http.expectOne(URL+'/'+entrega.id);
        expect(req1.request.method).toEqual('DELETE');
  
        const expectedResponse1 = new HttpResponse(
          { status: 200, statusText: 'OK' , body: entrega});
        req.event(expectedResponse1);
      });
      
    })
    
  });
  