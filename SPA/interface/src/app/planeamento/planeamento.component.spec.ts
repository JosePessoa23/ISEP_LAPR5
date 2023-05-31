import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from "@angular/common/http";
import { PlaneamentoComponent } from './planeamento.component';

describe('PlaneamentoComponent', () => {
  let component: PlaneamentoComponent;
  let fixture: ComponentFixture<PlaneamentoComponent>;

  beforeEach(async () => {
    localStorage.setItem('UserToken','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImRiNDkwNzFiLTA2ZDctNDVmNS1hNWY1LTg0MzUzZTFhOWYwNyIsImVtYWlsIjoiZmFmYXJvY2FzQGdtYWlsLmNvbSIsInJvbGUiOiJHTCIsIm5hbWUiOiJQb2xpYW5kbyIsInBob25lTnVtYmVyIjp7InByb3BzIjp7InZhbHVlIjoxMjMzNTQ4NTl9fSwiZXhwIjoxNjgzMzM1MzYwLjkzNSwiaWF0IjoxNjcyOTcwOTYwfQ.xpsjmD2y0e4mGrTiR-acqFP8q6iW3xpDL3EwP-7U588');
    localStorage.setItem('Role','GL');
    await TestBed.configureTestingModule({
      declarations: [ PlaneamentoComponent ],
      imports: [HttpClientModule],
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlaneamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(async () => {
    localStorage.setItem('UserToken','');
      localStorage.setItem('Role','');
});

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#getPlaneamento',()=> {

    it('inserir data null',() => {
      const msg = 'É necessário preencher todos os campos.';
      let spy = spyOn(window, 'alert')
      
      component.getPlaneamento('','1');
      expect(window.alert).toHaveBeenCalledWith(msg);
      
      expect(spy).toBeTruthy;
    });

    it('inserir data formato errado',() => {
      const msg = 'Data deve seguir o formato yyyyMMdd.';
      let spy = spyOn(window, 'alert')
      
      component.getPlaneamento('1234','1');
      expect(window.alert).toHaveBeenCalledWith(msg);
      
      expect(spy).toBeTruthy;
    });
    
    //Testes Tara

    it('nao escolher value tara null',() => {
      const msg = 'É necessário escolher uma opção.';
      let spy = spyOn(window, 'alert')
      
      component.getPlaneamento('20221205','');
      expect(window.alert).toHaveBeenCalledWith(msg);
      
      expect(spy).toBeTruthy;
    });
  });
});
