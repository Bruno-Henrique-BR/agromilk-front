import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Animal } from 'src/app/models/animal';
import { Ordenha } from 'src/app/models/ordenha';
import { Tanque } from 'src/app/models/tanque';
import { AnimalService } from 'src/app/services/animal.service';
import { OrdenhaService } from 'src/app/services/ordenha.service';
import { TanqueService } from 'src/app/services/tanque.service';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import jsPDF from 'jspdf';
import * as moment from 'moment';
import { formatDate } from '@angular/common';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-ordenha-create',
  templateUrl: './ordenha-create.component.html',
  styleUrls: ['./ordenha-create.component.css']
})
export class OrdenhaCreateComponent implements OnInit {
  animais: Animal[] = [];
  tanques: Tanque[] = [];
  ordenhas: Ordenha[] = [];
  ordenha: Ordenha = {
    idOrdenha: '',
    primeiraOrdenha: null,
    segundaOrdenha: null,
    idAnimal: null,
    idTanque: null,
    animal: null,
    tanque: null,
    apelidoAnimal: '',
    modeloTanque: undefined,
    data: undefined
  };

  constructor(
    private animalService: AnimalService,
    private tanqueService: TanqueService,
    private ordenhaService: OrdenhaService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {
    this.carregarAnimais();
    this.carregarTanques();
  }

  carregarAnimais(): void {
    this.animalService.findAllLactantes().subscribe(
      (response) => {
        this.animais = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  carregarTanques(): void {
    this.tanqueService.findAll().subscribe(
      (response) => {
        this.tanques = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  cadastrarOrdenha(): void {
    this.animais.forEach((animal) => {
      let dataOrdenha: Date | null = null; // Define como null para indicar que é para salvar a data atual
  
      if (typeof animal.data === 'string' && animal.data.trim() !== '') {
        const formattedDate = moment(animal.data, 'DD/MM/YYYY').toDate();
        dataOrdenha = formattedDate;
      }
  
      const ordenha: Ordenha = {
        idOrdenha: '',
        data: dataOrdenha ? moment(dataOrdenha).format('DD/MM/YYYY') : null,
        primeiraOrdenha: animal.primeiraOrdenha,
        segundaOrdenha: animal.segundaOrdenha,
        idAnimal: animal.idAnimal,
        idTanque: animal.idTanque,
        animal: null,
        tanque: null,
        apelidoAnimal: '',
        modeloTanque: undefined
      };
  
      // Converter a data novamente para o formato "DD/MM/YYYY" antes de enviar para o backend
      ordenha.data = ordenha.data ? moment(ordenha.data, 'DD/MM/YYYY').format('DD/MM/YYYY') : null;
  
      this.ordenhaService.cadastrarOrdenha(ordenha).subscribe(
        (response) => {
          this.toast.success('Ordenhas cadastradas com sucesso', 'Cadastro');
          this.router.navigate(['../'], { relativeTo: this.route });
        },
        (error) => {
          console.log(error);
          this.toast.error('Erro ao cadastrar as ordenhas', 'Cadastro');
        }
      );
    });
  }
  
  
  
  limitarQuantidade(event: any) {
    const input = event.target as HTMLInputElement;
    const regex = /^[0-9]{0,2}(\.[0-9]{0,2})?$/;
  
    if (!regex.test(input.value)) {
      input.value = input.value.slice(0, -1);
    }
  }
 

  gerarFichaPDF(): void {
    const doc = new jsPDF();
    const colWidth = 30;
    const rowHeight = 10;
    const margin = 10;
    const pageWidth = doc.internal.pageSize.getWidth();
    const contentWidth = colWidth * 6;
  
    let currentY = margin;
  
    const currentDate = new Date();
    const days = [];
  
    for (let i = 0; i <= 6; i++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + i);
      days.push(date);
    }
  
    days.forEach((date, index) => {
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear().toString();
      const data = `${day}/${month}/${year}`;
  
      // Título principal
      doc.setFontSize(18);
      doc.setFont('bold');
      doc.setTextColor(0);
      const title = 'FICHA DE ORDENHA';
      const titleWidth = (pageWidth - contentWidth) / 2;
      const titleX = (pageWidth - titleWidth) / 2;
      doc.text(title, titleX, currentY + doc.getFontSize(), { align: 'center' });
      currentY += rowHeight * 2;
  
       // Títulos das colunas
       doc.setFontSize(14);
       doc.setFont('bold');
       doc.setDrawColor(0);
   
       const titleMargin = (pageWidth - contentWidth) / 2; // Espaçamento igual à esquerda e à direita
   
       doc.setTextColor(255);
       doc.setFillColor(49, 102, 44);
       doc.rect(titleMargin, currentY, colWidth, rowHeight, 'FD'); // Código
       doc.text('Código', titleMargin + colWidth / 2, currentY + rowHeight / 2 + 2, { align: 'center' });
   
       doc.setTextColor(255);
       doc.setFillColor(49, 102, 44);
       doc.rect(titleMargin + colWidth, currentY, colWidth, rowHeight, 'FD'); // Apelido
       doc.text('Apelido', titleMargin + colWidth + colWidth / 2, currentY + rowHeight / 2 + 2, { align: 'center' });
   
       doc.setTextColor(255);
       doc.setFillColor(49, 102, 44);
       doc.rect(titleMargin + colWidth * 2, currentY, colWidth, rowHeight, 'FD'); // 1ª Ordenha
       doc.text('1ª Ordenha', titleMargin + colWidth * 2 + colWidth / 2, currentY + rowHeight / 2 + 2, { align: 'center' });
   
       doc.setTextColor(255);
       doc.setFillColor(49, 102, 44);
       doc.rect(titleMargin + colWidth * 3, currentY, colWidth, rowHeight, 'FD'); // 2ª Ordenha
       doc.text('2ª Ordenha', titleMargin + colWidth * 3 + colWidth / 2, currentY + rowHeight / 2 + 2, { align: 'center' });
   
       doc.setTextColor(255);
       doc.setFillColor(49, 102, 44);
       doc.rect(titleMargin + colWidth * 4, currentY, colWidth, rowHeight, 'FD'); // Tanque
       doc.text('Tanque', titleMargin + colWidth * 4 + colWidth / 2, currentY + rowHeight / 2 + 2, { align: 'center' });
   
       doc.setTextColor(255);
       doc.setFillColor(49, 102, 44);
       doc.rect(titleMargin + colWidth * 5, currentY, colWidth, rowHeight, 'FD'); // Data
       doc.text('Data', titleMargin + colWidth * 5 + colWidth / 2, currentY + rowHeight / 2 + 2, { align: 'center' });
       currentY += rowHeight;
   
       // Preenchimento dos dados para cada animal
       doc.setFont('normal');
       doc.setDrawColor(0);
       doc.setTextColor(0);
       doc.setFillColor(255, 255, 255); // Cor branca para o preenchimento dos campos
   
       this.animais.forEach((animal) => {
         doc.rect(titleMargin, currentY, colWidth, rowHeight); // Código
         doc.text(animal.codigo.toString(), titleMargin + colWidth / 2, currentY + rowHeight / 2 + 2, { align: 'center' });
   
         doc.rect(titleMargin + colWidth, currentY, colWidth, rowHeight); // Apelido
         doc.text(animal.apelido, titleMargin + colWidth + colWidth / 2, currentY + rowHeight / 2 + 2, { align: 'center' });
   
         doc.rect(titleMargin + colWidth * 2, currentY, colWidth, rowHeight); // 1ª Ordenha
         doc.rect(titleMargin + colWidth * 3, currentY, colWidth, rowHeight); // 2ª Ordenha
         doc.rect(titleMargin + colWidth * 4, currentY, colWidth, rowHeight); // Tanque
   
         doc.rect(titleMargin + colWidth * 5, currentY, colWidth, rowHeight); // Data
         doc.text(data, titleMargin + colWidth * 5 + colWidth / 2, currentY + rowHeight / 2 + 2, { align: 'center' });
   
         currentY += rowHeight;
         doc.setDrawColor(200);
         doc.line(titleMargin, currentY, titleMargin + contentWidth, currentY); // Linha horizontal separando animais
       });
  
      if (index !== days.length - 1) {
        doc.addPage();
        currentY = margin;
      }
    });
  
    doc.save('fichas_ordenha.pdf');
  }
  
  
  


  cancel(): void {
    this.router.navigate(['/ordenha']);
  }
}
