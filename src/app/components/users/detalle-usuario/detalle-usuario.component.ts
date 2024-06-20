import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { User } from '../../../interfaces/user';
import { UserService } from '../../../services/user.service';
import { RoleService } from '../../../services/role.service';
import { RoleDTO } from '../../../interfaces/role';

@Component({
    selector: 'app-detalle-usuario',
    templateUrl: './detalle-usuario.component.html',
    styleUrl: './detalle-usuario.component.css'
})
export class DetalleUsuarioComponent implements OnInit {
    usuario: User;
    editDisabled = true;
    roles: RoleDTO[] = [];

    constructor(private userService: UserService,
        private roleService: RoleService, 
        @Inject(MAT_DIALOG_DATA) public data: { id: number },
        public dialogRef: MatDialogRef<DetalleUsuarioComponent>) {
        this.usuario = {
            userId: 0,
            username: "",
            email: "",
            name: "",
            surname: "",
            dni: "",
            role: ""
        }
    }

    ngOnInit(): void {
        this.roleService.getRoles().subscribe({
            next: roles => {
                this.roles = roles;
                console.log(this.roles);
            }
        });
        this.verUsuario(this.data.id);
    }

    // cierre de ventana modal...
    cancelar(): void {
        this.dialogRef.close();
    }

    verUsuario(id: number) {
        this.userService.getUser(id).subscribe({
            next: res => {
                console.log(res)

                this.usuario.userId = res.userId;
                this.usuario.username = res.username;
                this.usuario.email = res.email;
                this.usuario.name = res.name;
                this.usuario.surname = res.surname;
                this.usuario.dni = res.dni;
                this.usuario.role = this.roles.filter(x => x.roleId == res.role_id)[0].role;
            },
            error: err => {
            }

        })
    }

}