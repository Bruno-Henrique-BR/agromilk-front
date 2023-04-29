import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Raca } from 'src/app/models/raca';
import { RacaService } from 'src/app/services/raca.service';
import { RacaDeleteComponent } from '../raca-delete/raca-delete.component';
import { Animal } from 'src/app/models/animal';
import { ToastrService } from 'ngx-toastr';
import { AnimalService } from 'src/app/services/animal.service';

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
    private service: RacaService,
    private animalService: AnimalService,
    private dialog: MatDialog,
    private toast: ToastrService
    ) { }
openDialog(idRaca: number): void {
    const dialogRef = this.dialog.open(RacaDeleteComponent, {
        width: '350px',
        data: {
            title: 'Confirmação',
            message: 'Tem certeza que deseja excluir a raça?',
            idRaca: idRaca
        }
    });

    dialogRef.afterClosed().subscribe(result => {
        if (result) {
            this.deleteRaca(result.idRaca);
        }
    });
  }

deleteRaca(idRaca: number): void {
  this.animalService.findByIdRaca(idRaca).subscribe(
    (animais: Animal[]) => {
      if (animais.length > 0) {
        this.toast.error("Não é possível excluir a raça pois ela contém animais.", "Erro");
      } else {
        this.service.excluir(idRaca).subscribe(() => {
          this.dataSource.data = this.dataSource.data.filter(f => f.idRaca !== idRaca);
          this.toast.success("Raça excluída com sucesso.", "Sucesso");
        });
      }
    }
  );
}

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
