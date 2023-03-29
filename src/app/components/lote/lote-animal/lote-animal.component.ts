import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Animal } from 'src/app/models/animal';
import { AnimalService } from 'src/app/services/animal.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-lote-animal',
  templateUrl: './lote-animal.component.html',
  styleUrls: ['./lote-animal.component.css']
})
export class LoteAnimalComponent implements OnInit {

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

  displayedColumns: string[] = ['idAnimal', 'codigo', 'apelido', 'dataNascimento', 'dataCompra', 'cor', 'nomeRaca', 'nomeLote', 'lactacao', 'acoes'];
  dataSource = new MatTableDataSource<Animal>(this.animais);

  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(
    private service: AnimalService,
    private route:   ActivatedRoute,

  ) { }

  ngOnInit(): void {
    this.idLote = this.route.snapshot.paramMap.get('idLote');
    this.findAll();
  }
 
  findAll() : void {
    this.service.findByIdLote(this.idLote).subscribe(response => {
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
