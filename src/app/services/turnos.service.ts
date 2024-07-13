import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { TurnoDTO } from '../interfaces/turno';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class TurnosService {
    private backendUrl: string = environment.endpoint;

    turnosURL = this.backendUrl + 'api/turnos/';
    constructor(private http: HttpClient) { }

    // Posiblemente no se use
    // getTurnosParaProfesional(dni: string, fecha: string): Observable<TurnoDTO[]> {
    //     return this.http.get<TurnoDTO[]>(`${this.turnosURL}get/${dni}?fecha=${fecha}`);
    // }

    getTurnosDisponibles(dni: string): Observable<TurnoDTO[]> {
        return this.http.get<TurnoDTO[]>(`${this.turnosURL}getdisponibles/${dni}`);
    }

    

    reservarTurno(turno: TurnoDTO): Observable<String> {
        return this.http.put<String>(`${this.turnosURL}reservarturno`, turno);
    }

}
