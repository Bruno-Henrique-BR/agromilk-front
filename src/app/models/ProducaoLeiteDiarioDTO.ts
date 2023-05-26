export class ProducaoLeiteDiarioDTO {
    dataDia: string;
    somaProducaoLeite: number;
    quantidadeOrdenhas: number;
  
    constructor(dataDia: string, somaProducaoLeite: number, quantidadeOrdenhas: number) {
      this.dataDia = dataDia;
      this.somaProducaoLeite = somaProducaoLeite;
      this.quantidadeOrdenhas = quantidadeOrdenhas;
    }
  }