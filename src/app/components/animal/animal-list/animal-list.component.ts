import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Animal } from 'src/app/models/animal';
import { AnimalService } from 'src/app/services/animal.service';

@Component({
  selector: 'app-animal-list',
  templateUrl: './animal-list.component.html',
  styleUrls: ['./animal-list.component.css']
})
export class AnimalListComponent implements OnInit {

  animais: Animal[] = []

  displayedColumns: string[] = ['idAnimal', 'codigo', 'apelido', 'acoes'];
  dataSource = new MatTableDataSource<Animal>(this.animais);

  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(
    private service: AnimalService
  ) { }

  ngOnInit(): void {
    this.findAll();
  }

  findAll() : void {
    this.service.findAll().subscribe(response => {
      this.animais = response;
      this.dataSource = new MatTableDataSource<Animal>(this.animais);
      this.dataSource.paginator = this.paginator;
    })
  }
    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }


}
