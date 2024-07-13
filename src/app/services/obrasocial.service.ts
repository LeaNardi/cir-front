import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ObraSocialDTO } from '../interfaces/obrasocial';

@Injectable({
  providedIn: 'root'
})
export class ObraSocialService {
    private backendUrl: string = environment.endpoint;

    obrasocialURL = this.backendUrl + 'api/obrasocial/';

    constructor(private http: HttpClient) { }

    getObrasSociales(): Observable<ObraSocialDTO[]> {
        return this.http.get<ObraSocialDTO[]>(`${this.obrasocialURL}getall`);
    }

    getObraSocial(id: number): Observable<ObraSocialDTO> {
        return this.http.get<ObraSocialDTO>(`${this.obrasocialURL}get/${id}`);
    }
}
