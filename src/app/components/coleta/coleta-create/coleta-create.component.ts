import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl, } from '@angular/forms';
import { Router } from '@angular/router';

import { Tanque } from 'src/app/models/tanque';
import { TanqueService } from 'src/app/services/tanque.service';
import { OrdenhaService } from 'src/app/services/ordenha.service';
import { AnimalService } from 'src/app/services/animal.service';
import { ToastrService } from 'ngx-toastr';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { debounceTime, distinctUntilChanged, map, startWith, switchMap } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { Coleta } from 'src/app/models/coleta';
import { LaticinioService } from 'src/app/services/laticinio.service';
import { ColetaService } from 'src/app/services/coleta.service';
import * as moment from 'moment';
@Component({
  selector: 'app-coleta-create',
  templateUrl: './coleta-create.component.html',
  styleUrls: ['./coleta-create.component.css']
})
export class ColetaCreateComponent implements OnInit {

  tanques: Tanque[] = [];
  laticinios: any[] = [];
  coleta: Coleta = {
    data: '',
    quantidade: 0,
    idTanque: 0,
    tanque: undefined,
    laticinio: undefined,
    razaoSocial: '',
    modeloTanque: '',
    idLaticinio: 0
  };

  data: FormControl = new FormControl(null, [Validators.required]);
  quantidade: FormControl = new FormControl(null, [Validators.required]);
  idLaticinio: FormControl = new FormControl(null, [Validators.required]);
  idTanque: FormControl = new FormControl(null, [Validators.required]);

  animalControl = new FormControl();

  constructor(
    private service: ColetaService,
    private laticinioService: LaticinioService,
    private tanqueService: TanqueService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private toast: ToastrService,
  ) {

  }


  ngOnInit(): void {
    this.findAllLaticinios();
    this.findAllTanques();
  }





  create(): void {
    this.coleta.data = moment(this.coleta.data).format('DD/MM/YYYY');

    this.service.cadastrarColeta(this.coleta).subscribe(() => {
      this.toast.success('Coleta de leite cadastrada com sucesso', 'Cadastro');
      this.router.navigate(['coleta']);
    }, ex => {
      if (ex.error.errors) {
        ex.error.errors.forEach(element => {
          this.toast.error(element.message);
        });
      } else {
        this.toast.error(ex.error.message);
      }
    });
  }

  findAllTanques() {
    this.tanqueService.findAll().subscribe(response => {
      this.tanques = response;
    });
  }

  findAllLaticinios(): void {
    this.laticinioService.findAll().subscribe(
      response => {
        this.laticinios = response;
      },
      error => {
        console.error(error);
      }
    );
  }


  cancel(): void {
    this.router.navigate(['/coleta']);
  }

  validaCampos(): boolean {
    return this.data.valid && this.quantidade.valid && this.idTanque.valid;
  }


}
