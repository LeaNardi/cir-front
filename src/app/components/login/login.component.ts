import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Observable, of } from 'rxjs';
import { User } from '../../interfaces/user';
import { UserService } from '../../services/user.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

    form: FormGroup;

    users$: Observable<User[]> = of([]);
    problem: Boolean = false;

    constructor(
        private builder: FormBuilder,
        private service: UserService,
        private router: Router,
        private toast: NgToastService
    ) {
        this.form = this.builder.group({
            username: [''],
            password: ['']
        });
    }

    ngOnInit(): void {

    }

    // ingreso de usuario ...
    ingresar(): void {
        const username = this.form.get('username')?.value;
        const password = this.form.get('password')?.value;
        //const user: User = new User(email,username, password, null);

        this.router.navigate(['navigation']);

    }



}
