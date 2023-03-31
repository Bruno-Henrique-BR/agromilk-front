import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Animal } from 'src/app/models/animal';
import { Lote } from 'src/app/models/lote';
import { Raca } from 'src/app/models/raca';
import { AnimalService } from 'src/app/services/animal.service';
import { LoteService } from 'src/app/services/lote.service';
import { RacaService } from 'src/app/services/raca.service';

@Component({
  selector: 'app-animal-update',
  templateUrl: './animal-update.component.html',
  styleUrls: ['./animal-update.component.css']
})
export class AnimalUpdateComponent implements OnInit {

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
    lactacao: false,
    lote: undefined,
    raca: undefined,
    loteNome: undefined,
    racaNome: undefined
  }

  lotes: Lote[] = []
  racas: Raca[] = []
  
  public mask = {
    guide: true,
    showMask : true,
    mask: [/\d/, /\d/, '/', /\M/, /\M/, '/',/\y/, /\y/,/\y/, /\y/]
  };
  codigo: FormControl =  new FormControl(null, Validators.minLength(3));
  apelido: FormControl =  new FormControl(null, Validators.minLength(3));
  idLote:    FormControl = new FormControl(null, [Validators.required]);
  idRaca:    FormControl = new FormControl(null, [Validators.required]);

  constructor(
    private service: AnimalService,
    private loteService: LoteService,
    private racaService: RacaService,
    private toast:    ToastrService,
    private router:          Router,
    private route:   ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.animal.idAnimal = this.route.snapshot.paramMap.get('idAnimal');
    this.findById();
    this.findAllLotes();
    this.findAllRacas();
    
   }

  findById(): void {
    this.service.findById(this.animal.idAnimal).subscribe(resposta => {
      this.animal = resposta;
    })
  }

  findAllLotes(): void {
    this.loteService.listarLotes().subscribe(resposta => {
      this.lotes = resposta;
    })
  }

  findAllRacas(): void {
    this.racaService.findAll().subscribe(resposta => {
      this.racas = resposta;
    })
  }

  update(): void {
    this.service.atualizarAnimal(this.animal).subscribe(() => {
      this.toast.success('Animal atualizado com sucesso', 'Update');
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

  
  
  validaCampos(): boolean {
    return this.codigo.valid && this.apelido.valid
}
}
