import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Lote } from 'src/app/models/lote';
import { LoteService } from 'src/app/services/lote.service';
import { LoteDeleteComponent } from '../lote-delete/lote-delete.component';
import { AnimalService } from 'src/app/services/animal.service';
import { Animal } from 'src/app/models/animal';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-lote-list',
  templateUrl: './lote-list.component.html',
  styleUrls: ['./lote-list.component.css']
})
export class LoteListComponent implements OnInit {

  lotes: Lote[] = []

  displayedColumns: string[] = ['idLote', 'nomeLote', 'descricao', 'acoes'];
  dataSource = new MatTableDataSource<Lote>(this.lotes);

  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(
    private service: LoteService,
    private animalService: AnimalService,
    private dialog: MatDialog,
    private toast: ToastrService
  ) { }
  openDialog(idLote: number): void {
    const dialogRef = this.dialog.open(LoteDeleteComponent, {
      width: '350px',
      data: {
        title: 'Confirmação',
        message: 'Tem certeza que deseja excluir o lote?',
        idLote: idLote
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteLote(result.idLote);
      }
    });
  }
  

  deleteLote(idLote: number): void {
    this.animalService.findByIdLote(idLote).subscribe(
      (animais: Animal[]) => {
        if (animais.length > 0) {
          this.toast.error("Não é possível excluir o lote pois ele contém animais.", "Erro");
        } else {
          this.service.excluir(idLote).subscribe(() => {
            this.dataSource.data = this.dataSource.data.filter(f => f.idLote !== idLote);
            this.toast.success("Lote excluído com sucesso.", "Sucesso");

          });
        }
      }
    );
  }
  
  ngOnInit(): void {
    this.findAll();
  }

  findAll(): void {
    this.service.listarLotes().subscribe(response => {
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
