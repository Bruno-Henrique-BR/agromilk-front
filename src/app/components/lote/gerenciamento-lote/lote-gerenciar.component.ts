import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";
import { ActivatedRoute } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Animal } from "src/app/models/animal";
import { AnimalService } from "src/app/services/animal.service";
import { LoteService } from "src/app/services/lote.service";

@Component({
  selector: "app-lote-gerenciar",
  templateUrl: "./lote-gerenciar.component.html",
  styleUrls: ["./lote-gerenciar.component.css"],
})
export class LoteGerenciarComponent implements OnInit {
  errorMessage: string;
  idLote: number;
  idAnimal: number;
  lotes: any[];
  animalAdicionado: boolean;
  animais: Animal[] = [];
  animaisFiltered: Animal[] = [];

  constructor(
    private loteService: LoteService,
    private animalService: AnimalService,
    private toast: ToastrService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.idLote = this.route.snapshot.params.idLote;
    this.carregarAnimaisNaoContemNoLote();
    this.carregarAnimais();
  }

  animaisSelecionados: number[] = [];

  adicionarAnimais() {
    const idLote = this.route.snapshot.params.idLote;
  
    if (this.animaisSelecionados.length === 0) {
      this.toast.error("Selecione pelo menos um animal.", "Erro");
      return;
    }
  
    this.loteService.adicionarAnimaisAoLote(idLote, this.animaisSelecionados).subscribe(
      () => {
        this.toast.success("Animal adicionado com sucesso", "Cadastro");
        this.location.back();
      },
      (error) => {
        this.toast.error("O animal já pertence a este lote.");
      }
    );
  }
  

  carregarAnimaisNaoContemNoLote(): void {
    const idLote = this.route.snapshot.params.idLote;
    
    this.animalService.findAnimaisNaoContemNoLote(idLote).subscribe(
      lote => {
        this.lotes = [lote]; // Armazena o lote em um array para compatibilidade com o filtro de animais
        this.animalService.findAnimaisNaoContemNoLote(idLote).subscribe(
          animais => {
            this.animaisFiltered = animais;
          },
          error => {
            console.log(error);
          }
        );
      },
      error => {
        console.log(error);
      }
    );
  }
 
  animalPertenceAoLote(idAnimal: number): boolean {
    if (this.lotes && this.lotes.length > 0) {
      return this.lotes.some(lote => lote.animais && lote.animais.length > 0 && lote.animais.some(a => a.idAnimal === idAnimal));
    }
    return false;
  }
  
  
  carregarAnimais(): void {
    this.animalService.findAll().subscribe(
      (response) => {
        this.animais = response.filter((animal) => !this.animaisSelecionados.includes(animal.idAnimal));
      },
      (error) => {
        this.errorMessage = "Erro ao carregar os animais.";
      }
    );
  }
}
