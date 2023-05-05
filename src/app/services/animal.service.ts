import { HttpClient, HttpParams } from '@angular/common/http';
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

  findAllLactantes(): Observable<Animal[]> {
    return this.http.get<Animal[]>(`${API_CONFIG.baseUrl}/agromilk/animal/lactantes`);
  }

  findAnimaisNaoContemNoLote(idLote: any): Observable<Animal[]> {
    return this.http.get<Animal[]>(`${API_CONFIG.baseUrl}/agromilk/animal/lote/${idLote}/nao-contem`);

  }
  findByIdLote(idLote: number): Observable<Animal[]> {
    return this.http.get<Animal[]>(`${API_CONFIG.baseUrl}/agromilk/animal/lote/${idLote}/animais`);
  }

  findByIdRaca(idRaca: number): Observable<Animal[]> {
    return this.http.get<Animal[]>(`${API_CONFIG.baseUrl}/agromilk/animal/raca/${idRaca}/animais`);
  }
  

  pesquisarAnimais(apelido: string): Observable<Animal[]> {
    return this.http.get<Animal[]>(`${API_CONFIG.baseUrl}/agromilk/animal/pesquisar?apelido=${apelido}`);
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
  getQtsAnimal(): Observable<number> {
    return this.http.get<number>(`${API_CONFIG.baseUrl}/agromilk/animal/qtsAnimal`);
  }
  getMediaLitro(): Observable<number> {
    return this.http.get<number>(`${API_CONFIG.baseUrl}/agromilk/animal/mediaLitro`);
  }

  getAnimalLactacao(): Observable<number> {
    return this.http.get<number>(`${API_CONFIG.baseUrl}/agromilk/animal/qtsAnimalLactacao`);
  }

  getAnimalSeca(): Observable<number> {
    return this.http.get<number>(`${API_CONFIG.baseUrl}/agromilk/animal/qtsAnimalSeca`);
  }
  getPorcentagemLactantes(): Observable<number> {
    return this.http.get<number>(`${API_CONFIG.baseUrl}/agromilk/animal/porcentagemLactantes`);
  }
  getPorcentagemSecas(): Observable<number> {
    return this.http.get<number>(`${API_CONFIG.baseUrl}/agromilk/animal/porcentagemSecas`);
  }
  getAnimais(): Observable<Animal[]> {
    const params = new HttpParams().set('sort', 'idAnimal'); // Add the sort parameter with the desired field to sort by
    return this.http.get<Animal[]>(`${API_CONFIG.baseUrl}/agromilk/animal/{ params }`);
  }
  
}
