import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Animal } from 'src/app/models/animal';
import { AnimalService } from 'src/app/services/animal.service';
import { FuncionarioService } from 'src/app/services/funcionario.service';
import { LoteService } from 'src/app/services/lote.service';
import { TanqueService } from 'src/app/services/tanque.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  animais: Animal[] = []

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
    private tanqueService: TanqueService,
    private funcionarioService: FuncionarioService,
    ) { }

  ngOnInit(): void {
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
}