import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    userURL = 'http://localhost:8080/api/user';

    constructor(private http: HttpClient) { }

    addUser(user: User): Observable<User> {
        return this.http.post<User>(`${this.userURL}/add`, user);
    }

    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(`${this.userURL}/getall`);
    }

    getUser(id: number): Observable<User> {
        return this.http.get<User>(`${this.userURL}/get/${id}`);
    }

    deleteUser(id: number): Observable<void> {
        return this.http.delete<void>(`${this.userURL}/delete/${id}`);
    }

    // ingreso de usuario ...
    // ingresar(user: User): Observable<User> {
    //     return this.http.post<User>(`${this.userURL}/auth/signin`, user);
    // }
}
