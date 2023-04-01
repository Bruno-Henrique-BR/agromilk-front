import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-funcionario-delete',
  templateUrl: './funcionario-delete.component.html',
  styleUrls: ['./funcionario-delete.component.css']
})
export class FuncionarioDeleteComponent {



  constructor(public dialogRef: MatDialogRef<FuncionarioDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string, message: string, idFuncionario: number }) { }

  getIdFuncionario(): number {
    return this.data.idFuncionario;
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }

}
