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
  dataSource = new MatTableDataSource<Animal>(this.animais);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  qtsAnimal: number;
  mediaLitro: number;
  qtsAnimaisLactacao: number;
  qtsAnimaisSeca: number;
  porcentagemLactacao: number;
  porcentagemSeca: number;
  qtdTanque: number;
  qtdFuncionario: number;
  qtdLote: number;
  qtdTotalLeite: number;
  constructor(private animalService: AnimalService,
    private loteService: LoteService,
    private ordenhaService: OrdenhaService,
    private tanqueService: TanqueService,
    private funcionarioService: FuncionarioService,
    private http: HttpClient,
    ) { }

  ngOnInit(): void {
    this.obterDadosGrafico();
    this.obterDadosGraficoSemanal();
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
    const labels = this.graficoData.map((item) => item.mes);
    const dataset = this.graficoData.map((item) => item.producaoLeite);
  
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
            borderColor: 'blue', // Cor da linha (azul)
            backgroundColor: 'rgba(0, 123, 255, 0.2)', // Cor de fundo do gráfico
            borderWidth: 2, // Espessura da linha
            pointRadius: 4, // Tamanho dos pontos
            pointBackgroundColor: '#3366ff', // Cor dos pontos (azul)
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
            display: true, // Ocultar a legenda
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
    const labels = this.graficoData.map((item) => item.semana);
    const dataset = this.graficoData.map((item) => item.producaoLeite);
  
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
            text: 'Produção de Leite por Semana',
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
  
}