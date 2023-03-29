import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Animal } from 'src/app/models/animal';
import { AnimalService } from 'src/app/services/animal.service';
import { Lote } from 'src/app/models/lote';
import { Raca } from 'src/app/models/raca';
import { LoteService } from 'src/app/services/lote.service';
import { RacaService } from 'src/app/services/raca.service';

@Component({
  selector: 'app-animal-delete',
  templateUrl: './animal-delete.component.html',
  styleUrls: ['./animal-delete.component.css']
})
export class AnimalDeleteComponent implements OnInit {

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
    lactacao:     false,
   
  }

  lotes: Lote[] = []
  racas: Raca[] = []
  public mask = {
    guide: true,
    showMask : true,
    mask: [/\d/, /\d/, '/', /\M/, /\M/, '/',/\y/, /\y/,/\y/, /\y/]
  };
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

  delete(): void {
    this.service.excluir(this.animal.idAnimal).subscribe(() => {
      this.toast.success('Animal deletado com sucesso', 'Delete');
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

}
