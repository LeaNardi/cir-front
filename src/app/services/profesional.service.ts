import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProfesionalDTO } from '../interfaces/profesional';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ProfesionalService {
    private backendUrl: string = environment.endpoint;

    profesionalURL = this.backendUrl + 'api/profesional/';

    constructor(private http: HttpClient) { }

    getProfesionales(): Observable<ProfesionalDTO[]> {
        return this.http.get<ProfesionalDTO[]>(`${this.profesionalURL}getall`);
    }

    getProfesional(dni: string): Observable<ProfesionalDTO> {
        return this.http.get<ProfesionalDTO>(`${this.profesionalURL}get/${dni}`);
    }
    
    addProfesional(profesional: ProfesionalDTO): Observable<String> {
        return this.http.post<String>(`${this.profesionalURL}add`, profesional);
    }


    deleteProfesional(dni: string): Observable<String> {
        return this.http.delete<String>(`${this.profesionalURL}delete/${dni}`);
    }

    updateProfesional(dni: string, profesional: ProfesionalDTO): Observable<String> {
        return this.http.put<String>(`${this.profesionalURL}update/${dni}`, profesional);
    }
}
