import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-lote-delete',
  templateUrl: './lote-delete.component.html',
  styleUrls: ['./lote-delete.component.css']
})
export class LoteDeleteComponent {



  constructor(public dialogRef: MatDialogRef<LoteDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string, message: string, idLote: number }) { }

  getIdLote(): number {
    return this.data.idLote;
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }

}
