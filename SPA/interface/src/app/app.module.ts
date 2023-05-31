import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { CamiaoDetailComponent } from './camiao-detail/camiao-detail.component';
import { CamioesComponent } from './camioes/camioes.component';
import { MessagesComponent} from './messages/messages.component';
import { EntregaComponent } from './entrega/entrega.component';
import { EntregaDetailComponent } from './entrega-detail/entrega-detail.component'
import { ArmazemComponent } from './armazem/armazem.component';
import { ArmazemDetailComponent } from './armazem-detail/armazem-detail.component'
import { RotaComponent } from './rota/rota.component';
import { RotaDetailComponent } from './rota-detail/rota-detail.component';
import { RedeViariaComponent } from './rede-viaria/rede-viaria.component';
import { PlaneamentoComponent } from './planeamento/planeamento.component';
import { ViagemComponent } from './viagem/viagem.component';
import { ViagemDetailComponent } from './viagem-detail/viagem-detail.component';
import { CreateAccComponent } from './create-acc/create-acc.component';
import { LogoutComponent } from './logout/logout.component';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  declarations: [
    AppComponent,
    CamioesComponent,
    CamiaoDetailComponent,
    MessagesComponent,
    EntregaComponent,
    EntregaDetailComponent,
    RotaComponent,
    RotaDetailComponent,
    RedeViariaComponent,
    ArmazemComponent,
    ArmazemDetailComponent,
    PlaneamentoComponent,
    ViagemComponent,
    ViagemDetailComponent,
    CreateAccComponent,
    LogoutComponent,
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
