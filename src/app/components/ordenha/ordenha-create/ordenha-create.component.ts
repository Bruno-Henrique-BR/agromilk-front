import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl, } from '@angular/forms';
import { Router } from '@angular/router';
import { Ordenha } from 'src/app/models/ordenha';
import { Animal } from 'src/app/models/animal';
import { Tanque } from 'src/app/models/tanque';
import { OrdenhaService } from 'src/app/services/ordenha.service';
import { AnimalService } from 'src/app/services/animal.service';
import { TanqueService } from 'src/app/services/tanque.service';
import { ToastrService } from 'ngx-toastr';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { debounceTime, distinctUntilChanged, map, startWith, switchMap } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-ordenha-create',
  templateUrl: './ordenha-create.component.html',
  styleUrls: ['./ordenha-create.component.css']
})
export class OrdenhaCreateComponent implements OnInit {

  tanques: Tanque[] = [];
  animais: any[] = [];
  filteredAnimais: any[] = [];
  ordenha: Ordenha = {
    idOrdenha: '',
    data: null,
    quantidade: null,
    idAnimal: null,
    idTanque: null,
    animal: null,
    tanque: null,
    apelidoAnimal: '',
    modeloTanque: undefined
  };
  dataSemHoras = new Date(this.ordenha.data).toISOString().slice(0, 10);

  data: FormControl = new FormControl(null, [Validators.required]);
  quantidade: FormControl = new FormControl(null, [Validators.required]);
  idAnimal: FormControl = new FormControl(null, [Validators.required]);
  idTanque: FormControl = new FormControl(null, [Validators.required]);

  animalControl = new FormControl();

  constructor(
    private service: OrdenhaService,
    private animalService: AnimalService,
    private tanqueService: TanqueService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private toast: ToastrService,
  ) {
   
  }


  ngOnInit(): void {
    this.findAllAnimais();
    this.findAllTanques();
}


displayAnimalName(animal: any): string {
  console.log('displayAnimalName', animal);
  return animal ? animal.apelido : '';
}


  create(): void {
    this.service.cadastrarOrdenha(this.ordenha).subscribe(() => {
      this.toast.success('Ordenha cadastrada com sucesso', 'Cadastro');
      this.router.navigate(['ordenha']);
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

  findAllAnimais(): void {
    this.animalService.findAll().subscribe(
      response => {
        this.animais = response;
      },
      error => {
        console.error(error);
      }
    );
  }


  cancel(): void {
    this.router.navigate(['/ordenha']);
  }

 
  filtrarAnimais(event: any): void {
    const filtro = event.target.value.toLowerCase();
    this.filteredAnimais = this.animais.filter(
      animal => animal.apelido.toLowerCase().indexOf(filtro) !== -1
    );
  }

  
  displayFn(animal: any): string {
    return animal ? animal.apelido : '';
  }
  validaCampos(): boolean {
    return this.data.valid && this.quantidade.valid && this.idTanque.valid;
  }

 
}
