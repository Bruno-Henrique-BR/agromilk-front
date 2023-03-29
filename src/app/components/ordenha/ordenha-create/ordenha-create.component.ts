import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Animal } from 'src/app/models/animal';
import { Ordenha } from 'src/app/models/ordenha';
import { AnimalService } from 'src/app/services/animal.service';
import { OrdenhaService } from 'src/app/services/ordenha.service';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-ordenha-create',
  templateUrl: './ordenha-create.component.html',
  styleUrls: ['./ordenha-create.component.css']
})
export class OrdenhaCreateComponent implements OnInit {

  ordenha: Ordenha = {
    idOrdenha: '',
    idAnimal: '',
    quantidade: 0,
    idTanque: '',
    data: '',
  };

  animais: Animal[] = [];
  idAnimal: FormControl = new FormControl(null, [Validators.required]);
  data: FormControl = new FormControl(null, [Validators.required]);
  quantidade: FormControl = new FormControl(null, [Validators.required]);

  searchControl = new FormControl();
  filteredOptions: Observable<Animal[]>;

  constructor(
    private service: OrdenhaService,
    private animalService: AnimalService,
    private toast: ToastrService,
    private router: Router,

  ) { }

  ngOnInit(): void {
    this.filteredOptions = this.searchControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filterAnimal(value))
    );
    this.findAllAnimais();
  }

  create(): void {
    this.service.cadastrarOrdenha(this.ordenha).subscribe(() => {
      this.toast.success('Ordenha cadastrada com sucesso', 'Cadastro');
      this.router.navigate(['ordenha']);
    }, ex => {
      if (ex.error.errors) {
        ex.error.errors.forEach(element =>
          this.toast.error(element.message));
      } else {
        this.toast.error(ex.error.message);
      }
    });
  }

  findAllAnimais(): void {
    this.animalService.findAll().subscribe((data: Animal[]) => {
      this.animais = data;
    });
  }

  private _filterAnimal(value: string): Animal[] {
    const filterValue = value.toLowerCase();
    return this.animais.filter(animal => animal.apelido.toLowerCase().includes(filterValue));
  }

  searchAnimal(event: any): void {
    this.filteredOptions = this.idAnimal.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.apelido),
        map(apelido => apelido ? this._filterAnimal(apelido) : this.animais.slice())
      );
  }

  validaCampos(): boolean {
    return this.idAnimal.valid && this.data.valid && this.quantidade.valid;
  }

}
