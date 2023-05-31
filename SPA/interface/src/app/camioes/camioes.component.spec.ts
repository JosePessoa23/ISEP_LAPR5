import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CamioesComponent } from './camioes.component';
import { throwError } from 'rxjs'; // make sure to import the throwError from rxjs
import { Camiao } from '../dto/camiao';
import { CamiaoService } from '../services/camiao.service';

describe('CamiaoComponent', () => {
  let component: CamioesComponent;
  let fixture: ComponentFixture<CamioesComponent>;

  beforeEach(async () => {
    localStorage.setItem('UserToken','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImJmMmM2MmNkLWI3MWUtNGI2Ni05YTM1LWY4YjkyYTI1NWMwZCIsImVtYWlsIjoiZGF2aWRmYXJtaW5nY3J5cHRvQGdtYWlsLmNvbSIsInJvbGUiOiJHRiIsIm5hbWUiOiJEYXZpZCBvIGNhbWlvbmlzdGEiLCJwaG9uZU51bWJlciI6eyJwcm9wcyI6eyJ2YWx1ZSI6MTIzMjM0MzQ1fX0sImV4cCI6MTY4MzMzNTMzNC41MjksImlhdCI6MTY3Mjk3MDkzNH0.H4zh5dDOyTfHjTeZRViP1WmwGxCyg5QHy6Knna2HWSU');
    localStorage.setItem('Role','GF');
    await TestBed.configureTestingModule({
      declarations: [ CamioesComponent ],
      imports: [HttpClientModule],
    })
    .compileComponents();

    fixture = TestBed.createComponent(CamioesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(async () => {

    localStorage.setItem('UserToken','');
      localStorage.setItem('Role','');
  });

  describe('#criarCamiao',()=> {

    it('criar camiao matricula null',() => {
      const msg = 'É necessário preencher todos os campos.';
      let spy = spyOn(window, 'alert')
      
      component.add('','12','13','14','15','16');
      expect(window.alert).toHaveBeenCalledWith(msg);
      
      expect(spy).toBeTruthy;
    });

    it('criar camiao matrícula formato errado',() => {
      const msg = 'Matricula com o formato inválido.';
      let spy = spyOn(window, 'alert')
      
      component.add('AA-002-OO','12','13','14','15','16');
      expect(window.alert).toHaveBeenCalledWith(msg);
      
      expect(spy).toBeTruthy;
    });
    
    //Testes Tara

    it('criar camiao tara null',() => {
      const msg = 'É necessário preencher todos os campos.';
      let spy = spyOn(window, 'alert')
      
      component.add('AA-02-OO','','13','14','15','16');
      expect(window.alert).toHaveBeenCalledWith(msg);
      
      expect(spy).toBeTruthy;
    });

    it('criar camiao tara<0',() => {
      const msg = 'Tara tem de ser um número maior que 0.';
      let spy = spyOn(window, 'alert')
      
      component.add('AA-02-OO','-2','13','14','15','16');
      expect(window.alert).toHaveBeenCalledWith(msg);
      
      expect(spy).toBeTruthy;
    });

    it('criar camiao tara=0',() => {
      const msg = 'Tara tem de ser um número maior que 0.';
      let spy = spyOn(window, 'alert')
      
      component.add('AA-02-OO','0','13','14','15','16');
      expect(window.alert).toHaveBeenCalledWith(msg);
      
      expect(spy).toBeTruthy;
    });

    it('criar camiao tara é string',() => {
      const msg = 'Tara tem de ser um número maior que 0.';
      let spy = spyOn(window, 'alert')
      
      component.add('AA-02-OO','ola','13','14','15','16');
      expect(window.alert).toHaveBeenCalledWith(msg);
      
      expect(spy).toBeTruthy;
    });

//Testes Capacidade

it('criar camiao capacidade null',() => {
  const msg = 'É necessário preencher todos os campos.';
  let spy = spyOn(window, 'alert')
  
  component.add('AA-02-OO','12','','14','15','16');
  expect(window.alert).toHaveBeenCalledWith(msg);
  
  expect(spy).toBeTruthy;
});

it('criar camiao capacidade<0',() => {
  const msg = 'Capacidade tem de ser um número maior que 0.';
  let spy = spyOn(window, 'alert')
  
  component.add('AA-02-OO','12','-13','14','15','16');
  expect(window.alert).toHaveBeenCalledWith(msg);
  
  expect(spy).toBeTruthy;
});

it('criar camiao capacidade=0',() => {
  const msg = 'Capacidade tem de ser um número maior que 0.';
  let spy = spyOn(window, 'alert')
  
  component.add('AA-02-OO','12','0','14','15','16');
  expect(window.alert).toHaveBeenCalledWith(msg);
  
  expect(spy).toBeTruthy;
});

it('criar camiao capacidade é string',() => {
  const msg = 'Capacidade tem de ser um número maior que 0.';
  let spy = spyOn(window, 'alert')
  
  component.add('AA-02-OO','12','ola','14','15','16');
  expect(window.alert).toHaveBeenCalledWith(msg);
  
  expect(spy).toBeTruthy;
});

//Testes Carga da Bateria

it('criar camiao cargaBateria null',() => {
  const msg = 'É necessário preencher todos os campos.';
  let spy = spyOn(window, 'alert')
  
  component.add('AA-02-OO','12','13','','15','16');
  expect(window.alert).toHaveBeenCalledWith(msg);
  
  expect(spy).toBeTruthy;
});

it('criar camiao cargaBateria<0',() => {
  const msg = 'A Carga da Bateria tem de ser um número maior que 0.';
  let spy = spyOn(window, 'alert')
  
  component.add('AA-02-OO','12','13','-14','15','16');
  expect(window.alert).toHaveBeenCalledWith(msg);
  
  expect(spy).toBeTruthy;
});

it('criar camiao cargaBateria=0',() => {
  const msg = 'A Carga da Bateria tem de ser um número maior que 0.';
  let spy = spyOn(window, 'alert')
  
  component.add('AA-02-OO','12','13','0','15','16');
  expect(window.alert).toHaveBeenCalledWith(msg);
  
  expect(spy).toBeTruthy;
});

it('criar camiao cargaBateria é string',() => {
  const msg = 'A Carga da Bateria tem de ser um número maior que 0.';
  let spy = spyOn(window, 'alert')
  
  component.add('AA-02-OO','12','13','ola','15','16');
  expect(window.alert).toHaveBeenCalledWith(msg);
  
  expect(spy).toBeTruthy;
});

//Testes Autonomia

it('criar camiao autonomia null',() => {
  const msg = 'É necessário preencher todos os campos.';
  let spy = spyOn(window, 'alert')
  
  component.add('AA-02-OO','12','13','14','','16');
  expect(window.alert).toHaveBeenCalledWith(msg);
  
  expect(spy).toBeTruthy;
});

it('criar camiao autonomia<0',() => {
  const msg = 'A Autonomia tem de ser um número maior que 0.';
  let spy = spyOn(window, 'alert')
  
  component.add('AA-02-OO','12','13','14','-15','16');
  expect(window.alert).toHaveBeenCalledWith(msg);
  
  expect(spy).toBeTruthy;
});

it('criar camiao autonomia=0',() => {
  const msg = 'A Autonomia tem de ser um número maior que 0.';
  let spy = spyOn(window, 'alert')
  
  component.add('AA-02-OO','12','13','14','0','16');
  expect(window.alert).toHaveBeenCalledWith(msg);
  
  expect(spy).toBeTruthy;
});

it('criar camiao autonomia é string',() => {
  const msg = 'A Autonomia tem de ser um número maior que 0.';
  let spy = spyOn(window, 'alert')
  
  component.add('AA-02-OO','12','13','14','ola','16');
  expect(window.alert).toHaveBeenCalledWith(msg);
  
  expect(spy).toBeTruthy;
});

//Testes Tempo de Carregamento Rápido

it('criar camiao tempoCarregamentoRapido null',() => {
  const msg = 'É necessário preencher todos os campos.';
  let spy = spyOn(window, 'alert')
  
  component.add('AA-02-OO','12','13','14','15','');
  expect(window.alert).toHaveBeenCalledWith(msg);
  
  expect(spy).toBeTruthy;
});

it('criar camiao tempoCarregamentoRapido<0',() => {
  const msg = 'Tempo de Carregamento Rápido tem de ser um número maior que 0.';
  let spy = spyOn(window, 'alert')
  
  component.add('AA-02-OO','12','13','14','15','-16');
  expect(window.alert).toHaveBeenCalledWith(msg);
  
  expect(spy).toBeTruthy;
});

it('criar camiao tempoCarregamentoRapido=0',() => {
  const msg = 'Tempo de Carregamento Rápido tem de ser um número maior que 0.';
  let spy = spyOn(window, 'alert')
  
  component.add('AA-02-OO','12','13','14','15','0');
  expect(window.alert).toHaveBeenCalledWith(msg);
  
  expect(spy).toBeTruthy;
});

it('criar camiao tempoCarregamentoRapido é string',() => {
  const msg = 'Tempo de Carregamento Rápido tem de ser um número maior que 0.';
  let spy = spyOn(window, 'alert')
  
  component.add('AA-02-OO','12','13','14','15','ola');
  expect(window.alert).toHaveBeenCalledWith(msg);
  
  expect(spy).toBeTruthy;
});
    
    
  });
  
});
