export class ProducaoLeiteDiarioDTO {
    dataDia: string;
    somaProducaoLeite: number;
  
    constructor(dataDia: string, somaProducaoLeite: number) {
      this.dataDia = dataDia;
      this.somaProducaoLeite = somaProducaoLeite;
    }
  }