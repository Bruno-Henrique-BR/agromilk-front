import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Ordenha } from 'src/app/models/ordenha';
import { OrdenhaService } from 'src/app/services/ordenha.service';

@Component({
selector: 'app-ordenha-list',
templateUrl: './ordenha-list.component.html',
styleUrls: ['./ordenha-list.component.css']
})
export class OrdenhaListComponent implements OnInit {

ordenhas: Ordenha[] = []

displayedColumns: string[] = ['idOrdenha', 'data', 'quantidade', 'idAnimal', 'idTanque', 'acoes'];
dataSource = new MatTableDataSource<Ordenha>(this.ordenhas);

@ViewChild(MatPaginator) paginator: MatPaginator;

constructor(
private service: OrdenhaService
) { }

ngOnInit(): void {
this.findAll();
}

findAll() : void {
this.service.listarOrdenhas().subscribe(response => {
this.ordenhas = response;
this.dataSource = new MatTableDataSource<Ordenha>(this.ordenhas);
this.dataSource.paginator = this.paginator;
})
}

applyFilter(event: Event) {
const filterValue = (event.target as HTMLInputElement).value;
this.dataSource.filter = filterValue.trim().toLowerCase();
}

}