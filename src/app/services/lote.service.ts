import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';
import { Lote } from '../models/lote';
import { Animal } from '../models/animal';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoteService {

  constructor(private http: HttpClient) { }

  findById(idLote: any): Observable<Lote> {
    return this.http.get<Lote>(`${API_CONFIG.baseUrl}/agromilk/lote/${idLote}`);
  }

  listarLotes(): Observable<Lote[]> {
    return this.http.get<Lote[]>(`${API_CONFIG.baseUrl}/agromilk/lote`);
  }

  cadastrarLote(lote: Lote): Observable<Lote> {
    return this.http.post<Lote>(`${API_CONFIG.baseUrl}/agromilk/lote`, lote);
  }

  atualizarLote(lote: Lote): Observable<Lote> {
    return this.http.put<Lote>(`${API_CONFIG.baseUrl}/agromilk/lote/${lote.idLote}`, lote);
  }

  excluir(idLote: any): Observable<Lote> {
    return this.http.delete<Lote>(`${API_CONFIG.baseUrl}/agromilk/lote/${idLote}`);
  }
  search(query: string): Observable<Lote[]> {
    const params = new HttpParams().set('nome', query);
    return this.http.get<Lote[]>('/api/lotes', { params });
  }
  adicionarAnimal(lote: Lote, animal: Animal): Observable<Lote> {
    return this.http.put<Lote>(`${API_CONFIG.baseUrl}/agromilk/lotes/${lote.idLote}/adicionar-animal`, animal);
  }

  getQtsLote(): Observable<number> {
    return this.http.get<number>(`${API_CONFIG.baseUrl}/agromilk/lote/qtsLotes`);
  }

 

  adicionarAnimalAoLote(idLote: number, idAnimal: number): Observable<any> {
    const url = `${API_CONFIG.baseUrl}/agromilk/lote/${idLote}/animais/${idAnimal}`;
    return this.http.post(url, {});
  }
  

 
  
  
}
