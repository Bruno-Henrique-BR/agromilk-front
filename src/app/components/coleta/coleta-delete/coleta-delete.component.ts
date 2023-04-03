import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-coleta-delete',
  templateUrl: './coleta-delete.component.html',
  styleUrls: ['./coleta-delete.component.css']
})
export class ColetaDeleteComponent {



  constructor(public dialogRef: MatDialogRef<ColetaDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string, message: string, idColeta: number }) { }

  getIdColeta(): number {
    return this.data.idColeta;
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }

}
