import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ordenha } from '../models/ordenha';
import { API_CONFIG } from '../config/api.config';
import { MatSnackBar } from '@angular/material/snack-bar'; // import do MatSnackBar
import { ProducaoLeiteMensalDTO } from '../models/ProducaoLeiteMensalDTO';

@Injectable({
  providedIn: 'root'
})
export class OrdenhaService {

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar // injeção do MatSnackBar
  ) { }

  findById(idOrdenha: any): Observable<Ordenha> {
    return this.http.get<Ordenha>(`${API_CONFIG.baseUrl}/agromilk/ordenha/${idOrdenha}`);
  }

  listarOrdenhas(): Observable<Ordenha[]> {
    return this.http.get<Ordenha[]>(`${API_CONFIG.baseUrl}/agromilk/ordenha`);
  }
  cadastrarOrdenha(ordenha: any): Observable<any> {
    return this.http.post<Ordenha>(`${API_CONFIG.baseUrl}/agromilk/ordenha/ordenhas`, ordenha);
  }
  cadastrarOrdenhaa(ordenha: Ordenha): Observable<Ordenha> {
    return this.http.post<Ordenha>(`${API_CONFIG.baseUrl}/agromilk/ordenha`, ordenha);
  }

  atualizarOrdenha(ordenha: Ordenha): Observable<Ordenha> {
    return this.http.put<Ordenha>(`${API_CONFIG.baseUrl}/agromilk/ordenha/${ordenha.idOrdenha}`, ordenha);
  }

  excluir(idOrdenha: any): Observable<Ordenha> {
    return this.http.delete<Ordenha>(`${API_CONFIG.baseUrl}/agromilk/ordenha/${idOrdenha}`);
  }

  obterGraficoProducaoLeite(): Observable<ProducaoLeiteMensalDTO[]> {
    return this.http.get<ProducaoLeiteMensalDTO[]>(`${API_CONFIG.baseUrl}/agromilk/ordenha/grafico-producao-leite`);
  }
  
  
  buscarOrdenhasPorFiltro(animal: string, data: string, tanque: string): Observable<Ordenha[]> {
    return this.http.get<Ordenha[]>(`${API_CONFIG.baseUrl}/agromilk/ordenha?animal=${animal}&data=${data}&tanque=${tanque}`);
  }

  listarOrdenhasComFiltro(animalFilter?: any, dataFilter?: any, tanqueFilter?: any): Observable<Ordenha[]> {
    let params = new HttpParams();
    if (animalFilter) {
      params = params.set('animal', animalFilter);
    }
    if (dataFilter) {
      params = params.set('data', dataFilter);
    }
    if (tanqueFilter) {
      params = params.set('tanque', tanqueFilter);
    }
    return this.http.get<Ordenha[]>(`${API_CONFIG.baseUrl}/agromilk/ordenha`, { params: params });
  }
  
  showMessage(msg: string): void {
    this.snackBar.open(msg, '', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top'
    });
  }

}
