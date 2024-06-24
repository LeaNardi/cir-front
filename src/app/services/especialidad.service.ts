import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EspecialidadDTO } from '../interfaces/especialidad';

@Injectable({
  providedIn: 'root'
})
export class EspecialidadService {
    private backendUrl: string = environment.endpoint;

    especialidadURL = this.backendUrl + 'api/especialidad/';

    constructor(private http: HttpClient) { }

    getEspecialidades(): Observable<EspecialidadDTO[]> {
        return this.http.get<EspecialidadDTO[]>(`${this.especialidadURL}getall`);
    }

    getEspecialidad(id: number): Observable<EspecialidadDTO> {
        return this.http.get<EspecialidadDTO>(`${this.especialidadURL}get/${id}`);
    }
}
