import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { CreateAccService } from './create-acc.service';
import { Account } from '../dto/account';

describe('CreateAccService', () => {
  let service: CreateAccService;
  let http: HttpTestingController;
  const URL = 'http://localhost:3000/api/auth';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    
    });
    service = TestBed.inject(CreateAccService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    http.verify();
  });
  
  describe('#criarUser', () => {
    
    let user: Account;

    beforeEach(() => {
      service = TestBed.inject(CreateAccService);
    });
   
    it('criar um user OK e returna-lo', () => {
        user = {name:'Testado',email:'testezinho@gmail.com',phoneNumber:111111222,role:'GA'};
      
      service.addUser(user).subscribe({
        next: data => expect(data)
        .withContext('').toEqual(user),
       error: fail 
      });

      const req = http.expectOne(URL+'/signup');
      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual(user);

      const expectedResponse = new HttpResponse(
        { status: 200, statusText: 'OK', body: user });
      req.event(expectedResponse);
    });
    
 
  

   
    it('anonimizar um user OK e returna-lo', () => {
        user = {name:'Testado',email:'testezinho@gmail.com',phoneNumber:111111222,role:'GA'};
      
      service.anonimizarUser(user).subscribe({
        next: data => expect(data)
        .withContext('').toEqual(user),
       error: fail 
      });

      const req = http.expectOne(URL+'/updateuser');
      expect(req.request.method).toEqual('PUT');
      expect(req.request.body).toEqual(user);

      const expectedResponse = new HttpResponse(
        { status: 200, statusText: 'OK', body: user });
      req.event(expectedResponse);
    });
    
  })
  

});