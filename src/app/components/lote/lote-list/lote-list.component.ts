import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Lote } from 'src/app/models/lote';
import { LoteService } from 'src/app/services/lote.service';

@Component({
  selector: 'app-lote-list',
  templateUrl: './lote-list.component.html',
  styleUrls: ['./lote-list.component.css']
})
export class LoteListComponent implements OnInit {

  lotes: Lote[] = []

  displayedColumns: string[] = ['idLote', 'nome', 'descricao', 'acoes'];
  dataSource = new MatTableDataSource<Lote>(this.lotes);

  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(
    private service: LoteService
  ) { }

  ngOnInit(): void {
    this.findAll();
  }

  findAll() : void {
    this.service.findAll().subscribe(response => {
      this.lotes = response;
      this.dataSource = new MatTableDataSource<Lote>(this.lotes);
      this.dataSource.paginator = this.paginator;
    })
  }
    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }


}
