import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RotaComponent } from './rota.component';
import { throwError } from 'rxjs'; // make sure to import the throwError from rxjs
import { Rota } from '../dto/rota';
import { RotaService } from '../services/rota.service';


describe('RotaComponent', () => {
  let component: RotaComponent;
  let fixture: ComponentFixture<RotaComponent>;

  beforeEach(async () => {
    localStorage.setItem('UserToken','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImRiNDkwNzFiLTA2ZDctNDVmNS1hNWY1LTg0MzUzZTFhOWYwNyIsImVtYWlsIjoiZmFmYXJvY2FzQGdtYWlsLmNvbSIsInJvbGUiOiJHTCIsIm5hbWUiOiJQb2xpYW5kbyIsInBob25lTnVtYmVyIjp7InByb3BzIjp7InZhbHVlIjoxMjMzNTQ4NTl9fSwiZXhwIjoxNjgzMzM1MzYwLjkzNSwiaWF0IjoxNjcyOTcwOTYwfQ.xpsjmD2y0e4mGrTiR-acqFP8q6iW3xpDL3EwP-7U588');
    localStorage.setItem('Role','GL');
    await TestBed.configureTestingModule({
      declarations: [ RotaComponent ],
      imports: [HttpClientModule],
    })
    .compileComponents();

    fixture = TestBed.createComponent(RotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(async () => {
    localStorage.setItem('UserToken','');
      localStorage.setItem('Role','');
});

  describe('#criarRota',()=> {

    it('criar rota erro distancia null',()=> {
      const msg = 'É necessário preencher todos os campos.';
      let spy = spyOn(window, 'alert')
      
      component.add('Matosinhos','Arouca','','60','134','10');
      expect(window.alert).toHaveBeenCalledWith(msg);
      
      expect(spy).toBeTruthy;
    });

    it('criar rota erro distancia <0',()=> {
      const msg = 'Obrigatório campo Distância da rota maior que 0!!';
      let spy = spyOn(window, 'alert')
      
      component.add('Matosinhos','Arouca','-4','60','134','10');
      expect(window.alert).toHaveBeenCalledWith(msg);
      
      expect(spy).toBeTruthy;
    });

    it('criar rota erro distancia =0',()=> {
      const msg = 'Obrigatório campo Distância da rota maior que 0!!';
      let spy = spyOn(window, 'alert')
      
      component.add('Matosinhos','Arouca','0','60','134','10');
      expect(window.alert).toHaveBeenCalledWith(msg);
      
      expect(spy).toBeTruthy;
    });

    it('criar rota erro distancia é string',() => {
      const msg = 'Obrigatório campo Distância da rota maior que 0!!';
      let spy = spyOn(window, 'alert')
      
      component.add('Matosinhos','Arouca','dez','60','134','10');
      expect(window.alert).toHaveBeenCalledWith(msg);
    
      expect(spy).toBeTruthy;
    });

    it('criar rota erro tempo viagem cheio null',()=> {
      const msg = 'É necessário preencher todos os campos.';
      let spy = spyOn(window, 'alert')
      
      component.add('Matosinhos','Arouca','40','','134','10');
      expect(window.alert).toHaveBeenCalledWith(msg);
      
      expect(spy).toBeTruthy;
    });

    it('criar rota erro tempo viagem cheio <0',()=> {
      const msg = 'Obrigatório campo tempo viagem cheio da rota maior que 0!!';
      let spy = spyOn(window, 'alert')
      
      component.add('Matosinhos','Arouca','40','-4','134','10');
      expect(window.alert).toHaveBeenCalledWith(msg);
      
      expect(spy).toBeTruthy;
    });

    it('criar rota erro tempo viagem cheio =0',()=> {
      const msg = 'Obrigatório campo tempo viagem cheio da rota maior que 0!!';
      let spy = spyOn(window, 'alert')
      
      component.add('Matosinhos','Arouca','40','0','134','10');
      expect(window.alert).toHaveBeenCalledWith(msg);
      
      expect(spy).toBeTruthy;
    });

    it('criar rota erro tempo viagem cheio é string',() => {
      const msg = 'Obrigatório campo tempo viagem cheio da rota maior que 0!!';
      let spy = spyOn(window, 'alert')
      
      component.add('Matosinhos','Arouca','40','vinte','134','10');
      expect(window.alert).toHaveBeenCalledWith(msg);
    
      expect(spy).toBeTruthy;
    });

    it('criar rota erro energia gasta null',()=> {
      const msg = 'É necessário preencher todos os campos.';
      let spy = spyOn(window, 'alert')
      
      component.add('Matosinhos','Arouca','40','60','','10');
      expect(window.alert).toHaveBeenCalledWith(msg);
      
      expect(spy).toBeTruthy;
    });

    it('criar rota erro energia gasta <0',()=> {
      const msg = 'Obrigatório campo energia gasta da rota maior que 0!!';
      let spy = spyOn(window, 'alert')
      
      component.add('Matosinhos','Arouca','40','60','-4','10');
      expect(window.alert).toHaveBeenCalledWith(msg);
      
      expect(spy).toBeTruthy;
    });

    it('criar rota erro energia gasta =0',()=> {
      const msg = 'Obrigatório campo energia gasta da rota maior que 0!!';
      let spy = spyOn(window, 'alert')
      
      component.add('Matosinhos','Arouca','40','60','0','10');
      expect(window.alert).toHaveBeenCalledWith(msg);
      
      expect(spy).toBeTruthy;
    });

    it('criar rota erro energia gasta é string',() => {
      const msg = 'Obrigatório campo energia gasta da rota maior que 0!!';
      let spy = spyOn(window, 'alert')
      
      component.add('Matosinhos','Arouca','40','60','vinte','10');
      expect(window.alert).toHaveBeenCalledWith(msg);
    
      expect(spy).toBeTruthy;
    });

    it('criar rota erro tempo carregamento extra null',()=> {
      const msg = 'É necessário preencher todos os campos.';
      let spy = spyOn(window, 'alert')
      
      component.add('Matosinhos','Arouca','40','60','134','');
      expect(window.alert).toHaveBeenCalledWith(msg);
      
      expect(spy).toBeTruthy;
    });

    it('criar rota erro tempo carregamento extra <0',()=> {
      const msg = 'Obrigatório campo tempo carregamento extra da rota positivo!!';
      let spy = spyOn(window, 'alert')
      
      component.add('Matosinhos','Arouca','40','60','134','-4');
      expect(window.alert).toHaveBeenCalledWith(msg);
      
      expect(spy).toBeTruthy;
    });

    it('criar rota erro tempo carregamento extra é string',() => {
      const msg = 'Obrigatório campo tempo carregamento extra da rota positivo!!';
      let spy = spyOn(window, 'alert')
      
      component.add('Matosinhos','Arouca','40','60','134','dez');
      expect(window.alert).toHaveBeenCalledWith(msg);
    
      expect(spy).toBeTruthy;
    });
  
  });

});

