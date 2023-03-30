import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Laticinio } from 'src/app/models/laticinio';
import { LaticinioService } from 'src/app/services/laticinio.service';

@Component({
  selector: 'app-laticinio-list',
  templateUrl: './laticinio-list.component.html',
  styleUrls: ['./laticinio-list.component.css']
})
export class LaticinioListComponent implements OnInit {

  laticinios: Laticinio[] = [];

  cnpj?: string;
  razaoSocial?: string;
  telefone?: string;

  displayedColumns: string[] = ['idLaticinio', 'cnpj', 'razaoSocial', 'telefone', 'acoes'];
  dataSource = new MatTableDataSource<Laticinio>(this.laticinios);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private service: LaticinioService) { }

  ngOnInit(): void {
    this.findAll();
  }

  findAll(): void {
    this.service.findAll().subscribe(response => {
      this.laticinios = response;
      this.dataSource = new MatTableDataSource<Laticinio>(this.laticinios);
      this.dataSource.paginator = this.paginator;
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
