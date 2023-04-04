import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl, } from '@angular/forms';
import { Router } from '@angular/router';
import { Ordenha } from 'src/app/models/ordenha';
import { Animal } from 'src/app/models/animal';
import { Tanque } from 'src/app/models/tanque';

import { AnimalService } from 'src/app/services/animal.service';
import { TanqueService } from 'src/app/services/tanque.service';
import { ToastrService } from 'ngx-toastr';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { debounceTime, distinctUntilChanged, map, startWith, switchMap } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { ColetaService } from 'src/app/services/coleta.service';
import { Coleta } from 'src/app/models/coleta';

@Component({
  selector: 'app-coleta-create',
  templateUrl: './coleta-create.component.html',
  styleUrls: ['./coleta-create.component.css']
})
export class ColetaCreateComponent implements OnInit {

  tanques: Tanque[] = [];
  //animais: any[] = [];
  filteredAnimais: any[] = [];
  coleta: Coleta = {
    idColeta: null,
    data: null,
    quantidade: null,
    idTanque: null,
    idAnimal: null,
    tanque: null,
    laticinio: null  ,
    razaoSocial: '',
    modeloTanque: undefined
  };

  dataSemHoras = new Date(this.coleta.data).toISOString().slice(0, 10);

  data: FormControl = new FormControl(null, [Validators.required]);
  quantidade: FormControl = new FormControl(null, [Validators.required]);
  idAnimal: FormControl = new FormControl(null, [Validators.required]);
  idTanque: FormControl = new FormControl(null, [Validators.required]);

  animalControl = new FormControl();

  constructor(
    private service: ColetaService,
    private animalService: AnimalService,
    private tanqueService: TanqueService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private toast: ToastrService,
  ) {
   
  }


  ngOnInit(): void {
   // this.findAllAnimais();
    this.findAllTanques();
}

displayAnimalName(animal: any): string {
  console.log('displayAnimalName', animal);
  return animal ? animal.apelido : '';
}


  create(): void {
    this.service.cadastrarColeta(this.coleta).subscribe(() => {
      this.toast.success('Coleta cadastrada com sucesso', 'Cadastro');
      this.router.navigate(['coleta']);
    }, ex => {
      if(ex.error.errors) {
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

  /*findAllAnimais(): void {
    this.animalService.findAll().subscribe(
      response => {
        this.animais = response;
      },
      error => {
        console.error(error);
      }
    );
  }*/


  cancel(): void {
    this.router.navigate(['/coleta']);
  }

 
 /* filtrarAnimais(event: any): void {
    const filtro = event.target.value.toLowerCase();
    this.filteredAnimais = this.animais.filter(
      animal => animal.apelido.toLowerCase().indexOf(filtro) !== -1
    );
  }*/

  
  displayFn(animal: any): string {
    return animal ? animal.apelido : '';
  }
  validaCampos(): boolean {
    return this.data.valid && this.quantidade.valid && this.idTanque.valid;
  }

 
}
