import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { User } from '../../../interfaces/user';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrl: './editar-usuario.component.css'
})
export class EditarUsuarioComponent implements OnInit {
    usuario: User;

    constructor(private userService: UserService,
        @Inject(MAT_DIALOG_DATA) public data: { id: number },
        public dialogRef: MatDialogRef<EditarUsuarioComponent>) {
        this.usuario = {
            id: 0,
            username: "",
            email: "",
            password: "",
            name: "",
            surname: "",
            dni: "",
        }
    }

    ngOnInit(): void {
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
                this.usuario.id = res.id;
                this.usuario.username = res.username;
                this.usuario.email = res.email;
                this.usuario.password = res.password;
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
        this.userService.updateUser(this.data.id, this.usuario).subscribe({
            next: res => {
                console.log(res)
            },
            error: err => {
            }

        })
    }

}
