import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-ordenha-delete',
  templateUrl: './ordenha-delete.component.html',
  styleUrls: ['./ordenha-delete.component.css']
})
export class OrdenhaDeleteComponent {



  constructor(public dialogRef: MatDialogRef<OrdenhaDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string, message: string, idOrdenha: number }) { }

  getIdOrdenha(): number {
    return this.data.idOrdenha;
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }

}
