import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RoleDTO } from '../interfaces/role';

@Injectable({
    providedIn: 'root'
})
export class RoleService {
    private backendUrl: string = environment.endpoint;

    roleURL = this.backendUrl + 'api/role/';

    constructor(private http: HttpClient) { }

    getRoles(): Observable<RoleDTO[]> {
        return this.http.get<RoleDTO[]>(`${this.roleURL}getall`);
    }

    getRole(id: number): Observable<RoleDTO> {
        return this.http.get<RoleDTO>(`${this.roleURL}get/${id}`);
    }
}
