export class ProducaoLeiteMensalDTO {
    mes: string;
    producaoLeite: number;
  
    constructor(mes: string, producaoLeite: number) {
      this.mes = mes;
      this.producaoLeite = producaoLeite;
    }
  }
  