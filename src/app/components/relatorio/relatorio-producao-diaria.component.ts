import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { OrdenhaService } from 'src/app/services/ordenha.service';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { RelatorioProducaoDiariaDTO } from 'src/app/models/RelatorioProducaoDiariaDTO';
import { formatDate } from '@angular/common';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-relatorio-diaria-producao',
  templateUrl: './relatorio-producao-diaria.component.html',
  styleUrls: ['./relatorio-producao-diaria.component.css']
})
export class RelatorioProducaoDiariaComponent implements OnInit {
  relatorioForm: FormGroup;
  @ViewChild('downloadLink') downloadLink: ElementRef;

  constructor(
    private formBuilder: FormBuilder,
    private ordenhaService: OrdenhaService
  ) {}

  ngOnInit(): void {
    this.relatorioForm = this.formBuilder.group({
      dataInicial: [],
      dataFinal: []
    });
  }

  gerarRelatorio(): void {
    const dataInicial = this.relatorioForm.value.dataInicial;
    const dataFinal = this.relatorioForm.value.dataFinal;
    

    const dataInicialFormatada = formatDate(dataInicial, 'dd/MM/yyyy', 'en-US');
    const dataFinalFormatada = formatDate(dataFinal, 'dd/MM/yyyy', 'en-US');

    this.ordenhaService
      .obterRelatorioProducaoDiaria(dataInicialFormatada, dataFinalFormatada)
      .subscribe(
        (relatorio: RelatorioProducaoDiariaDTO) => {
          // Lógica para processar o relatório retornado pela API e gerar o PDF
          this.gerarPDF(relatorio);
        },
        (error) => {
          console.error(error);
        }
      );
  }

