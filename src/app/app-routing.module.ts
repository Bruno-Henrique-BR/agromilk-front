import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NavComponent } from './components/nav/nav.component';

import { RacaCreateComponent } from './components/raca/raca-create/raca-create.component';
import { RacaDeleteComponent } from './components/raca/raca-delete/raca-delete.component';
import { RacaListComponent } from './components/raca/raca-list/raca-list.component';
import { RacaUpdateComponent } from './components/raca/raca-update/raca-update.component';
import { LoteCreateComponent } from './components/lote/lote-create/lote-create.component';
import { LoteDeleteComponent } from './components/lote/lote-delete/lote-delete.component';
import { LoteListComponent } from './components/lote/lote-list/lote-list.component';
import { LoteUpdateComponent } from './components/lote/lote-update/lote-update.component';
import { LoteAnimalComponent } from './components/lote/lote-animal/lote-animal.component';
import { AnimalCreateComponent } from './components/animal/animal-create/animal-create.component';
import { AnimalDeleteComponent } from './components/animal/animal-delete/animal-delete.component';
import { AnimalListComponent } from './components/animal/animal-list/animal-list.component';
import { AnimalUpdateComponent } from './components/animal/animal-update/animal-update.component';
import { TanqueListComponent } from './components/tanque/tanque-list/tanque-list.component';
import { TanqueCreateComponent } from './components/tanque/tanque-create/tanque-create.component';
import { TanqueUpdateComponent } from './components/tanque/tanque-update/tanque-update.component';
import { TanqueDeleteComponent } from './components/tanque/tanque-delete/tanque-delete.component';
import { OrdenhaListComponent } from './components/ordenha/ordenha-list/ordenha-list.component';
import { OrdenhaCreateComponent } from './components/ordenha/ordenha-create/ordenha-create.component';
import { OrdenhaDeleteComponent } from './components/ordenha/ordenha-delete/ordenha-delete.component';
import { LaticinioListComponent } from './components/laticinio/laticinio-list/laticinio-list.component';
import { LaticinioCreateComponent } from './components/laticinio/laticinio-create/laticinio-create.component';
import { LaticinioDeleteComponent } from './components/laticinio/laticinio-delete/laticinio-delete.component';
import { LaticinioUpdateComponent } from './components/laticinio/laticinio-update/laticinio-update.component';
import { FuncionarioListComponent } from './components/funcionario/funcionario-list/funcionario-list.component';
import { FuncionarioCreateComponent } from './components/funcionario/funcionario-create/funcionario-create.component';
import { FuncionarioDeleteComponent } from './components/funcionario/funcionario-delete/funcionario-delete.component';
import { FuncionarioUpdateComponent } from './components/funcionario/funcionario-update/funcionario-update.component';
import { ColetaListComponent } from './components/coleta/coleta-list/coleta-list.component';
import { ColetaDeleteComponent } from './components/coleta/coleta-delete/coleta-delete.component';
import { ColetaCreateComponent } from './components/coleta/coleta-create/coleta-create.component';
import { LoginComponent } from './login/login-component';
import { AuthGuard } from './guard/auth.guard';
import { OrdenhaUpdateComponent } from './components/ordenha/ordenha-update/ordenha-update.component';
import { ColetaUpdateComponent } from './components/coleta/coleta-update/coleta-update.component';
import { LoteGerenciarComponent } from './components/lote/gerenciamento-lote/lote-gerenciar.component';
import { AnimalHistoricoComponent } from './components/animal/animal-historico/animal-historico.component';

const routes: Routes = [
  {
    path: '', component: NavComponent, canActivate: [AuthGuard], children:
      [
      { path: 'home', component: HomeComponent },

      { path: 'raca', component: RacaListComponent },
      { path: 'raca/create', component: RacaCreateComponent },
      { path: 'raca/update/:idRaca', component: RacaUpdateComponent },
      { path: 'raca/delete/:idRaca', component: RacaDeleteComponent },

      { path: 'lote', component: LoteListComponent },
      { path: 'lote/listar/:idLote', component: LoteAnimalComponent },
      { path: 'lote/create', component: LoteCreateComponent },
      { path: 'lote/update/:idLote', component: LoteUpdateComponent },
      { path: 'lote/delete/:idLote', component: LoteDeleteComponent },
      { path: 'lote/listar/:idLote/gerenciar', component: LoteGerenciarComponent },


      { path: 'animal', component: AnimalListComponent },
      { path: 'animal/create', component: AnimalCreateComponent },
      { path: 'animal/delete/:idAnimal', component: AnimalDeleteComponent },
      { path: 'animal/update/:idAnimal', component: AnimalUpdateComponent },
      { path: 'animal/historico/:idAnimal', component: AnimalHistoricoComponent },


      { path: 'tanque', component: TanqueListComponent },
      { path: 'tanque/create', component: TanqueCreateComponent },
      { path: 'tanque/update/:idTanque', component: TanqueUpdateComponent },
      { path: 'tanque/delete/:idTanque', component: TanqueDeleteComponent },


      { path: 'ordenha', component: OrdenhaListComponent },
      { path: 'ordenha/create', component: OrdenhaCreateComponent },
      { path: 'ordenha/delete/:idOrdenha', component: OrdenhaDeleteComponent },
      { path: 'ordenha/update/:idOrdenha', component: OrdenhaUpdateComponent },

      { path: 'laticinio', component: LaticinioListComponent },
      { path: 'laticinio/create', component: LaticinioCreateComponent },
      { path: 'laticinio/delete/:idLaticinio', component: LaticinioDeleteComponent },
      { path: 'laticinio/update/:idLaticinio', component: LaticinioUpdateComponent },

      { path: 'funcionario', component: FuncionarioListComponent },
      { path: 'funcionario/create', component: FuncionarioCreateComponent },
      { path: 'funcionario/delete/:idFuncionario', component: FuncionarioDeleteComponent },
      { path: 'funcionario/update/:idFuncionario', component: FuncionarioUpdateComponent },

      { path: 'coleta', component: ColetaListComponent },
      { path: 'coleta/create', component: ColetaCreateComponent},
      { path: 'coleta/delete/:idColeta', component: ColetaDeleteComponent },
      { path: 'coleta/update/:idColeta', component: ColetaUpdateComponent },

    ]
  },
  {
    path: 'login',
    component: LoginComponent
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
