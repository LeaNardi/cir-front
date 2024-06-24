import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TituloDTO } from '../interfaces/titulo';

@Injectable({
  providedIn: 'root'
})
export class TituloService {
    private backendUrl: string = environment.endpoint;

    tituloURL = this.backendUrl + 'api/titulo/';

    constructor(private http: HttpClient) { }

    getTitulos(): Observable<TituloDTO[]> {
        return this.http.get<TituloDTO[]>(`${this.tituloURL}getall`);
    }

    getTitulo(id: number): Observable<TituloDTO> {
        return this.http.get<TituloDTO>(`${this.tituloURL}get/${id}`);
    }
}
