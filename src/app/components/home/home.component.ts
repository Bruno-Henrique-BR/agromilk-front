import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Chart, registerables } from 'chart.js';
import 'chartjs-adapter-date-fns';
import { LineController } from 'chart.js';

Chart.register(...registerables, LineController);
import { Animal } from 'src/app/models/animal';
import { AnimalService } from 'src/app/services/animal.service';
import { FuncionarioService } from 'src/app/services/funcionario.service';
import { LoteService } from 'src/app/services/lote.service';
import { OrdenhaService } from 'src/app/services/ordenha.service';
import { TanqueService } from 'src/app/services/tanque.service';
import { TaxaOcupacaoTanqueDTO } from 'src/app/models/TaxaOcupacaoTanqueDTO';
import { ColetaService } from 'src/app/services/coleta.service';
import { MovimentoService } from 'src/app/services/movimento.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  lactacaoPercentage: number;
  secaPercentage: number;
  chart: any;
  animais: Animal[] = []
  graficoData: any[] = [];
  melhoresVacas: Animal[] = [];
  pioresVacas: Animal[] = [];
  codigo?:   string;
  apelido?:   string;
  dataNascimento?:   string;
  dataCompra?: string;
  cor:      string;
  idRaca: any;
  idLote: any;
  nomeRaca:            string;
  nomeLote:            string;
  lactacao:     boolean;
  media: string;
  displayedColumns: string[] = ['idAnimal', 'codigo', 'apelido', 'media'];
  dataSource = new MatTableDataSource<Animal>(this.melhoresVacas);
  data = new MatTableDataSource<Animal>(this.pioresVacas);
  chartType: string = 'diario';
  pieChart: any;
  taxaOcupacaoTanqueData: TaxaOcupacaoTanqueDTO[] = [];


  @ViewChild(MatPaginator) paginator: MatPaginator;
  qtsAnimal: number;
  mediaLitro: number;
  qtsAnimaisLactacao: number;
  qtsAnimaisSeca: number;
  porcentagemLactacao: number;
  porcentagemSeca: number;
  porcentagemGestantes: number;
  qtdTanque: number;
  qtdFuncionario: number;
  qtdLote: number;
  qtdTotalLeite: number;
  qtsAnimaisGestantes: number;
  qtsColetas: number;
  qtsSecas: number;
  qtsGestacao: number;
  qtsLactacao: number;

  constructor(private animalService: AnimalService,
    private loteService: LoteService,
    private ordenhaService: OrdenhaService,
    private tanqueService: TanqueService,
    private funcionarioService: FuncionarioService,
    private coletaService: ColetaService,
    private movimentoService: MovimentoService,
    private http: HttpClient,
    ) { }

  ngOnInit(): void {
    this.obterDadosGrafico();
    this.obterDadosGraficoDiaria();
    this.obterDadosGraficoSemanal();
    this.obterDadosGraficoTaxaOcupacao();
    this.getMelhoresVacas();
    this.getPioresVacas();
 
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
    this.animalService.getAnimalGestantes().subscribe(
      animal => {
        this.qtsAnimaisGestantes = animal; // Atribuir diretamente o valor numérico retornado pela requisição
        
      }
    );
    this.animalService.getPorcentagemLactantes().subscribe(
      animal => {
        this.porcentagemLactacao = animal;
        this.exibirGraficoPizza();      
      }
    );
    this.animalService.getPorcentagemSecas().subscribe(
      animal => {
        this.porcentagemSeca = animal; 
        this.exibirGraficoPizza();      

      }
    );
    this.animalService.getPorcentagemGestantes().subscribe(
      animal => {
        this.porcentagemGestantes = animal; 
        this.exibirGraficoPizza();      

      }
    );
    this.coletaService.quantidadeDeColetas().subscribe(
      coleta => {
        this.qtsColetas = coleta;

    }
    );
    this.movimentoService.findQtsAnimaisLactantes().subscribe(
      movimento => {
        this.qtsLactacao = movimento;

    }
    );
    this.movimentoService.findQtsAnimaisGestantes().subscribe(
      movimento => {
        this.qtsGestacao = movimento;

    }
    );
    this.movimentoService.findQtsAnimaisSecas().subscribe(
      movimento => {
        this.qtsSecas = movimento;

    }
    );
    this.loteService.getQtsLote().subscribe(
      lote => {
        this.qtdLote = lote; // Atribuir diretamente o valor numérico retornado pela requisição
      }
    );
    this.funcionarioService.getQtsFuncionarios().subscribe(
      funcionario => {
        this.qtdFuncionario = funcionario; // Atribuir diretamente o valor numérico retornado pela requisição
      }
    );
    this.tanqueService.getQtsTanque().subscribe(
      tanque => {
        this.qtdTanque = tanque; // Atribuir diretamente o valor numérico retornado pela requisição
      }
    );
    this.tanqueService.getTotalLeite().subscribe(
      tanque => {
        this.qtdTotalLeite = tanque; // Atribuir diretamente o valor numérico retornado pela requisição
      }
    );
  }


  obterDadosGrafico() {
    this.ordenhaService.obterGraficoProducaoLeite().subscribe((data) => {
      this.graficoData = data;
      this.exibirGrafico();
    });
  }
  
  exibirGrafico() {
    const labels = this.graficoData.slice(-12).map((item) => item.mes);
    const dataset = this.graficoData.slice(-12).map((item) => item.producaoLeite);
  
    const canvas = document.getElementById('meuGrafico') as HTMLCanvasElement;
    if (!canvas) {
      return;
    }
  
    new Chart(canvas, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Produção de Leite',
            data: dataset,
            borderColor: 'blue',
            backgroundColor: 'rgba(0, 123, 255, 0.2)', // Cor de fundo do gráfico
            borderWidth: 2, // Espessura da linha
            pointRadius: 4, // Tamanho dos pontos
            pointBackgroundColor: 'blue', // Cor dos pontos
            fill: true, // Preenchimento abaixo da linha
            cubicInterpolationMode: 'monotone', // Suavizar a curva com interpolação cúbica
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false, // Permitir que o gráfico se ajuste ao tamanho do contêiner
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function (value) {
                return value + ' litros';
              },
            },
          },
        },
        
        plugins: {
          title: {
            display: true,
            text: 'Produção de Leite por Mês',
            font: {
              size: 18, // Tamanho da fonte do título
              weight: 'bold', // Peso da fonte do título
            },
          },
          legend: {
            display: false, // Ocultar a legenda
          },
        },
      },
    });
  }
  obterDadosGraficoDiaria() {
    this.ordenhaService.obterGraficoProducaoLeiteDiario().subscribe((data) => {
      this.graficoData = data;
      this.exibirGraficoDiario();
    });
  }
  
  exibirGraficoDiario() {
    const labels = this.graficoData.map((item) => item.dataDia);
    const dataset = this.graficoData.map((item) => item.somaProducaoLeite);
  
    const canvas = document.getElementById('meuGraficoDiario') as HTMLCanvasElement;
    if (!canvas) {
      return;
    }
  
    new Chart(canvas, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Produção de Leite',
            data: dataset,
            borderColor: 'blue',
            backgroundColor: 'rgba(0, 123, 255, 0.2)', // Cor de fundo do gráfico
            borderWidth: 2, // Espessura da linha
            pointRadius: 4, // Tamanho dos pontos
            pointBackgroundColor: 'blue', // Cor dos pontos
            fill: true, // Preenchimento abaixo da linha
            cubicInterpolationMode: 'monotone', // Suavizar a curva com interpolação cúbica
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false, // Permitir que o gráfico se ajuste ao tamanho do contêiner
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function (value) {
                return value + ' litros';
              },
            },
          },
        },
        
        plugins: {
          title: {
            display: true,
            text: 'Produção de Leite nos últimos 7 dias',
            font: {
              size: 18, // Tamanho da fonte do título
              weight: 'bold', // Peso da fonte do título
            },
          },
          legend: {
            display: false, // Ocultar a legenda
          },
        },
      },
    });
  }
  obterDadosGraficoTaxaOcupacao() {
  this.ordenhaService.obterGraficoTaxaOcupacaoTanques().subscribe((data) => {
    this.taxaOcupacaoTanqueData = data;
    this.exibirGraficoTaxaOcupacaoTanque();
  });
}
  exibirGraficoTaxaOcupacaoTanque() {
    const labels = this.taxaOcupacaoTanqueData.map((item) => item.modelo);
    const dataset = this.taxaOcupacaoTanqueData.map((item) => item.taxaOcupacao);
  
    const canvas = document.getElementById('taxaOcupacaoTanqueChart') as HTMLCanvasElement;
    if (!canvas) {
      return;
    }
  
    new Chart(canvas, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Ocupação do Tanque',
            data: dataset,
            backgroundColor: 'rgba(54, 162, 235, 0.8)', // Cor de fundo das barras
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function (value) {
                return value + '%';
              },
            },
          },
        },
        plugins: {
          title: {
            display: true,
            text: 'Taxa de Ocupação do Tanque',
            font: {
              size: 18,
              weight: 'bold',
            },
          },
          legend: {
            display: false,
          },
        },
      },
    });
  }
  
  obterDadosGraficoSemanal() {
    this.ordenhaService.obterGraficoProducaoLeitePorSemana().subscribe((data) => {
      this.graficoData = data;
      this.exibirGraficoSemanal();
    });
  }
  exibirGraficoSemanal() {
    const labels = this.graficoData.slice(-10).map((item) => item.semana);
    const dataset = this.graficoData.slice(-10).map((item) => item.producaoLeite);
  
    const canvas = document.getElementById('meuGraficoSemana') as HTMLCanvasElement;
    if (!canvas) {
      return;
    }
  
    new Chart(canvas, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Produção de Leite',
            data: dataset,
            borderColor: 'blue',
            backgroundColor: 'rgba(0, 123, 255, 0.2)', // Cor de fundo do gráfico
            borderWidth: 2, // Espessura da linha
            pointRadius: 4, // Tamanho dos pontos
            pointBackgroundColor: 'blue', // Cor dos pontos
            fill: true, // Preenchimento abaixo da linha
            cubicInterpolationMode: 'monotone', // Suavizar a curva com interpolação cúbica
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function (value) {
                return value + ' litros';
              },
            },
          },
        },
        plugins: {
          title: {
            display: true,
            text: 'Produção de Leite das últimas 10 semanas',
            font: {
              size: 18, // Tamanho da fonte do título
              weight: 'bold', // Peso da fonte do título
            },
          },
          legend: {
            display: false, // Ocultar a legenda
          },
        },
      },
    });
  }
  exibirGraficoPizza() {
    if (this.porcentagemLactacao !== undefined && this.porcentagemSeca !== undefined && this.porcentagemGestantes !== undefined) {
      const data = {
        labels: ['Lactação', 'Secas', 'Gestantes'],
        datasets: [{
          data: [this.porcentagemLactacao, this.porcentagemSeca, this.porcentagemGestantes],
          backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(124,252,0)']
        }]
      };
  
      const options = {
        responsive: true,
        legend: {
          position: 'bottom',
          labels: {
            fontColor: '#333',
            fontSize: 12,
            padding: 10
          }
        },
        title: {
          display: true,
          text: 'Distribuição do rebanho',
          fontSize: 16,
          fontColor: '#333',
          padding: 20
        }
      };
  
      if (this.pieChart) {
        this.pieChart.destroy();
      }
  
      const canvas = document.getElementById('graficoPizza') as HTMLCanvasElement;
      const ctx = canvas.getContext('2d');
      this.pieChart = new Chart(ctx, {
        type: 'pie',
        data: data,
        options: options
      });
    }
  }
  
  
  getMelhoresVacas(): void {
    this.animalService.getMelhoresVacas().subscribe(response => {
      this.melhoresVacas = response,
      this.dataSource = new MatTableDataSource<Animal>(this.melhoresVacas);
  });
  }

  getPioresVacas(): void {
    this.animalService.getPioresVacas().subscribe(response => {
      this.pioresVacas = response,
      this.data = new MatTableDataSource<Animal>(this.pioresVacas);
  });
  }
  changeChartType() {
    if (this.chartType === 'diario') {
      this.obterDadosGraficoDiaria();
      this.exibirGraficoDiario();
    }else if (this.chartType === 'semanal') {
      this.obterDadosGraficoSemanal();
      this.exibirGraficoSemanal();
    } else if (this.chartType === 'mensal') {
      this.obterDadosGrafico();
      this.exibirGrafico();
    }
  }
  
  
}
  
