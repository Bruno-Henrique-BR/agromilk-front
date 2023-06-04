import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';
import { Funcionario } from '../models/funcionario';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {

  constructor(private http: HttpClient) { }

  findById(idFuncionario: any): Observable<Funcionario> {
    return this.http.get<Funcionario>(`${API_CONFIG.baseUrl}/agromilk/funcionario/${idFuncionario}`);
  }

  listarFuncionarios(): Observable<Funcionario[]> {
    return this.http.get<Funcionario[]>(`${API_CONFIG.baseUrl}/agromilk/funcionario`);
  }

  cadastrarFuncionario(funcionario: Funcionario): Observable<Funcionario> {
    return this.http.post<Funcionario>(`${API_CONFIG.baseUrl}/agromilk/funcionario`, funcionario);
  }

  atualizarFuncionario(funcionario: Funcionario): Observable<Funcionario> {
    return this.http.put<Funcionario>(`${API_CONFIG.baseUrl}/agromilk/funcionario/${funcionario.idFuncionario}`, funcionario);
  }

  excluir(idFuncionario: any): Observable<Funcionario> {
    return this.http.delete<Funcionario>(`${API_CONFIG.baseUrl}/agromilk/funcionario/${idFuncionario}`);
  }
  search(query: string): Observable<Funcionario[]> {
    const params = new HttpParams().set('nome', query);
    return this.http.get<Funcionario[]>('/api/funcionarios', { params });
  }

  getQtsFuncionarios(): Observable<number> {
    return this.http.get<number>(`${API_CONFIG.baseUrl}/agromilk/funcionario/qtsFuncionario`);
  }
  getUsuarioLogado(): Observable<string> {
    return this.http.get(`${API_CONFIG.baseUrl}/agromilk/funcionario/usuario-logado`, { responseType: 'text' });
  }
  
}
