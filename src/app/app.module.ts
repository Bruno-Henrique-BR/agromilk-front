import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Para trabalhar com formulários no Angular 12
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

// Para realizar requisições HTTP
import { HttpClientModule } from '@angular/common/http';

// Imports para componentes do Angular Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { TextMaskModule } from 'angular2-text-mask';
import { MAT_DATE_LOCALE } from '@angular/material/core'
import { MatExpansionModule } from '@angular/material/expansion';
import { MatOptionModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSnackBarModule } from '@angular/material/snack-bar';
// Componentes do projeto
import { NavComponent } from './components/nav/nav.component'; NavComponent
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { ToastrModule } from 'ngx-toastr';
import { AuthInterceptorProvider } from './interceptors/auth.interceptor';
import { NgxMaskModule } from 'ngx-mask';
import { RacaListComponent } from './components/raca/raca-list/raca-list.component';
import { RacaCreateComponent } from './components/raca/raca-create/raca-create.component';
import { RacaDeleteComponent } from './components/raca/raca-delete/raca-delete.component';
import { RacaUpdateComponent } from './components/raca/raca-update/raca-update.component';
import { LoteCreateComponent } from './components/lote/lote-create/lote-create.component';
import { LoteListComponent } from './components/lote/lote-list/lote-list.component';
import { LoteDeleteComponent } from './components/lote/lote-delete/lote-delete.component';
import { LoteUpdateComponent } from './components/lote/lote-update/lote-update.component';
import { LoteAnimalComponent } from './components/lote/lote-animal/lote-animal.component';
import { AnimalCreateComponent } from './components/animal/animal-create/animal-create.component';
import { AnimalListComponent } from './components/animal/animal-list/animal-list.component';
import { AnimalDeleteComponent } from './components/animal/animal-delete/animal-delete.component';
import { AnimalUpdateComponent } from './components/animal/animal-update/animal-update.component';
import { TanqueCreateComponent } from './components/tanque/tanque-create/tanque-create.component';
import { TanqueListComponent } from './components/tanque/tanque-list/tanque-list.component';
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
import { OrdenhaUpdateComponent } from './components/ordenha/ordenha-update/ordenha-update.component';
import { ColetaUpdateComponent } from './components/coleta/coleta-update/coleta-update.component';
import { LoteGerenciarComponent } from './components/lote/gerenciamento-lote/lote-gerenciar.component';
import { AnimalHistoricoComponent } from './components/animal/animal-historico/animal-historico.component';
@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    HeaderComponent,
    RacaListComponent,
    RacaCreateComponent,
    RacaUpdateComponent,
    RacaDeleteComponent,
    LoteCreateComponent,
    LoteListComponent,
    LoteDeleteComponent,
    LoteUpdateComponent,
    LoteAnimalComponent,
    LoteGerenciarComponent,
    AnimalCreateComponent,
    AnimalListComponent,
    AnimalDeleteComponent,
    AnimalUpdateComponent,
    AnimalHistoricoComponent,
    TanqueCreateComponent,
    TanqueListComponent,
    TanqueUpdateComponent,
    TanqueDeleteComponent,
    OrdenhaListComponent,
    OrdenhaCreateComponent,
    OrdenhaDeleteComponent,
    OrdenhaUpdateComponent,
    LaticinioListComponent,
    LaticinioCreateComponent,
    LaticinioDeleteComponent,
    LaticinioUpdateComponent,
    FuncionarioListComponent,
    FuncionarioCreateComponent,
    FuncionarioDeleteComponent,
    FuncionarioUpdateComponent,
    ColetaListComponent,
    ColetaDeleteComponent,
    ColetaCreateComponent,
    ColetaUpdateComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    // Forms
    FormsModule,
    ReactiveFormsModule,
    // Requisições http
    HttpClientModule,
    // Angular Material
    MatFormFieldModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatSelectModule,
    MatInputModule,
    MatRadioModule,
    MatTableModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    TextMaskModule,
    MatExpansionModule,
    FormsModule,
    MatOptionModule,
    MatDialogModule,
    MatGridListModule,
    MatSnackBarModule,
    ToastrModule.forRoot({
      timeOut: 4000,
      closeButton: true,
      progressBar: true
    }),
    NgxMaskModule.forRoot()
  ],
  providers: [AuthInterceptorProvider, { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }],

  bootstrap: [AppComponent]
})
export class AppModule { }


