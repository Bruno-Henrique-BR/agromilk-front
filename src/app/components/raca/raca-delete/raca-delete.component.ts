import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-raca-delete',
  templateUrl: './raca-delete.component.html',
  styleUrls: ['./raca-delete.component.css']
})
export class RacaDeleteComponent {



  constructor(public dialogRef: MatDialogRef<RacaDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string, message: string, idRaca: number }) { }

  getIdRaca(): number {
    return this.data.idRaca;
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }

}
