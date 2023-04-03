import { Laticinio } from "./laticinio";
import { Tanque } from "./tanque";

export class Coleta {
    idColeta?: any;
    data: Date;
    quantidade: number;
    idAnimal: number;
    idTanque: number;
    tanque: Tanque;
    laticinio: Laticinio;
    razaoSocial: string;
    modeloTanque: string;
  
    constructor(data: Date, quantidade: number, idAnimal: number, idTanque: number, tanque: Tanque, laticinio: Laticinio, razaoSocial: string, modeloTanque: string) {
      this.data = data;
      this.quantidade = quantidade;
      this.idAnimal = idAnimal;
      this.idTanque = idTanque;
      this.tanque = tanque;
      this.laticinio = laticinio;
      this.razaoSocial = razaoSocial;
      this.modeloTanque = modeloTanque;
    }
  }
  