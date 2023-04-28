import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Animal } from 'src/app/models/animal';
import { Lote } from 'src/app/models/lote';
import { Raca } from 'src/app/models/raca';
import { AnimalService } from 'src/app/services/animal.service';
import { LoteService } from 'src/app/services/lote.service';
import { RacaService } from 'src/app/services/raca.service';
import { HttpClient } from '@angular/common/http';
import { map, startWith } from 'rxjs/operators';
import * as moment from 'moment';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-animal-create',
  templateUrl: './animal-create.component.html',
  styleUrls: ['./animal-create.component.css']
})
export class AnimalCreateComponent implements OnInit {
  animalComprado: boolean = false;
  private erroDataNascimento: boolean = false;

  animal: Animal = {
    idAnimal: '',
    codigo: '',
    apelido: '',
    dataNascimento: '',
    dataCompra: '',
    cor: '',
    idRaca: '',
    idLote: '',
    nomeRaca: '',
    nomeLote: '',
    lactacao: true,
    lote: undefined,
    raca: undefined,
    loteNome: undefined,
    racaNome: undefined,
    qtsAnimal: 0,
    media: '',
    quantidade: 0,
    idTanque: 0
  }

  public mask = {
    guide: true,
    showMask: true,
    mask: [/\d/, /\d/, '/', /\M/, /\M/, '/', /\y/, /\y/, /\y/, /\y/]
  };
  toggleDataCompra(): void {
    this.animalComprado = !this.animalComprado;
    if (!this.animalComprado) {
      this.dataCompra.reset();
    }
  }
  lotes: Lote[] = [];
  racas: Raca[] = [];
  codigo: FormControl = new FormControl(null, Validators.minLength(3));
  apelido: FormControl = new FormControl(null, Validators.minLength(3));
  idLote: FormControl = new FormControl(null, [Validators.required]);
  idRaca: FormControl = new FormControl(null, [Validators.required]);
  dataCompra: FormControl = new FormControl(null, [Validators.required]);
  dataNascimento: FormControl = new FormControl(null, [Validators.required]);
  searchControl = new FormControl();
  filteredOptions: Observable<Lote[]>;

  constructor(
    private http: HttpClient,
    private service: AnimalService,
    private loteService: LoteService,
    private racaService: RacaService,
    private toast: ToastrService,
    private router: Router,
    private snackBar: MatSnackBar,

  ) { }
  private _filterLote(value: string): Lote[] {
    const filterValue = value.toLowerCase();
    return this.lotes.filter(lote => lote.nomeLote.toLowerCase().includes(filterValue));
  }
  ngOnInit(): void {
    this.filteredOptions = this.searchControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filterLote(value))
    );
    this.findAllLotes();
    this.findAllRacas();
  }

  create(): void {
    // formatar as datas
    this.animal.dataNascimento = moment(this.animal.dataNascimento).format('DD/MM/YYYY');
    this.animal.dataCompra = moment(this.animal.dataCompra).format('DD/MM/YYYY');
    this.service.cadastrarAnimal(this.animal).subscribe(() => {
      this.toast.success('Animal cadastrado com sucesso', 'Cadastro');
      this.router.navigate(['animal']);
    }, ex => {
      if (ex.error.errors) {
        ex.error.errors.forEach(element =>
          this.toast.error(element.message));
      } else {
        this.toast.error(ex.error.message);
      }
    });
  }

  findAllLotes(): void {
    this.loteService.listarLotes().subscribe((data: Lote[]) => {
      this.lotes = data;
    });
  }

  findAllRacas(): void {
    this.racaService.findAll().subscribe((data: Raca[]) => {
      this.racas = data;
    });
  }


  searchLote(event: any): void {
    this.filteredOptions = this.idLote.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.nomeLote),
        map(nomeLote => nomeLote ? this._filterLote(nomeLote) : this.lotes.slice())
      );
  }
  validaCampos(): boolean {
    if (this.animalComprado && this.dataNascimento.value > this.dataCompra.value && !this.erroDataNascimento) {
      this.toast.error('A data de nascimento não pode ser maior que a data de compra', 'Erro');
      this.erroDataNascimento = true; // Define a variável de controle como true para indicar que a mensagem de erro já foi exibida
  
      return false;
    }
    
  
    return (
      this.codigo.valid &&
      this.apelido.valid &&
      this.idLote.valid &&
      this.idRaca.valid &&
      this.dataNascimento.valid &&
      (!this.animalComprado || this.dataCompra.valid)
    );
  }
  
  
}