  gerarPDF(relatorio: RelatorioProducaoDiariaDTO): void {
    // Calcular a produção total
    const producaoTotal = relatorio.producaoDiaria.reduce((total, dado) => total + dado.somaProducaoLeite, 0);
  
    // Calcular a quantidade de ordenhas diárias
    const quantidadeOrdenhasDiarias = relatorio.producaoDiaria.reduce((total, dado) => total + dado.quantidadeOrdenhas, 0);
  
    // Calcular a média de produção diária
    const mediaProducaoDiaria = producaoTotal / relatorio.producaoDiaria.length;
  
    // Calcular a média de produção por quantidade de dias e ordenhas realizadas
    const mediaProducaoPorOrdenhas = producaoTotal / quantidadeOrdenhasDiarias;
  
    const docDefinition = {
      content: [
        // Título do relatório
        {
          text: 'Relatório de Produção',
          style: 'header',
          alignment: 'center',
          margin: [0, 0, 0, 20] // Aumentar o espaçamento após o título
        },
        // Dados do relatório
        {
          table: {
            widths: ['*', '*'],
            body: [
              [
                {
                  text: 'Período:',
                  style: 'label',
                  alignment: 'right'
                },
                {
                  text: `${relatorio.dataInicial} até ${relatorio.dataFinal}`,
                  style: 'value',
                  alignment: 'left'
                }
              ]
            ]
          },
          margin: [0, 0, 0, 20] // Aumentar o espaçamento após a tabela
        },
        // Tabela com os dados de produção
        {
          table: {
            headerRows: 1,
            widths: ['*', '*', '*', '*'],
            body: [
              // Cabeçalho da tabela
              [
                {
                  text: 'Data',
                  style: 'tableHeader',
                  fillColor: '#f2f2f2', // Cor de fundo do cabeçalho
                  alignment: 'center',
                },
                {
                  text: 'Produção Diária',
                  style: 'tableHeader',
                  fillColor: '#f2f2f2', // Cor de fundo do cabeçalho
                  alignment: 'center',
                },
                {
                  text: 'Média Diária',
                  style: 'tableHeader',
                  fillColor: '#f2f2f2', // Cor de fundo do cabeçalho
                  alignment: 'center',
                },
                {
                  text: 'Quantidade de Ordenhas',
                  style: 'tableHeader',
                  fillColor: '#f2f2f2', // Cor de fundo do cabeçalho
                  alignment: 'center',
                },
              ],
              // Linhas da tabela
              ...relatorio.producaoDiaria.map((dado) => [
                { text: dado.dataDia, alignment: 'center' },
                { text: `${dado.somaProducaoLeite.toFixed(2)} litros`, alignment: 'center' },
                { text: `${(dado.somaProducaoLeite / dado.quantidadeOrdenhas).toFixed(2)} litros`, alignment: 'center' }, 
                { text: dado.quantidadeOrdenhas, alignment: 'center' }, 
              ])
            ]
          },
          margin: [0, 0, 0, 20] // Aumentar o espaçamento após a tabela
        },
        {
          table: {
            widths: ['50%', '50%'],
            body: [
              [
                {
                  text: 'Produção Total ',
                  style: 'subheader',
                  alignment: 'center',
                  margin: [5, 5, 5, 5],
                  fillColor: '#f2f2f2' // Cor de fundo do quadro
                },
                {
                  text: `${producaoTotal.toFixed(2)} litros`,
                  style: 'value',
                  alignment: 'center'
                }
              ]
            ]
          },
          margin: [0, 0, 0, 20] // Aumentar o espaçamento após o quadro
        },
        // Quadro com a média de produção diária
        {
          table: {
            widths: ['50%', '50%'],
            body: [
              [
                {
                  text: 'Média de Produção Diária',
                  style: 'subheader',
                  alignment: 'center',
                  margin: [5, 5, 5, 5],
                  fillColor: '#f2f2f2' // Cor de fundo do quadro
                },
                {
                  text: `${mediaProducaoDiaria.toFixed(2)} litros`,
                  style: 'value',
                  alignment: 'center'
                }
              ]
            ]
          },
          margin: [0, 0, 0, 20] // Aumentar o espaçamento após o quadro
        },
                // Quadro com a quantidade de ordenhas diárias
                {
                  table: {
                    widths: ['50%', '50%'],
                    body: [
                      [
                        {
                          text: 'Total de ordenhas',
                          style: 'subheader',
                          alignment: 'center',
                          margin: [5, 5, 5, 5],
                          fillColor: '#f2f2f2' // Cor de fundo do quadro
                        },
                        {
                          text: `${quantidadeOrdenhasDiarias} ordenhas`,
                          style: 'value',
                          alignment: 'center'
                        }
                      ]
                    ]
                  },
                  margin: [0, 0, 0, 20] // Aumentar o espaçamento após o quadro
                },
        // Quadro com a média de produção por ordenhas
        {
          table: {
            widths: ['50%', '50%'],
            body: [
              [
                {
                  text: 'Média de Produção por Ordenhas',
                  style: 'subheader',
                  alignment: 'center',
                  margin: [5, 5, 5, 5],
                  fillColor: '#f2f2f2' // Cor de fundo do quadro
                },
                {
                  text: `${mediaProducaoPorOrdenhas.toFixed(2)} litros`,
                  style: 'value',
                  alignment: 'center'
                }
              ]
            ]
          },
          margin: [0, 0, 0, 20] // Aumentar o espaçamento após o quadro
        }
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true
        },
        subheader: {
          fontSize: 14,
          bold: true
        },
        tableHeader: {
          fontSize: 12,
          bold: true,
          fillColor: '#cccccc', // Cor de fundo do cabeçalho
          margin: [5, 5, 5, 5] // Espaçamento interno do cabeçalho
        },
        label: {
          fontSize: 12,
          bold: true,
          alignment: 'right'
        },
        value: {
          fontSize: 12,
          alignment: 'center'
        }
      }
    };
  
    pdfMake.createPdf(docDefinition).download('relatorio_producao_diaria.pdf');
  }
  
  
  
  
  
}
