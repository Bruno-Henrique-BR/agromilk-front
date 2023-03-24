import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Raca } from 'src/app/models/raca';
import { RacaService } from 'src/app/services/raca.service';

@Component({
  selector: 'app-raca-list',
  templateUrl: './raca-list.component.html',
  styleUrls: ['./raca-list.component.css']
})
export class RacaListComponent implements OnInit {

  racas: Raca[] = []

  displayedColumns: string[] = ['idRaca', 'nomeRaca', 'descricao', 'acoes'];
  dataSource = new MatTableDataSource<Raca>(this.racas);

  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(
    private service: RacaService
  ) { }

  ngOnInit(): void {
    this.findAll();
  }

  findAll() : void {
    this.service.findAll().subscribe(response => {
      this.racas = response;
      this.dataSource = new MatTableDataSource<Raca>(this.racas);
      this.dataSource.paginator = this.paginator;
    })
  }
    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }


}
