import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { ActivatedRoute, Router } from "@angular/router";
import { Chart } from "chart.js";
import { Animal } from "src/app/models/animal";
import { Movimento } from "src/app/models/movimento";
import { MovimentoService } from "src/app/services/movimento.service";
import { OrdenhaService } from "src/app/services/ordenha.service";
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

pdfMake.vfs = pdfFonts.pdfMake.vfs;


@Component({
    selector: 'app-animal-historico',
    templateUrl: './animal-historico.component.html',
    styleUrls: ['./animal-historico.component.css']
  })
  export class AnimalHistoricoComponent implements OnInit {
    
    graficoData: any[] = [];
    idAnimal: any;
    movimentos: Movimento[] = []
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
    displayedColumns: string[] = ['id', 'apelidoAnimal', 'loteNome', 'dataEntrada', 'dataSaida','dias'];
    dataSource = new MatTableDataSource<Movimento>(this.movimentos);

  @ViewChild(MatPaginator) paginator: MatPaginator;
    constructor(
        private service: MovimentoService,
        private ordenhaService: OrdenhaService,
        private route:   ActivatedRoute,
        private dialog: MatDialog,
        private router: Router
    
      ) { }


   


    ngOnInit(): void {
        this.idAnimal = this.route.snapshot.paramMap.get('idAnimal');
        this.findAll();
        this.obterDadosGrafico();
        this.obterDadosGraficoSemanal();
      }
    
    
    
    findAll(): void {
      this.service.findByIdAnimal(this.idAnimal).subscribe(response => {
        this.movimentos = response;
          this.movimentos.forEach((movimento) => {
            movimento.loteNome = movimento.lote.nomeLote;
            movimento.apelidoAnimal = movimento.animal.apelido;
          });
          this.dataSource = new MatTableDataSource<Movimento>(this.movimentos);
          this.dataSource.paginator = this.paginator;
        });
    }
    obterDadosGrafico() {
      this.ordenhaService.obterGraficoProducaoLeiteAnimal(this.idAnimal).subscribe((data) => {
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
    obterDadosGraficoSemanal() {
      this.ordenhaService.obterGraficoProducaoLeitePorSemanaAnimal(this.idAnimal).subscribe((data) => {
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