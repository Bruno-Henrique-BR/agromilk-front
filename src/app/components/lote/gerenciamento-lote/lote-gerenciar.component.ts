import { Component } from "@angular/core";
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Animal } from "src/app/models/animal";
import { AnimalService } from "src/app/services/animal.service";
import { LoteService } from "src/app/services/lote.service";

@Component({
  selector: 'app-lote-gerenciar',
  templateUrl: './lote-gerenciar.component.html',
  styleUrls: ['./lote-gerenciar.component.css']
})

export class LoteGerenciarComponent {

  errorMessage: string;
  idLote: number;
  idAnimal: number;
  lotes: any[];
  animalAdicionado: boolean;
  animais: Animal[] = [];
  animaisFiltered: Animal[] = [];

  constructor(private loteService: LoteService, 
    private animalService: AnimalService, 
    private toast: ToastrService,     
    private route:   ActivatedRoute,
    private location: Location
    ) { }

  ngOnInit(): void {
    this.carregarAnimaisNaoContemNoLote();
    this.carregarAnimais();

  }
  animaisSelecionados: number[] = [];

  // ...

  
  adicionarAnimais() {
    // Enviar a lista de animais selecionados para o backend
    const idLote = this.route.snapshot.params.idLote; // Obter o idLote da rota atual
    
    this.loteService.adicionarAnimaisAoLote(idLote, this.animaisSelecionados).subscribe(
      () => {
        // Sucesso - exibir mensagem ou executar ação desejada
        this.toast.success('Animal adicionado com sucesso', 'Cadastro');    
        this.location.back()
      },
      (error) => {
        // Tratar erro - exibir mensagem de erro ou executar ação desejada
        this.toast.error('O animal ja pertence a este lote.');
      }
    );
  }


  carregarAnimaisNaoContemNoLote(): void {
    const idLote = this.route.snapshot.params.idLote;
    this.animalService.findAnimaisNaoContemNoLote(idLote).subscribe(
      animais => {
        this.animaisFiltered = animais;
      },
      error => {
        console.log(error);
      }
    );
  }
  carregarAnimais(): void {
    this.animalService.findAll().subscribe(
      (response) => {
        this.animais = response;
      },
      (error) => {
        this.errorMessage = 'Erro ao carregar os animais.';
      }
    );
  }

  
}

