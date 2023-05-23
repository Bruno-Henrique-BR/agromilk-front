import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ordenha } from '../models/ordenha';
import { API_CONFIG } from '../config/api.config';
import { MatSnackBar } from '@angular/material/snack-bar'; // import do MatSnackBar
import { ProducaoLeiteMensalDTO } from '../models/ProducaoLeiteMensalDTO';
import { TaxaOcupacaoTanqueDTO } from '../models/TaxaOcupacaoTanqueDTO';
import { ProducaoLeiteDiarioDTO } from '../models/ProducaoLeiteDiarioDTO';

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
  obterGraficoTaxaOcupacaoTanques(): Observable<TaxaOcupacaoTanqueDTO[]> {
    return this.http.get<TaxaOcupacaoTanqueDTO[]>(`${API_CONFIG.baseUrl}/agromilk/ordenha/grafico-taxa-ocupacao-tanques`);
  }
  
  obterGraficoProducaoLeite(): Observable<ProducaoLeiteMensalDTO[]> {
    return this.http.get<ProducaoLeiteMensalDTO[]>(`${API_CONFIG.baseUrl}/agromilk/ordenha/grafico-producao-leite`);
  }

  obterGraficoProducaoLeiteDiario(): Observable<ProducaoLeiteDiarioDTO[]> {
    return this.http.get<ProducaoLeiteDiarioDTO[]>(`${API_CONFIG.baseUrl}/agromilk/ordenha/grafico-producao-ultimos-7-dias`);
  }

  obterGraficoProducaoLeitePorSemana(): Observable<Object[]> {
    return this.http.get<Object[]>(`${API_CONFIG.baseUrl}/agromilk/ordenha/grafico-producao-leite-semana`);;
  }

  obterGraficoProducaoLeitePorSemanaAnimal(idAnimal: any): Observable<Object[]> {
    return this.http.get<Object[]>(`${API_CONFIG.baseUrl}/agromilk/ordenha/grafico-producao-leite-semana/${idAnimal}`);;
  }
  
  obterGraficoProducaoLeiteAnimal(idAnimal: any): Observable<ProducaoLeiteMensalDTO[]> {
    return this.http.get<ProducaoLeiteMensalDTO[]>(`${API_CONFIG.baseUrl}/agromilk/ordenha/grafico-producao-leite/${idAnimal}`);
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
