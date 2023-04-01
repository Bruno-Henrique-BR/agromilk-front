import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-laticinio-delete',
  templateUrl: './laticinio-delete.component.html',
  styleUrls: ['./laticinio-delete.component.css']
})
export class LaticinioDeleteComponent {



  constructor(public dialogRef: MatDialogRef<LaticinioDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string, message: string, idLaticinio: number }) { }

  getIdLaticinio(): number {
    return this.data.idLaticinio;
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }

}
