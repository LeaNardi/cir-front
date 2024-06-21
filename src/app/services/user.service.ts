import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserDTO, UserCreateDTO } from '../interfaces/user';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private backendUrl: string = environment.endpoint;

    userURL = this.backendUrl + 'api/user/';

    constructor(private http: HttpClient) { }

    getUsers(): Observable<UserDTO[]> {
        return this.http.get<UserDTO[]>(`${this.userURL}getall`);
    }

    getUser(id: number): Observable<UserDTO> {
        return this.http.get<UserDTO>(`${this.userURL}get/${id}`);
    }
    
    addUser(user: UserCreateDTO): Observable<String> {
        return this.http.post<String>(`${this.userURL}add`, user);
    }


    deleteUser(id: number): Observable<String> {
        return this.http.delete<String>(`${this.userURL}delete/${id}`);
    }

    updateUser(id:number, user: UserDTO): Observable<String> {
        return this.http.put<String>(`${this.userURL}update/${id}`, user);
    }

    getMyUser(username: string): Observable<UserDTO> {
        return this.http.get<UserDTO>(`${this.userURL}myuser/${username}`);
    }
}
