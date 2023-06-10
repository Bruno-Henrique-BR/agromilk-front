import { Animal } from "./animal";
import { Tanque } from "./tanque";

export class Ordenha {
    idOrdenha: any;
    data: string;
    primeiraOrdenha: number;
    segundaOrdenha: number;
    idAnimal: number;
    idTanque: number;
    tanque: Tanque;
    animal: Animal; // Adiciona o objeto Animal aqui
    apelidoAnimal: any;
    modeloTanque: any;
  
    constructor(idOrdenha?: number, data?: string, primeiraOrdenha?: number, segundaOrdenha?: number, idAnimal?: number, tanque?: Tanque, animal?: Animal) {
      this.idOrdenha = idOrdenha;
      this.data = data;
      this.primeiraOrdenha = primeiraOrdenha;
      this.segundaOrdenha = segundaOrdenha;
      this.idAnimal = idAnimal;
      this.tanque = tanque;
      this.animal = animal; // Atribui o objeto Animal passado no construtor à propriedade da classe
    }
}