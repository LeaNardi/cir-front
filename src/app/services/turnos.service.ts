import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { TurnoDTO, TurnosGenerateDTO } from '../interfaces/turno';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class TurnosService {
    private backendUrl: string = environment.endpoint;

    turnosURL = this.backendUrl + 'api/turnos/';
    constructor(private http: HttpClient) { }

    getTurnosDisponibles(dni: string): Observable<TurnoDTO[]> {
        return this.http.get<TurnoDTO[]>(`${this.turnosURL}getdisponibles/${dni}`);
    }

    getCantidadTurnosOcupados(dni: string): Observable<number> {
        return this.http.get<number>(`${this.turnosURL}getocupados/${dni}`);
    }

    getMisTurnos(id: number): Observable<TurnoDTO[]> {
        return this.http.get<TurnoDTO[]>(`${this.turnosURL}getmisturnos/${id}`);
    }

    reservarTurno(turno: TurnoDTO): Observable<String> {
        return this.http.put<String>(`${this.turnosURL}reservarturno`, turno);
    }

    cancelarTurno(turno: TurnoDTO): Observable<String> {
        return this.http.put<String>(`${this.turnosURL}cancelarturno`, turno);
    }

    generateTurnosParaProfesional(turnosGenerate: TurnosGenerateDTO): Observable<String> {
        return this.http.post<String>(`${this.turnosURL}generateTurnosParaProfesional`, turnosGenerate);
    }
    
    getTurnosParaProfesional(dni: string, fecha: string): Observable<TurnosGenerateDTO> {
        return this.http.get<TurnosGenerateDTO>(`${this.turnosURL}getTurnosParaProfesional/${dni}?fecha=${fecha}`);
    }

    deleteTurnosParaProfesional(dni: string, fecha: string): Observable<number> {
        return this.http.delete<number>(`${this.turnosURL}deleteTurnosParaProfesional/${dni}?fecha=${fecha}`);
    }

}
