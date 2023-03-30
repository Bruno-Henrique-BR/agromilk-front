import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';
import { Laticinio } from '../models/laticinio';

@Injectable({
  providedIn: 'root'
})
export class LaticinioService {

  constructor(private http: HttpClient) { }

  findById(idLaticinio: any): Observable<Laticinio> {
    return this.http.get<Laticinio>(`${API_CONFIG.baseUrl}/agromilk/laticinio/${idLaticinio}`);
  }

  findAll(): Observable<Laticinio[]> {
    return this.http.get<Laticinio[]>(`${API_CONFIG.baseUrl}/agromilk/laticinio`);
  }

  cadastrarLaticinio(laticinio: Laticinio): Observable<Laticinio> {
    return this.http.post<Laticinio>(`${API_CONFIG.baseUrl}/agromilk/laticinio`, laticinio);
  }

  atualizarLaticinio(laticinio: Laticinio): Observable<Laticinio> {
    return this.http.put<Laticinio>(`${API_CONFIG.baseUrl}/agromilk/laticinio/${laticinio.idLaticinio}`, laticinio);
  }

  excluir(idLaticinio: any): Observable<Laticinio> {
    return this.http.delete<Laticinio>(`${API_CONFIG.baseUrl}/agromilk/laticinio/${idLaticinio}`);
  }
}
