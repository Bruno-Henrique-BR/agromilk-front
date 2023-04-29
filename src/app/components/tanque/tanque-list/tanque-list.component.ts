import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Tanque } from 'src/app/models/tanque';
import { TanqueService } from 'src/app/services/tanque.service';
import { TanqueDeleteComponent } from '../tanque-delete/tanque-delete.component';
import { Toast, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-tanque-list',
  templateUrl: './tanque-list.component.html',
  styleUrls: ['./tanque-list.component.css']
})
export class TanqueListComponent implements OnInit {

  tanques: Tanque[] = []

  displayedColumns: string[] = ['idTanque', 'modelo', 'descricao', 'capacidade', 'quantidadeAtual', 'acoes'];
  dataSource = new MatTableDataSource<Tanque>(this.tanques);

  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(
    private service: TanqueService,
    private dialog: MatDialog,
    private toast: ToastrService
    ) { }
openDialog(idTanque: number): void {
    const dialogRef = this.dialog.open(TanqueDeleteComponent, {
        width: '350px',
        data: {
            title: 'Confirmação',
            message: 'Tem certeza que deseja excluir o tanque?',
            idTanque: idTanque
        }
    });

    dialogRef.afterClosed().subscribe(result => {
        if (result) {
            this.deleteTanque(result.idTanque);
        }
    });
}

deleteTanque(idTanque: number): void {
  this.service.findById(idTanque).subscribe((tanque: Tanque) => {
    if (tanque.quantidadeAtual > 0) {
      this.toast.error("Não é possível excluir o tanque pois possui leite.", "Erro");
    } else {
      this.service.excluir(idTanque).subscribe(() => {
        this.dataSource.data = this.dataSource.data.filter(f => f.idTanque !== idTanque);
        this.toast.success("Tanque excluído com sucesso.", "Sucesso");
      });
    }
  });
}


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
