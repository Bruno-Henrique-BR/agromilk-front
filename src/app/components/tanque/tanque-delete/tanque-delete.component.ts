import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-tanque-delete',
  templateUrl: './tanque-delete.component.html',
  styleUrls: ['./tanque-delete.component.css']
})
export class TanqueDeleteComponent {



  constructor(public dialogRef: MatDialogRef<TanqueDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string, message: string, idTanque: number }) { }

  getIdTanque(): number {
    return this.data.idTanque;
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }

}
