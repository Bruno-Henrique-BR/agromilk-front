import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Funcionario } from 'src/app/models/funcionario';
import { FuncionarioService } from 'src/app/services/funcionario.service';
import { FuncionarioDeleteComponent } from '../funcionario-delete/funcionario-delete.component';

@Component({
  selector: 'app-funcionario-list',
  templateUrl: './funcionario-list.component.html',
  styleUrls: ['./funcionario-list.component.css']
})
export class FuncionarioListComponent implements OnInit {

  funcionarios: Funcionario[] = [];

  displayedColumns: string[] = ['idFuncionario', 'nomeFuncionario', 'cpf', 'dataNascimento', 'endereco', 'telefone', 'acoes'];
  dataSource = new MatTableDataSource<Funcionario>(this.funcionarios);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private dialog: MatDialog,
    private service: FuncionarioService
  ) { }

  openDialog(idFuncionario: number): void {
    const dialogRef = this.dialog.open(FuncionarioDeleteComponent, {
      width: '350px',
      data: {
        title: 'Confirmação',
        message: 'Tem certeza que deseja excluir o funcionário?',
        idFuncionario: idFuncionario
      }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteFuncionario(result.idFuncionario);
      }
    });
  }

  deleteFuncionario(idFuncionario: number): void {
    this.service.excluir(idFuncionario).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter(f => f.idFuncionario !== idFuncionario);
    });
  }

  ngOnInit(): void {
    this.findAll();
  }

  findAll(): void {
    this.service.listarFuncionarios().subscribe(response => {
      this.funcionarios = response;
      this.dataSource = new MatTableDataSource<Funcionario>(this.funcionarios);
      this.dataSource.paginator = this.paginator;
    })
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
