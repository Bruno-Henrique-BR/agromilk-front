import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';
import { Tanque } from '../models/tanque';

@Injectable({
  providedIn: 'root'
})
export class TanqueService {

  constructor(private http: HttpClient) { }

  findById(idTanque: number): Observable<Tanque> {
    return this.http.get<Tanque>(`${API_CONFIG.baseUrl}/agromilk/tanque/${idTanque}`);
  }

  findAll(): Observable<Tanque[]> {
    return this.http.get<Tanque[]>(`${API_CONFIG.baseUrl}/agromilk/tanque`);
  }

  cadastrarTanque(tanque: Tanque): Observable<Tanque> {
    return this.http.post<Tanque>(`${API_CONFIG.baseUrl}/agromilk/tanque`, tanque);
  }

  atualizarTanque(tanque: Tanque): Observable<Tanque> {
    return this.http.put<Tanque>(`${API_CONFIG.baseUrl}/agromilk/tanque/${tanque.idTanque}`, tanque);
  }

  excluir(idTanque: number): Observable<Tanque> {
    return this.http.delete<Tanque>(`${API_CONFIG.baseUrl}/agromilk/tanque/${idTanque}`);
  }

  getQtsTanque(): Observable<number> {
    return this.http.get<number>(`${API_CONFIG.baseUrl}/agromilk/tanque/qtsTanques`);
  }

  getTotalLeite(): Observable<number> {
    return this.http.get<number>(`${API_CONFIG.baseUrl}/agromilk/tanque/qtdTotalLeite`);
  }
}
