import { HttpClientModule } from "@angular/common/http";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { EntregaComponent } from "./entrega.component";

describe('EntregaComponent', () => {
    let component: EntregaComponent;
    let fixture: ComponentFixture<EntregaComponent>;
  
    beforeEach(async () => {
      localStorage.setItem('UserToken','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImRiNDkwNzFiLTA2ZDctNDVmNS1hNWY1LTg0MzUzZTFhOWYwNyIsImVtYWlsIjoiZmFmYXJvY2FzQGdtYWlsLmNvbSIsInJvbGUiOiJHQSIsIm5hbWUiOiJQb2xpYW5kbyIsInBob25lTnVtYmVyIjp7InByb3BzIjp7InZhbHVlIjoxMjMzNTQ4NTl9fSwiZXhwIjoxNjgzMzM1MjU2Ljg5OCwiaWF0IjoxNjcyOTcwODU2fQ.8YBJkws6QIX9Kqhx-W5YLwkgbtSrD8L94_5sO0Fm2GQ');
    localStorage.setItem('Role','GA');
      await TestBed.configureTestingModule({
        declarations: [ EntregaComponent ],
        imports: [HttpClientModule],
      })
      .compileComponents();
  
      fixture = TestBed.createComponent(EntregaComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    afterEach(async () => {
      localStorage.setItem('UserToken','');
      localStorage.setItem('Role','');
    });
  
    describe('#criarEntrega',()=> {
    
  
      it('criar entrega id armazém null',() => {
        const msg = 'É necessário preencher todos os campos.';
        let spy = spyOn(window, 'alert')
        
        component.add('','30','30','20220801','200');
        expect(window.alert).toHaveBeenCalledWith(msg);
        
        expect(spy).toBeTruthy;
      });
  
      it('criar entrega id armazem formato errado',() => {
        const msg = 'Id do armazém tem de ser um número com 3 algarismos.';
        let spy = spyOn(window, 'alert')
        
        component.add('1','30','30','20220801','200');
        expect(window.alert).toHaveBeenCalledWith(msg);
        
        expect(spy).toBeTruthy;
      });
      
  
      //Tempo de carregamento
      it('criar entrega tempo de carregamento null',() => {
        const msg = 'É necessário preencher todos os campos.';
        let spy = spyOn(window, 'alert')
        
        component.add('001','','30','20220801','200');
        expect(window.alert).toHaveBeenCalledWith(msg);
        
        expect(spy).toBeTruthy;
      });
  
      it('criar entrega tempo de carregamento < 0',() => {
        const msg = 'Tempo de Carregamento tem de ser um número maior do que 0.';
        let spy = spyOn(window, 'alert')
        
        component.add('001','-30','30','20220801','200');
        expect(window.alert).toHaveBeenCalledWith(msg);
        
        expect(spy).toBeTruthy;
      });
  
      it('criar entrega tempo de carregamento=0',() => {
        const msg = 'Tempo de Carregamento tem de ser um número maior do que 0.';
        let spy = spyOn(window, 'alert')
        
        component.add('001','0','30','20220801','200');
        expect(window.alert).toHaveBeenCalledWith(msg);
        
        expect(spy).toBeTruthy;
      });
  
      it('criar entrega tempo de carregamento é string',() => {
        const msg = 'Tempo de Carregamento tem de ser um número maior do que 0.';
        let spy = spyOn(window, 'alert')
        
        component.add('001','abc','30','20220801','200');
        expect(window.alert).toHaveBeenCalledWith(msg);
        
        expect(spy).toBeTruthy;
      });


      //Tempo de descarga
      it('criar entrega tempo de descarregamento null',() => {
        const msg = 'É necessário preencher todos os campos.';
        let spy = spyOn(window, 'alert')
        
        component.add('001','30','','20220801','200');
        expect(window.alert).toHaveBeenCalledWith(msg);
        
        expect(spy).toBeTruthy;
      });
  
      it('criar entrega tempo de descarregamento < 0',() => {
        const msg = 'Tempo de Descarga tem de ser um número maior do que 0.';
        let spy = spyOn(window, 'alert')
        
        component.add('001','30','-30','20220801','200');
        expect(window.alert).toHaveBeenCalledWith(msg);
        
        expect(spy).toBeTruthy;
      });
  
      it('criar entrega tempo de descarregamento=0',() => {
        const msg = 'Tempo de Descarga tem de ser um número maior do que 0.';
        let spy = spyOn(window, 'alert')
        
        component.add('001','30','0','20220801','200');
        expect(window.alert).toHaveBeenCalledWith(msg);
        
        expect(spy).toBeTruthy;
      });
  
      it('criar entrega tempo de descarregamento é string',() => {
        const msg = 'Tempo de Descarga tem de ser um número maior do que 0.';
        let spy = spyOn(window, 'alert')
        
        component.add('001','30','abc','20220801','200');
        expect(window.alert).toHaveBeenCalledWith(msg);
        
        expect(spy).toBeTruthy;
      });


      //Data
      it('criar entrega data null',() => {
        const msg = 'É necessário preencher todos os campos.';
        let spy = spyOn(window, 'alert')
        
        component.add('001','30','30','','200');
        expect(window.alert).toHaveBeenCalledWith(msg);
        
        expect(spy).toBeTruthy;
      });
  
      it('criar entrega data diferente de yyyyMMdd',() => {
        const msg = 'Data deve seguir o formato yyyyMMdd.';
        let spy = spyOn(window, 'alert')
        
        component.add('001','30','30','220801','200');
        expect(window.alert).toHaveBeenCalledWith(msg);
        
        expect(spy).toBeTruthy;
      });
  
      it('criar entrega data é string',() => {
        const msg = 'Data deve seguir o formato yyyyMMdd.';
        let spy = spyOn(window, 'alert')
        
        component.add('001','30','30','abcdefgh','200');
        expect(window.alert).toHaveBeenCalledWith(msg);
        
        expect(spy).toBeTruthy;
      });
  
      
      //Peso
      it('criar entrega peso null',() => {
        const msg = 'É necessário preencher todos os campos.';
        let spy = spyOn(window, 'alert')
        
        component.add('001','30','30','20220801','');
        expect(window.alert).toHaveBeenCalledWith(msg);
        
        expect(spy).toBeTruthy;
      });
  
      it('criar entrega peso < 0',() => {
        const msg = 'Peso deve ser maior do que 0.';
        let spy = spyOn(window, 'alert')
        
        component.add('001','30','30','20220801','-200');
        expect(window.alert).toHaveBeenCalledWith(msg);
        
        expect(spy).toBeTruthy;
      });
  
      it('criar entrega peso=0',() => {
        const msg = 'Peso deve ser maior do que 0.';
        let spy = spyOn(window, 'alert')
        
        component.add('001','30','30','20220801','0');
        expect(window.alert).toHaveBeenCalledWith(msg);
        
        expect(spy).toBeTruthy;
      });
  
      it('criar entrega peso é string',() => {
        const msg = 'Peso deve ser maior do que 0.';
        let spy = spyOn(window, 'alert')
        
        component.add('001','30','30','20220801','abc');
        expect(window.alert).toHaveBeenCalledWith(msg);
        
        expect(spy).toBeTruthy;
      });
      
    });
});