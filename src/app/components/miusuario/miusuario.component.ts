import { Component, OnInit } from '@angular/core';
import { UserDTO } from '../../interfaces/user';
import { UserService } from '../../services/user.service';
import { AuthenticationService } from '../../services/authentication.service';
import { RoleService } from '../../services/role.service';
import { RoleDTO } from '../../interfaces/role';

@Component({
    selector: 'app-miusuario',
    templateUrl: './miusuario.component.html',
    styleUrl: './miusuario.component.css'
})
export class MiusuarioComponent implements OnInit {
    usuario: UserDTO;
    editDisabled = true;
    roles: RoleDTO[] = [];

    constructor(private userService: UserService, private roleService: RoleService, private auth: AuthenticationService) {
        this.usuario = {
            userId: 0,
            username: "",
            email: "",
            name: "",
            surname: "",
            dni: "",
            role_id: 0
        }
    }

    ngOnInit(): void {
        this.roleService.getRoles().subscribe({
            next: roles => {
                this.roles = roles;
                console.log(this.roles);
            }
        });
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
                this.usuario.userId = res.userId;
                this.usuario.username = res.username;
                this.usuario.email = res.email;
                this.usuario.name = res.name;
                this.usuario.surname = res.surname;
                this.usuario.dni = res.dni;
                this.usuario.role_id =  res.role_id;
            },
            error: err => {
            }

        })
    }

    editarUsuario() {
        console.log(this.usuario);
        this.userService.updateUser(this.usuario.userId, this.usuario).subscribe({
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
