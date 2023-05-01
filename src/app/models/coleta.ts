import { Laticinio } from "./laticinio";
import { Tanque } from "./tanque";

export class Coleta {
    idColeta?: any;
    data: string;
    quantidade: number;
    idLaticinio: number;
    idTanque: number;
    tanque: any;
    laticinio: any;
    razaoSocial: string;
    modeloTanque: string;
  
    constructor(data: string, quantidade: number, idLaticinio: number, idTanque: number, tanque: any, laticinio: any, razaoSocial: string, modeloTanque: string) {
      this.data = data;
      this.quantidade = quantidade;
      this.idLaticinio = idLaticinio;
      this.idTanque = idTanque;
      this.tanque = tanque;
      this.laticinio = laticinio;
      this.razaoSocial = razaoSocial;
      this.modeloTanque = modeloTanque;
    }
  }
  