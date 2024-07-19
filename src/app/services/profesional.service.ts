import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ExistsResponse, ProfesionalDTO, ProfesionalDTOSimp } from '../interfaces/profesional';
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

    getProfesionalesSimplified(): Observable<ProfesionalDTOSimp[]> {
        return this.http.get<ProfesionalDTOSimp[]>(`${this.profesionalURL}getallsimplified`);
    }

    getProfesional(dni: string): Observable<ProfesionalDTO> {
        return this.http.get<ProfesionalDTO>(`${this.profesionalURL}get/${dni}`);
    }

    getProfesionalSimplified(dni: string): Observable<ProfesionalDTOSimp> {
        return this.http.get<ProfesionalDTOSimp>(`${this.profesionalURL}getsimplified/${dni}`);
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

    disableProfesional(dni: string, motivobaja: string): Observable<String> {
        return this.http.put<String>(`${this.profesionalURL}disable/${dni}`, motivobaja);
    }

    existsProfesional(dni: string): Observable<ExistsResponse> {
        return this.http.get<ExistsResponse>(`${this.profesionalURL}exists/${dni}`);
    }
}
