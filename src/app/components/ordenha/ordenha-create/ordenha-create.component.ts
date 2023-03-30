import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Route } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Ordenha } from 'src/app/models/ordenha';
import { Animal } from 'src/app/models/animal';
import { Tanque } from 'src/app/models/tanque';
import { OrdenhaService } from 'src/app/services/ordenha.service';
import { AnimalService } from 'src/app/services/animal.service';
import { TanqueService } from 'src/app/services/tanque.service';

@Component({
  selector: 'app-ordenha-create',
  templateUrl: './ordenha-create.component.html',
  styleUrls: ['./ordenha-create.component.css']
})
export class OrdenhaCreateComponent implements OnInit {

  ordenhas: Ordenha[] = [];
  animais: Animal[] = [];
  tanques: Tanque[] = [];

  displayedColumns: string[] = ['data', 'quantidade', 'animal', 'tanque', 'acoes'];
  dataSource = new MatTableDataSource<Ordenha>(this.ordenhas);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ordenha: Ordenha = {
    data: null,
    quantidade: null,
    idAnimal: null,
    idTanque: null
  };
  data: FormControl = new FormControl(null, [Validators.required]);
  quantidade: FormControl = new FormControl(null, [Validators.required]);
  idAnimal: FormControl = new FormControl(null, [Validators.required]);
  idTanque: FormControl = new FormControl(null, [Validators.required]);
  ordenhaForm: FormGroup;

  constructor(
    private service: OrdenhaService,
    private animalService: AnimalService,
    private tanqueService: TanqueService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    this.findAllAnimais();
    this.findAllTanques();
  }

  createForm() {
    this.ordenhaForm = this.fb.group({
      data: ['', Validators.required],
      quantidade: ['', Validators.required],
      idAnimal: ['', Validators.required],
      idTanque: ['', Validators.required]
    });
  }

  findAllAnimais() {
    this.animalService.findAll().subscribe(response => {
      this.animais = response;
    });
  }

  findAllTanques() {
    this.tanqueService.findAll().subscribe(response => {
      this.tanques = response;
    });
  }

  create(): void {
    this.service.cadastrarOrdenha(this.ordenhaForm.value).subscribe(() => {
      this.service.showMessage('Ordenha criada com sucesso!');
      this.router.navigate(['/ordenhas']);
    });
  }

  cancel(): void {
    this.router.navigate(['/ordenhas']);
  }

  get form() {
    return this.ordenhaForm.controls;
  }
  validaCampos(): boolean {
    return this.data.valid && this.quantidade.valid && this.idAnimal.valid && this.idTanque.valid
  }
  getErrorMessage() {
    if (this.form.quantidade.hasError('required')) {
      return 'Campo obrigatório';
    }
    return '';
  }
}
