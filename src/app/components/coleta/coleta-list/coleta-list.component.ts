import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Coleta } from 'src/app/models/coleta';
import { ColetaService } from 'src/app/services/coleta.service';
import { ColetaDeleteComponent } from '../coleta-delete/coleta-delete.component';
import { MatDialog } from '@angular/material/dialog';
import { Tanque } from 'src/app/models/tanque';
import { Laticinio } from 'src/app/models/laticinio';

@Component({
  selector: 'app-coleta-list',
  templateUrl: './coleta-list.component.html',
  styleUrls: ['./coleta-list.component.css']
})
export class ColetaListComponent implements OnInit {

  coletas: Coleta[] = [];

  idColeta?: any;
  data: Date;
  quantidade: number;
  idLaticinio: number;
  idTanque: number;
  nomeLaticinio: string;
  modeloTanque: any;

  displayedColumns: string[] = ['idColeta', 'data', 'quantidade', 'modeloTanque', 'razaoSocial', 'acoes'];
  dataSource = new MatTableDataSource<Coleta>(this.coletas);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  laticinio: Laticinio;
  tanque: Tanque;
  constructor(
    private service: ColetaService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.findAll();
  }

  findAll(): void {
    this.service.listarColetas().subscribe(response => {
      this.coletas = response;
      this.coletas.forEach((coleta) => {
        coleta.modeloTanque = coleta.tanque.modelo;
        coleta.razaoSocial = coleta.laticinio.razaoSocial;

      });
      this.dataSource = new MatTableDataSource<Coleta>(this.coletas);
      this.dataSource.paginator = this.paginator;

    });
  }

  openDialog(idColeta: number): void {
    const dialogRef = this.dialog.open(ColetaDeleteComponent, {
      width: '350px',
      data: {
        title: 'Confirmação',
        message: 'Tem certeza que deseja excluir a coleta?',
        idColeta: idColeta
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteColeta(result.idColeta);
      }
    });
  }

  deleteColeta(idColeta: number): void {
    this.service.excluir(idColeta).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter(f => f.idColeta !== idColeta);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
