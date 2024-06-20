import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { UserDTO } from '../../../interfaces/user';
import { UserService } from '../../../services/user.service';
import { RoleDTO } from '../../../interfaces/role';
import { RoleService } from '../../../services/role.service';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrl: './editar-usuario.component.css'
})
export class EditarUsuarioComponent implements OnInit {
    usuario: UserDTO;
    roles: RoleDTO[] = [];


    constructor(private userService: UserService,
        private roleService: RoleService, 
        @Inject(MAT_DIALOG_DATA) public data: { id: number },
        public dialogRef: MatDialogRef<EditarUsuarioComponent>) {
        this.usuario = {
            userId: 0,
            username: "",
            email: "",
            name: "",
            surname: "",
            dni: "",
            role_id: 0,
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
    guardar(): void {
        this.editarUsuario();
        this.dialogRef.close();
    }

    verUsuario(id: number) {
        this.userService.getUser(id).subscribe({
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
        const userDTO : UserDTO = {
            userId: this.usuario.userId,
            username: this.usuario.username, 
            email: this.usuario.email,
            name: this.usuario.name,
            surname: this.usuario.surname,
            dni: this.usuario.dni,
            role_id: this.usuario.role_id,
        }
        this.userService.updateUser(this.data.id, userDTO).subscribe({
            next: res => {
                console.log(res)
            },
            error: err => {
            }

        })
    }

}
