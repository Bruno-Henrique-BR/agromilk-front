import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Coleta } from '../models/coleta';
import { API_CONFIG } from '../config/api.config';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root'
})
export class ColetaService {

    constructor(
        private http: HttpClient,
        private snackBar: MatSnackBar
    ) { }

    findById(idColeta: any): Observable<Coleta> {
        return this.http.get<Coleta>(`${API_CONFIG.baseUrl}/agromilk/coleta/${idColeta}`);
    }

    listarColetas(): Observable<Coleta[]> {
        return this.http.get<Coleta[]>(`${API_CONFIG.baseUrl}/agromilk/coleta`);
    }

    

    cadastrarColeta(coleta: Coleta): Observable<Coleta> {
        return this.http.post<Coleta>(`${API_CONFIG.baseUrl}/agromilk/coleta`, coleta);
    }

    atualizarColeta(coleta: Coleta): Observable<Coleta> {
        return this.http.put<Coleta>(`${API_CONFIG.baseUrl}/agromilk/coleta/${coleta.idColeta}`, coleta);
    }

    excluir(idColeta: any): Observable<Coleta> {
        return this.http.delete<Coleta>(`${API_CONFIG.baseUrl}/agromilk/coleta/${idColeta}`);
    }

    buscarColetasPorFiltro(tanque: string, data: string): Observable<Coleta[]> {
        return this.http.get<Coleta[]>(`${API_CONFIG.baseUrl}/agromilk/coleta?tanque=${tanque}&data=${data}`);
    }

    listarColetasComFiltro(tanqueFilter?: any, dataFilter?: any): Observable<Coleta[]> {
        let params = new HttpParams();
        if (tanqueFilter) {
            params = params.set('tanque', tanqueFilter);
        }
        if (dataFilter) {
            params = params.set('data', dataFilter);
        }
        return this.http.get<Coleta[]>(`${API_CONFIG.baseUrl}/agromilk/coleta, { params: params }`);
    }

    showMessage(msg: string): void {
        this.snackBar.open(msg, '', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top'
        });
    }
}