import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private snack: MatSnackBar) { }

  message(msg: String) {
    this.snack.open(`${msg}`, 'OK', {
      duration: 5000,
      verticalPosition: 'top',
      horizontalPosition: 'end'
    });
  }

  setError(msg: String) {
    this.snack.open(`${msg}`, 'Erro', {
      duration: 5000,
      verticalPosition: 'top',
      horizontalPosition: 'end',
      panelClass: ['error-snackbar']
    });
  }

}