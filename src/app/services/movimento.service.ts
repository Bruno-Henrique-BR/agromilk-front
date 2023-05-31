import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';
import { Lote } from '../models/lote';
import { Animal } from '../models/animal';
import { switchMap } from 'rxjs/operators';
import { Movimento } from '../models/movimento';

@Injectable({
  providedIn: 'root'
})
export class MovimentoService {
  constructor(private http: HttpClient) { }
  findByIdAnimal(idAnimal: number): Observable<Movimento[]> {
    return this.http.get<Movimento[]>(`${API_CONFIG.baseUrl}/agromilk/movimento/${idAnimal}`);
  }
  findQtsAnimaisLactantes(): Observable<number> {
    return this.http.get<number>(`${API_CONFIG.baseUrl}/agromilk/movimento/media-dias-lactacao`);
  }
  findQtsAnimaisSecas(): Observable<number> {
    return this.http.get<number>(`${API_CONFIG.baseUrl}/agromilk/movimento/media-dias-gestacao`);
  }
  findQtsAnimaisGestantes(): Observable<number> {
    return this.http.get<number>(`${API_CONFIG.baseUrl}/agromilk/movimento/media-dias-secas`);
  }
}