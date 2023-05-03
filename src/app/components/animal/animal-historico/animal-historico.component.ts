import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { ActivatedRoute, Router } from "@angular/router";
import { Animal } from "src/app/models/animal";
import { Movimento } from "src/app/models/movimento";
import { MovimentoService } from "src/app/services/movimento.service";

@Component({
    selector: 'app-animal-historico',
    templateUrl: './animal-historico.component.html',
    styleUrls: ['./animal-historico.component.css']
  })
  export class AnimalHistoricoComponent implements OnInit {
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
    displayedColumns: string[] = ['id', 'apelidoAnimal', 'loteNome', 'dataEntrada', 'dataSaida'];
    dataSource = new MatTableDataSource<Movimento>(this.movimentos);

  @ViewChild(MatPaginator) paginator: MatPaginator;
    constructor(
        private service: MovimentoService,
        private route:   ActivatedRoute,
        private dialog: MatDialog,
        private router: Router
    
      ) { }


   


    ngOnInit(): void {
        this.idAnimal = this.route.snapshot.paramMap.get('idAnimal');
        this.findAll();
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
  }