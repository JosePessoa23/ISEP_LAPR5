import { HttpClientModule } from "@angular/common/http";
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArmazemComponent } from './armazem.component';

describe('ArmazemComponent', () => {
  let component: ArmazemComponent;
  let fixture: ComponentFixture<ArmazemComponent>;

  beforeEach(async () => {
    localStorage.setItem('UserToken','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImRiNDkwNzFiLTA2ZDctNDVmNS1hNWY1LTg0MzUzZTFhOWYwNyIsImVtYWlsIjoiZmFmYXJvY2FzQGdtYWlsLmNvbSIsInJvbGUiOiJHQSIsIm5hbWUiOiJQb2xpYW5kbyIsInBob25lTnVtYmVyIjp7InByb3BzIjp7InZhbHVlIjoxMjMzNTQ4NTl9fSwiZXhwIjoxNjgzMzM1MjU2Ljg5OCwiaWF0IjoxNjcyOTcwODU2fQ.8YBJkws6QIX9Kqhx-W5YLwkgbtSrD8L94_5sO0Fm2GQ');
    localStorage.setItem('Role','GA');
    await TestBed.configureTestingModule({
      declarations: [ ArmazemComponent ],
      imports: [HttpClientModule],
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArmazemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(async () => {
    localStorage.setItem('UserToken','');
    localStorage.setItem('Role','');
  });

  describe('#criarArmazem',()=> {
    
    //Id próprio
    it('criar armazem id próprio null',() => {
      const msg = 'É necessário preencher todos os campos.';
      let spy = spyOn(window, 'alert')
      
      component.add('','Travessa das Ribeiras, 71','4455-547','Matosinhos','Portugal', 'Freixieiro', '41.22', '-8.69','0');
      expect(window.alert).toHaveBeenCalledWith(msg);
      
      expect(spy).toBeTruthy;
    });

    it('criar armazém id próprio formato errado',() => {
      const msg = 'ID deve ser um codigo alfanumérico de três caracteres.';
      let spy = spyOn(window, 'alert')
      
      component.add('4545','Travessa das Ribeiras, 71','4455-547','Matosinhos','Portugal', 'Freixieiro', '41.22', '-8.69','0');
      expect(window.alert).toHaveBeenCalledWith(msg);
      
      expect(spy).toBeTruthy;
    });
    

    //Morada
    it('criar armazém morada null',() => {
      const msg = 'É necessário preencher todos os campos.';
      let spy = spyOn(window, 'alert')
      
      component.add('G22','','4455-547','Matosinhos','Portugal', 'Freixieiro', '41.22', '-8.69','0');
      expect(window.alert).toHaveBeenCalledWith(msg);
      
      expect(spy).toBeTruthy;
    });

    //Código postal
    it('criar armazém código postal null',() => {
      const msg = 'É necessário preencher todos os campos.';
      let spy = spyOn(window, 'alert')
      
      component.add('G22','Travessa das Ribeiras, 71','','Matosinhos','Portugal', 'Freixieiro', '41.22', '-8.69','0');
      expect(window.alert).toHaveBeenCalledWith(msg);
      
      expect(spy).toBeTruthy;
    });

    it('criar armazém código postal formato errado',() => {
      const msg = 'O Código Postal deve ter 8 caracteres: 7 dígitos (4+3) separados por um hífen (-) e sem espaços.';
      let spy = spyOn(window, 'alert')
      
      component.add('G22','Travessa das Ribeiras, 71','4485659','Matosinhos','Portugal', 'Freixieiro', '41.22', '-8.69','0');
      expect(window.alert).toHaveBeenCalledWith(msg);
      
      expect(spy).toBeTruthy;
    });

    //Localidade
    it('criar armazém localidade null',() => {
      const msg = 'É necessário preencher todos os campos.';
      let spy = spyOn(window, 'alert')
      
      component.add('G22','Travessa das Ribeiras, 71','4455-547','','Portugal', 'Freixieiro', '41.22', '-8.69','0');
      expect(window.alert).toHaveBeenCalledWith(msg);
      
      expect(spy).toBeTruthy;
    });
    
    //País
    it('criar armazém país null',() => {
      const msg = 'É necessário preencher todos os campos.';
      let spy = spyOn(window, 'alert')
      
      component.add('G22','Travessa das Ribeiras, 71','4455-547','Matosinhos','', 'Freixieiro', '41.22', '-8.69','0');
      expect(window.alert).toHaveBeenCalledWith(msg);
      
      expect(spy).toBeTruthy;
    });

    //Designação
    it('criar armazém designação null',() => {
      const msg = 'É necessário preencher todos os campos.';
      let spy = spyOn(window, 'alert')
      
      component.add('G22','Travessa das Ribeiras, 71','4455-547','Matosinhos','Portugal', '', '41.22', '-8.69','0');
      expect(window.alert).toHaveBeenCalledWith(msg);
      
      expect(spy).toBeTruthy;
    });

    it('criar armazém designação formato errado',() => {
      const msg = 'A designacao do armazem nao deve ter mais que 50 caracteres.';
      let spy = spyOn(window, 'alert')
      
      component.add('G22','Travessa das Ribeiras, 71','4455-547','Matosinhos','Portugal', 'aghftrwurithfydtsferghjiuytfdgertuiopoknbhgyrteytioghdhfhjjdihdsfgisjrgh', '41.22', '-8.69','0');
      expect(window.alert).toHaveBeenCalledWith(msg);
      
      expect(spy).toBeTruthy;
    });

    //Latitude
    it('criar armazém latitude null',() => {
      const msg = 'É necessário preencher todos os campos.';
      let spy = spyOn(window, 'alert')
      
      component.add('G22','Travessa das Ribeiras, 71','4455-547','Matosinhos','Portugal', 'Freixieiro', '', '-8.69','0');
      expect(window.alert).toHaveBeenCalledWith(msg);
      
      expect(spy).toBeTruthy;
    });

    it('criar armazém latitude < -90',() => {
      const msg = 'A latitude tem que estar entre -90 e 90.';
      let spy = spyOn(window, 'alert')
      
      component.add('G22','Travessa das Ribeiras, 71','4455-547','Matosinhos','Portugal', 'Freixieiro', '-95', '-8.69','0');
      expect(window.alert).toHaveBeenCalledWith(msg);
      
      expect(spy).toBeTruthy;
    });

    it('criar armazém latitude > 90',() => {
      const msg = 'A latitude tem que estar entre -90 e 90.';
      let spy = spyOn(window, 'alert')
      
      component.add('G22','Travessa das Ribeiras, 71','4455-547','Matosinhos','Portugal', 'Freixieiro', '95', '-8.69','0');
      expect(window.alert).toHaveBeenCalledWith(msg);
      
      expect(spy).toBeTruthy;
    });

    //Longitude
    it('criar armazém longitude null',() => {
      const msg = 'É necessário preencher todos os campos.';
      let spy = spyOn(window, 'alert')
      
      component.add('G22','Travessa das Ribeiras, 71','4455-547','Matosinhos','Portugal', 'Freixieiro', '41.22', '','0');
      expect(window.alert).toHaveBeenCalledWith(msg);
      
      expect(spy).toBeTruthy;
    });

    it('criar armazém longitude < -180',() => {
      const msg = 'A longitude tem que estar entre -180 e 180.';
      let spy = spyOn(window, 'alert')
      
      component.add('G22','Travessa das Ribeiras, 71','4455-547','Matosinhos','Portugal', 'Freixieiro', '41.22', '-185','0');
      expect(window.alert).toHaveBeenCalledWith(msg);
      
      expect(spy).toBeTruthy;
    });

    it('criar armazém latitude > 180',() => {
      const msg = 'A longitude tem que estar entre -180 e 180.';
      let spy = spyOn(window, 'alert')
      
      component.add('G22','Travessa das Ribeiras, 71','4455-547','Matosinhos','Portugal', 'Freixieiro', '41.22', '185','0');
      expect(window.alert).toHaveBeenCalledWith(msg);
      
      expect(spy).toBeTruthy;
    });
    
  });
});