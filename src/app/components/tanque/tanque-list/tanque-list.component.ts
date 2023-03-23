import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Tanque } from 'src/app/models/tanque';
import { TanqueService } from 'src/app/services/tanque.service';

@Component({
  selector: 'app-tanque-list',
  templateUrl: './tanque-list.component.html',
  styleUrls: ['./tanque-list.component.css']
})
export class TanqueListComponent implements OnInit {

  tanques: Tanque[] = []

  displayedColumns: string[] = ['idTanque', 'modelo', 'descricao', 'capacidade', 'dataFabricacao', 'ativo', 'acoes'];
  dataSource = new MatTableDataSource<Tanque>(this.tanques);

  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(
    private service: TanqueService
  ) { }

  ngOnInit(): void {
    this.findAll();
  }

  findAll() : void {
    this.service.findAll().subscribe(response => {
      this.tanques = response;
      this.dataSource = new MatTableDataSource<Tanque>(this.tanques);
      this.dataSource.paginator = this.paginator;
    })
  }
    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }


}
