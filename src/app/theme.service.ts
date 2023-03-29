import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private _darkMode = new BehaviorSubject<boolean>(false);
  isDarkMode = this._darkMode.asObservable();

  toggleDarkMode(): void {
    this._darkMode.next(!this._darkMode.value);
  }
}
