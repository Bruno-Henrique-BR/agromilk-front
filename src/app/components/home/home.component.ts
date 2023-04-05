import { Component, OnInit } from '@angular/core';
import { Animal } from 'src/app/models/animal';
import { AnimalService } from 'src/app/services/animal.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  qtsAnimal: number;
  mediaLitro: number;
  qtsAnimaisLactacao: number;
  qtsAnimaisSeca: number;
  porcentagemLactacao: number;
  porcentagemSeca: number;

  constructor(private animalService: AnimalService) { }

  ngOnInit(): void {
    this.animalService.getQtsAnimal().subscribe(
      animal => {
        this.qtsAnimal = animal; // Atribuir diretamente o valor numérico retornado pela requisição
      }
    );
    this.animalService.getMediaLitro().subscribe(
      animal => {
        this.mediaLitro = animal; // Atribuir diretamente o valor numérico retornado pela requisição
      }
    );
    this.animalService.getAnimalLactacao().subscribe(
      animal => {
        this.qtsAnimaisLactacao = animal; // Atribuir diretamente o valor numérico retornado pela requisição
      }
    );
    this.animalService.getAnimalSeca().subscribe(
      animal => {
        this.qtsAnimaisSeca = animal; // Atribuir diretamente o valor numérico retornado pela requisição
      }
    );
    this.animalService.getPorcentagemLactantes().subscribe(
      animal => {
        this.porcentagemLactacao = animal; // Atribuir diretamente o valor numérico retornado pela requisição
      }
    );
    this.animalService.getPorcentagemSecas().subscribe(
      animal => {
        this.porcentagemSeca = animal; // Atribuir diretamente o valor numérico retornado pela requisição
      }
    );
  }
}