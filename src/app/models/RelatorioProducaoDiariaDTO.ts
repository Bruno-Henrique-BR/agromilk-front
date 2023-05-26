import { ProducaoLeiteDiarioDTO } from "./ProducaoLeiteDiarioDTO";
export class RelatorioProducaoDiariaDTO {
    dataInicial: Date;
    dataFinal: Date;
    producaoDiaria: ProducaoLeiteDiarioDTO[];
    somaProducao: number;
  }
  
  