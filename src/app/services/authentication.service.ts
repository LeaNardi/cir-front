import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
    private backendUrl: string = environment.endpoint;

  constructor() { }
}
