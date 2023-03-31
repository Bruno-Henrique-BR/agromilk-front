import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Ordenha } from 'src/app/models/ordenha';
import { OrdenhaService } from 'src/app/services/ordenha.service';
import { Animal } from 'src/app/models/animal';
import { AnimalService } from 'src/app/services/animal.service';
import { Observable } from 'rxjs';
import { Tanque } from 'src/app/models/tanque';

@Component({
    selector: 'app-ordenha-list',
    templateUrl: './ordenha-list.component.html',
    styleUrls: ['./ordenha-list.component.css']
})
export class OrdenhaListComponent implements OnInit {

    ordenhas: Ordenha[] = []
    animais: Animal[] = [];

    displayedColumns: string[] = ['idOrdenha', 'data', 'quantidade', 'apelidoAnimal', 'modeloTanque', 'acoes'];
    dataSource = new MatTableDataSource<Ordenha>(this.ordenhas);

    @ViewChild(MatPaginator) paginator: MatPaginator;
    animal: Animal;
    tanque: Tanque;

    constructor(
        private service: OrdenhaService    ) { }

    ngOnInit(): void {
        this.findAll();
    }

    


    findAll(): void {
        this.service.listarOrdenhas().subscribe(response => {
            this.ordenhas = response;
            this.ordenhas.forEach((ordenha) => {
              ordenha.apelidoAnimal = ordenha.animal.apelido;
              ordenha.modeloTanque = ordenha.tanque.modelo;
            });
            this.dataSource = new MatTableDataSource<Ordenha>(this.ordenhas);
            this.dataSource.paginator = this.paginator;
          });
    }


    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

}
