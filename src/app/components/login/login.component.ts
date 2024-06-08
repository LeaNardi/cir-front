import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Observable, of } from 'rxjs';
import { UserAuthDTO } from '../../interfaces/user';
import { UserService } from '../../services/user.service';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

    form: FormGroup;

    users$: Observable<UserAuthDTO[]> = of([]);
    problem: Boolean = false;

    constructor(
        private builder: FormBuilder,
        private router: Router,
        private auth: AuthenticationService,
    ) {
        this.form = this.builder.group({
            username: [''],
            password: ['']
        });
    }

    ngOnInit(): void {

    }

    // ingreso de usuario ...
    async ingresar(): Promise<void> {
        const username = this.form.get('username')?.value;
        const password = this.form.get('password')?.value;
        //const user: User = new User(email,username, password, null);
        const token = await this.auth.login(this.form.value);
        if (token) {
            this.problem = false;
            this.router.navigate(['navigation']);
        } else {
            console.log("Incorrect username or password.");
            this.problem = true;
        };

    }



}
