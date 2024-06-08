import { Component, OnInit } from '@angular/core';
import { UserDTO } from '../../interfaces/user';
import { UserService } from '../../services/user.service';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
    selector: 'app-miusuario',
    templateUrl: './miusuario.component.html',
    styleUrl: './miusuario.component.css'
})
export class MiusuarioComponent implements OnInit {
    usuario: UserDTO;
    editDisabled = true;

    constructor(private userService: UserService, private auth: AuthenticationService) {
        this.usuario = {
            id: 0,
            username: "",
            email: "",
            name: "",
            surname: "",
            dni: "",
            roles_ids: [1]
        }
    }

    ngOnInit(): void {
        const username = this.auth.getUserName();
        if (username) {
            this.verUsuario(username);
        }
    }

    toggleEditar() {
        if (this.editDisabled) {
            this.editDisabled = false;
        } else {
            this.editDisabled = true;
            const username = this.auth.getUserName();
            if (username) {
                this.verUsuario(username);
            }
        }
    }

    guardar(): void {
        this.editarUsuario();
        this.editDisabled = true;
    }

    verUsuario(username: string) {
        this.userService.getMyUser(username).subscribe({
            next: res => {
                this.usuario.id = res.id;
                this.usuario.username = res.username;
                this.usuario.email = res.email;
                this.usuario.name = res.name;
                this.usuario.surname = res.surname;
                this.usuario.dni = res.dni;
            },
            error: err => {
            }

        })
    }

    editarUsuario() {
        console.log(this.usuario);
        this.userService.updateUser(this.usuario.id, this.usuario).subscribe({
            next: res => {
                const username = this.auth.getUserName();
                if (username) {
                    this.verUsuario(username);
                }
                console.log(res)
            },
            error: err => {
            }

        })
    }

}
