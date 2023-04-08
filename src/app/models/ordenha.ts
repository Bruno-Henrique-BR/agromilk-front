import { Animal } from "./animal";
import { Tanque } from "./tanque";

export class Ordenha {
    idOrdenha: any;
    data: string;
    quantidade: number;
    idAnimal: number;
    idTanque: number;
    tanque: Tanque;
    animal: Animal; // Adiciona o objeto Animal aqui
    apelidoAnimal: string;
    modeloTanque: any;
  
    constructor(idOrdenha?: number, data?: string, quantidade?: number, idAnimal?: number, tanque?: Tanque, animal?: Animal) {
      this.idOrdenha = idOrdenha;
      this.data = data;
      this.quantidade = quantidade;
      this.idAnimal = idAnimal;
      this.tanque = tanque;
      this.animal = animal; // Atribui o objeto Animal passado no construtor à propriedade da classe
    }
}