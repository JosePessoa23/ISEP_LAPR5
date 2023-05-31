import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { CamiaoService } from './camiao.service';
import { Camiao } from '../dto/camiao';

describe('CamiaoService', () => {
  let service: CamiaoService;
  let http: HttpTestingController;
  const URL = 'http://localhost:3000/api/Camioes';

  beforeEach(() => {
    localStorage.setItem('UserToken','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImJmMmM2MmNkLWI3MWUtNGI2Ni05YTM1LWY4YjkyYTI1NWMwZCIsImVtYWlsIjoiZGF2aWRmYXJtaW5nY3J5cHRvQGdtYWlsLmNvbSIsInJvbGUiOiJHRiIsIm5hbWUiOiJEYXZpZCBvIGNhbWlvbmlzdGEiLCJwaG9uZU51bWJlciI6eyJwcm9wcyI6eyJ2YWx1ZSI6MTIzMjM0MzQ1fX0sImV4cCI6MTY4MzMzNTMzNC41MjksImlhdCI6MTY3Mjk3MDkzNH0.H4zh5dDOyTfHjTeZRViP1WmwGxCyg5QHy6Knna2HWSU');
    localStorage.setItem('Role','GF');
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    
    });
    service = TestBed.inject(CamiaoService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    localStorage.setItem('UserToken','');
    localStorage.setItem('Role','');
    http.verify();
  });

  

  
  describe('#criarCamiao', () => {
    
    let camiao: Camiao;

    beforeEach(() => {
      service = TestBed.inject(CamiaoService);
    });
   
    it('criar um camiao OK e returna-lo', () => {
      camiao = {matricula:'AA-00-DD',tara:12,capacidade:13,cargaBateria:14,autonomia:15,tempoCarregamentoRapido:200,disponibilidade:true};
      
      service.addCamiao(camiao).subscribe({
        next: data => expect(data)
        .withContext('').toEqual(camiao),
       error: fail 
      });

      const req = http.expectOne(URL);
      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual(camiao);

      const expectedResponse = new HttpResponse(
        { status: 200, statusText: 'OK', body: camiao });
      req.event(expectedResponse);
    });
    
  })
  
  describe('#eliminarCamiao', () => {

    beforeEach(() => {
      service = TestBed.inject(CamiaoService);
    });
    
    let camiao: Camiao =  {matricula:'AA-00-DD',tara:12,capacidade:13,cargaBateria:14,autonomia:15,tempoCarregamentoRapido:16,disponibilidade:true};

    it('eliminar um caminho OK', () => {
      service.deleteCamiao(camiao.matricula).subscribe({
        next: data => expect(data)
        .withContext('')
        .toEqual(camiao),
      error: fail
      });

      const req = http.expectOne(URL+'/AA-00-DD');
      expect(req.request.method).toEqual('DELETE');

      const expectedResponse = new HttpResponse(
        { status: 200, statusText: 'OK' , body: camiao});
      req.event(expectedResponse);
    });
  });
  
});
