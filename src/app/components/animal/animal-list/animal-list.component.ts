import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Animal } from 'src/app/models/animal';
import { AnimalService } from 'src/app/services/animal.service';
import { AnimalDeleteComponent } from '../animal-delete/animal-delete.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-animal-list',
  templateUrl: './animal-list.component.html',
  styleUrls: ['./animal-list.component.css']
})
export class AnimalListComponent implements OnInit {

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
  displayedColumns: string[] = ['idAnimal', 'codigo', 'apelido', 'racaNome', 'loteNome', 'lactacao','media', 'acoes'];
  dataSource = new MatTableDataSource<Animal>(this.animais);

  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(
    private service: AnimalService,
    private dialog: MatDialog

  ) { }
  openDialog(idAnimal: number): void {
    const dialogRef = this.dialog.open(AnimalDeleteComponent, {
      width: '350px',
      data: {
        title: 'Confirmação',
        message: 'Tem certeza que deseja excluir o animal?',
        idAnimal: idAnimal
      }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteAnimal(result.idAnimal);
      }
    });
  }

  deleteAnimal(idAnimal: number): void {
    this.service.excluir(idAnimal).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter(f => f.idAnimal !== idAnimal);
    });
  }
  ngOnInit(): void {
    this.findAll();
  }

  findAll(): void {
    this.service.findAll().subscribe(response => {
        this.animais = response;
        this.animais.forEach((animal) => {
          animal.racaNome = animal.raca.nomeRaca;
          animal.loteNome = animal.lote.nomeLote;
        });
        this.dataSource = new MatTableDataSource<Animal>(this.animais);
        this.dataSource.paginator = this.paginator;
      });
}
    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }


}
