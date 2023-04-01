import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-animal-delete',
  templateUrl: './animal-delete.component.html',
  styleUrls: ['./animal-delete.component.css']
})
export class AnimalDeleteComponent {



  constructor(public dialogRef: MatDialogRef<AnimalDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string, message: string, idAnimal: number }) { }

  getIdAnimal(): number {
    return this.data.idAnimal;
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }

}
