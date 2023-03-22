import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';
import { Animal } from '../models/animal';

@Injectable({
  providedIn: 'root'
})
export class AnimalService {

  constructor(private http: HttpClient) { }

  findById(idAnimal: any): Observable<Animal> {
    return this.http.get<Animal>(`${API_CONFIG.baseUrl}/agromilk/animal/${idAnimal}`);
  }

  findAll(): Observable<Animal[]> {
    return this.http.get<Animal[]>(`${API_CONFIG.baseUrl}/agromilk/animal`);
  }

  cadastrarAnimal(animal: Animal): Observable<Animal> {
    return this.http.post<Animal>(`${API_CONFIG.baseUrl}/agromilk/animal`, animal);
  }

  atualizarAnimal(animal: Animal): Observable<Animal> {
    return this.http.put<Animal>(`${API_CONFIG.baseUrl}/agromilk/animal/${animal.idAnimal}`, animal);
  }

  excluir(idAnimal: any): Observable<Animal> {
    return this.http.delete<Animal>(`${API_CONFIG.baseUrl}/agromilk/animal/${idAnimal}`);
  }
}
