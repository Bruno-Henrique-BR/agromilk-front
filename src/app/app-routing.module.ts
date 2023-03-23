import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChamadoCreateComponent } from './components/chamado/chamado-create/chamado-create.component';
import { ChamadoListComponent } from './components/chamado/chamado-list/chamado-list.component';
import { ChamadoReadComponent } from './components/chamado/chamado-read/chamado-read.component';
import { ChamadoUpdateComponent } from './components/chamado/chamado-update/chamado-update.component';
import { ClienteCreateComponent } from './components/cliente/cliente-create/cliente-create.component';
import { ClienteDeleteComponent } from './components/cliente/cliente-delete/cliente-delete.component';
import { ClienteListComponent } from './components/cliente/cliente-list/cliente-list.component';
import { ClienteUpdateComponent } from './components/cliente/cliente-update/cliente-update.component';
import { HomeComponent } from './components/home/home.component';
import { NavComponent } from './components/nav/nav.component';
import { TecnicoCreateComponent } from './components/tecnico/tecnico-create/tecnico-create.component';
import { TecnicoDeleteComponent } from './components/tecnico/tecnico-delete/tecnico-delete.component';
import { TecnicoListComponent } from './components/tecnico/tecnico-list/tecnico-list.component';
import { TecnicoUpdateComponent } from './components/tecnico/tecnico-update/tecnico-update.component';
import { RacaCreateComponent } from './components/raca/raca-create/raca-create.component';
import { RacaDeleteComponent } from './components/raca/raca-delete/raca-delete.component';
import { RacaListComponent } from './components/raca/raca-list/raca-list.component';
import { RacaUpdateComponent } from './components/raca/raca-update/raca-update.component';
import { LoteCreateComponent } from './components/lote/lote-create/lote-create.component';
import { LoteDeleteComponent } from './components/lote/lote-delete/lote-delete.component';
import { LoteListComponent } from './components/lote/lote-list/lote-list.component';
import { LoteUpdateComponent } from './components/lote/lote-update/lote-update.component';
import { AnimalCreateComponent } from './components/animal/animal-create/animal-create.component';
import { AnimalDeleteComponent } from './components/animal/animal-delete/animal-delete.component';
import { AnimalListComponent } from './components/animal/animal-list/animal-list.component';
import { AnimalUpdateComponent } from './components/animal/animal-update/animal-update.component';
import { TanqueListComponent } from './components/tanque/tanque-list/tanque-list.component';
import { TanqueCreateComponent } from './components/tanque/tanque-create/tanque-create.component';
import { TanqueUpdateComponent } from './components/tanque/tanque-update/tanque-update.component';
const routes: Routes = [
  {
    path: '', component: NavComponent,  children: [
      { path: 'home', component: HomeComponent },

      { path: 'tecnicos',            component:   TecnicoListComponent },
      { path: 'tecnicos/create',     component: TecnicoCreateComponent },
      { path: 'tecnicos/update/:id', component: TecnicoUpdateComponent },
      { path: 'tecnicos/delete/:id', component: TecnicoDeleteComponent },

      { path: 'clientes',            component:   ClienteListComponent },
      { path: 'clientes/create',     component: ClienteCreateComponent },
      { path: 'clientes/update/:id', component: ClienteUpdateComponent },
      { path: 'clientes/delete/:id', component: ClienteDeleteComponent },

      { path: 'chamados',                       component:     ChamadoListComponent },
      { path: 'chamados/create',                component:   ChamadoCreateComponent },
      { path: 'chamados/update/:id',            component:   ChamadoUpdateComponent },
      { path: 'chamados/read/:id',              component:     ChamadoReadComponent },

      { path: 'raca',            component:  RacaListComponent },
      { path: 'raca/create',     component: RacaCreateComponent },
      { path: 'raca/update/:idRaca', component: RacaUpdateComponent },
      { path: 'raca/delete/:idRaca', component: RacaDeleteComponent },

      { path: 'lote',            component:  LoteListComponent },
      { path: 'lote/create',     component: LoteCreateComponent },
      { path: 'lote/update/:idLote', component: LoteUpdateComponent },
      { path: 'lote/delete/:idLote', component: LoteDeleteComponent },

      { path: 'animal',            component:  AnimalListComponent },
      { path: 'animal/create',     component: AnimalCreateComponent },
      { path: 'animal/update/:idAnimal', component: AnimalUpdateComponent },
      { path: 'animal/delete/:idAnimal', component: AnimalDeleteComponent },

      { path: 'tanque',            component:  TanqueListComponent },
      { path: 'tanque/create',     component: TanqueCreateComponent },
      { path: 'tanque/update/:idTanque', component: TanqueUpdateComponent },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
