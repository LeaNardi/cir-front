import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from '../../../interfaces/user';
import { UserService } from '../../../services/user.service';

@Component({
    selector: 'app-nuevo-usuario',
    templateUrl: './nuevo-usuario.component.html',
    styleUrl: './nuevo-usuario.component.css'
})
export class NuevoUsuarioComponent implements OnInit {
    usuario: User;

    public insertar: any;

    constructor(private userService: UserService,
        public dialogRef: MatDialogRef<NuevoUsuarioComponent>,
        // @Inject(MAT_DIALOG_DATA) public data: User
        ) {
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
    }

    // cierre de ventana modal ...
    cancelar() {
        this.dialogRef.close();
    }

    guardar(): void {
        this.crearUsuario();
        this.dialogRef.close();
    }

    crearUsuario(): void {
        console.log(this.usuario);
        this.userService.addUser(this.usuario).subscribe({
            next: res => {
            },
            error: err => {
            }
        });
    }
}