import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { CamioesComponent } from './camioes/camioes.component';
import { CamiaoDetailComponent } from './camiao-detail/camiao-detail.component';
import { EntregaComponent } from './entrega/entrega.component';
import { EntregaDetailComponent } from './entrega-detail/entrega-detail.component';
import { RotaComponent } from './rota/rota.component';
import { RotaDetailComponent } from './rota-detail/rota-detail.component';
import { RedeViariaComponent } from './rede-viaria/rede-viaria.component';
import { ArmazemComponent } from './armazem/armazem.component';
import { ArmazemDetailComponent } from './armazem-detail/armazem-detail.component';
import { PlaneamentoComponent } from './planeamento/planeamento.component';
import { ViagemComponent } from './viagem/viagem.component';
import { ViagemDetailComponent } from './viagem-detail/viagem-detail.component';
import { CreateAccComponent } from './create-acc/create-acc.component';
import { LogoutComponent } from './logout/logout.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'camioes/detail/:id', component: CamiaoDetailComponent },
  { path: 'camioes', component: CamioesComponent },
  { path: 'rede-viaria', component: RedeViariaComponent },
  { path: 'entregas', component: EntregaComponent },
  { path: 'entregas/detail/:id', component: EntregaDetailComponent },
  { path: 'rotas', component: RotaComponent },
  { path: 'rotas/detail/:idPartida/:idChegada', component: RotaDetailComponent },
  { path: 'armazens/detail/:id', component: ArmazemDetailComponent },
  { path: 'armazens', component: ArmazemComponent },
  { path: 'planeamento', component: PlaneamentoComponent },
  { path: 'viagem', component: ViagemComponent },
  { path: 'viagens/detail/:camiao/:data', component: ViagemDetailComponent },
  { path: 'create-acc', component: CreateAccComponent },
  { path: 'logout', component: LogoutComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}