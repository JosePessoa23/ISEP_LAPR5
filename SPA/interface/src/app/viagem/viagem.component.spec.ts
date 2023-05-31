import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViagemComponent } from './viagem.component';

describe('ViagemComponent', () => {
  let component: ViagemComponent;
  let fixture: ComponentFixture<ViagemComponent>;

  beforeEach(async () => {
    localStorage.setItem('UserToken','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImRiNDkwNzFiLTA2ZDctNDVmNS1hNWY1LTg0MzUzZTFhOWYwNyIsImVtYWlsIjoiZmFmYXJvY2FzQGdtYWlsLmNvbSIsInJvbGUiOiJHTCIsIm5hbWUiOiJQb2xpYW5kbyIsInBob25lTnVtYmVyIjp7InByb3BzIjp7InZhbHVlIjoxMjMzNTQ4NTl9fSwiZXhwIjoxNjgzMzM1MzYwLjkzNSwiaWF0IjoxNjcyOTcwOTYwfQ.xpsjmD2y0e4mGrTiR-acqFP8q6iW3xpDL3EwP-7U588');
    localStorage.setItem('Role','GL');
    await TestBed.configureTestingModule({
      declarations: [ ViagemComponent ],
      imports: [HttpClientModule],
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(async () => {
    localStorage.setItem('UserToken','');
      localStorage.setItem('Role','');
  });


    it('criar viagem null',()=> {
      const msg = 'É necessário preencher todos os campos.';
      let spy = spyOn(window, 'alert')
      
      component.addViagem('','','','','','');
      expect(window.alert).toHaveBeenCalledWith(msg);
      
      expect(spy).toBeTruthy;
    });

    it('criar viagem email formato errado',()=> {
      const msg = 'Data deve seguir o formato yyyyMMdd.';
      let spy = spyOn(window, 'alert')
      
      component.addViagem('22222222A','3','3','50','50','1');
      expect(window.alert).toHaveBeenCalledWith(msg);
      
      expect(spy).toBeTruthy;
    });

    it('criar viagem pc superior a 100',()=> {
      const msg = 'A Probabilidade de cruzamento tem de ser um número maior que 0 e menor ou igual a 100.';
      let spy = spyOn(window, 'alert')
      
      component.addViagem('22222222','3','3','101','50','1');
      expect(window.alert).toHaveBeenCalledWith(msg);
      
      expect(spy).toBeTruthy;
    });

    it('criar viagem número de gerações menor que 0',()=> {
      const msg = 'O número de gerações tem de ser maior que 0.';
      let spy = spyOn(window, 'alert')
      
      component.addViagem('22222222','-3','3','101','50','1');
      expect(window.alert).toHaveBeenCalledWith(msg);
      
      expect(spy).toBeTruthy;
    });

    
});
