import { Component } from "@angular/core";
import { ToastrService } from "ngx-toastr";
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
  animais: any[];
  animalAdicionado: boolean;

  constructor(private loteService: LoteService, private animalService: AnimalService, private toast: ToastrService,) { }

  ngOnInit(): void {
    this.carregarLotes();
    this.carregarAnimais();
  }

  carregarLotes(): void {
    this.loteService.listarLotes().subscribe(
      (response) => {
        this.lotes = response;
      },
      (error) => {
        this.errorMessage = 'Erro ao carregar os lotes.';
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

  adicionarAnimal(): void {
    this.loteService.adicionarAnimalAoLote(this.idLote, this.idAnimal).subscribe(
      () => {
        // Limpar os campos
        this.idLote = null;
        this.idAnimal = null;
        this.animalAdicionado = true;
        this.toast.success('Animal adicionado com sucesso', 'Cadastro');    

        // Recarregar os lotes após 2 segundos
        setTimeout(() => {
          this.carregarLotes();
          this.animalAdicionado = false;
        }, 2000);
      },

      (error) => {
        this.toast.error('O animal ja pertence a este lote.');
      }

    );
  }
}

