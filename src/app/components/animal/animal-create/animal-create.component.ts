import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Animal } from 'src/app/models/animal';
import { Lote } from 'src/app/models/lote';
import { Raca } from 'src/app/models/raca';
import { AnimalService } from 'src/app/services/animal.service';
import { LoteService } from 'src/app/services/lote.service';
import { RacaService } from 'src/app/services/raca.service';


@Component({
  selector: 'app-animal-create',
  templateUrl: './animal-create.component.html',
  styleUrls: ['./animal-create.component.css']
})
export class AnimalCreateComponent implements OnInit {

  animal: Animal = {
    idAnimal:                '',
    codigo:   '',
    apelido:   '',
    dataNascimento:   '',
    dataCompra: '',
    cor:      '',
    idRaca: '',
    idLote: '',
    nomeRaca:            '',
    nomeLote:            '',
    lactacao:     true,
   
  }

  lotes: Lote[] = []
  racas: Raca[] = []


  codigo: FormControl =  new FormControl(null, Validators.minLength(3));
  apelido: FormControl =  new FormControl(null, Validators.minLength(3));
  idLote:    FormControl = new FormControl(null, [Validators.required]);
  idRaca:    FormControl = new FormControl(null, [Validators.required]);
  public mask = {
    guide: true,
    showMask : true,
    mask: [/\d/, /\d/, '/', /\d/, /\d/, '/',/\d/, /\d/,/\d/, /\d/]
  };

  constructor(
    private service: AnimalService,
    private loteService: LoteService,
    private racaService: RacaService,
    private toast:    ToastrService,
    private router:          Router,
    ) { }

  ngOnInit(): void {
    this.findAllLotes();
    this.findAllRacas();
  }
  create(): void {
    this.service.cadastrarAnimal(this.animal).subscribe(() => {
      this.toast.success('Animal cadastrado com sucesso', 'Cadastro');
      this.router.navigate(['animal'])
    }, ex => {
      if(ex.error.errors) {
        ex.error.errors.forEach(element => {
          this.toast.error(element.message);
        });
      } else {
        this.toast.error(ex.error.message);
      }
    })
  }

  findAllLotes(): void {
    this.loteService.findAll().subscribe(resposta => {
      this.lotes = resposta;
    })
  }

  findAllRacas(): void {
    this.racaService.findAll().subscribe(resposta => {
      this.racas = resposta;
    })
  }

  

  
  
  validaCampos(): boolean {
    return this.codigo.valid && this.apelido.valid && this.idLote.valid && this.idRaca.valid
  }
}
