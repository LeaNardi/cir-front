import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { iAuthRequest } from '../interfaces/auth';
import { Session } from '../interfaces/session';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
    private backendUrl: string = environment.endpoint;

  constructor() { }

  
  private loggedIn: boolean = false;

  async login(authentication:iAuthRequest): Promise<boolean> {
    const res = await fetch(this.backendUrl + 'api/authentication/authenticate', {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(authentication),
    });
    if(!res.ok) return false
    const token = await res.text();
    console.log(token)

    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(token);
    console.log(decodedToken)
    const sub = decodedToken.sub;
    const role = decodedToken.role;

    if (!token) return false;
    this.setSession(token);
    this.setUserName(sub);
    this.setUserRole(role);
    this.setIsLoggedIn();
    return true;
  }

  isLoggedIn(){
    return localStorage.getItem('IsLoggedIn') == "true";
  }

  getSession(): Session {
    const item: string = localStorage.getItem('session') || 'invalid';
    if (item !== 'invalid') {
      this.loggedIn = true;
      return JSON.parse(item);
    }
    return { expiresIn: '', token: '' };
  }


  setUserName(username : string){
    localStorage.setItem('Username', username);
  }

  setUserRole(role : string){
    localStorage.setItem('Role', role);
  }

  setIsLoggedIn(){
    localStorage.setItem('IsLoggedIn', "true");
  }

  getUserRole(){
    return localStorage.getItem('Role');
  }

  getUserName(){
    return localStorage.getItem('Username');
  }

  isAdmin(){
    return this.getUserRole() == 'Administrador'
  }

  setSession(token: any, expiresTimeHours: number = 1) {
    const date = new Date();
    date.setHours(date.getHours() + expiresTimeHours);

    const session: Session = {
      expiresIn: new Date(date).toISOString(),
      token,
    };

    this.loggedIn = true;
    localStorage.setItem('session', JSON.stringify(session));
  }

  async getMe() {
    const res = await fetch('', {
      headers: {
        Authorization: this.getSession().token!,
      },
    });
    return await res.json();
  }

  resetSession() {
    localStorage.removeItem('session');
    localStorage.removeItem('Username');
    localStorage.removeItem('Role');
    localStorage.removeItem('IsLoggedIn');
    this.loggedIn = false;
  }
}
