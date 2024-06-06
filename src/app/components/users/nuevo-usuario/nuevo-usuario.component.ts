import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserCreateDTO } from '../../../interfaces/user';
import { UserService } from '../../../services/user.service';

@Component({
    selector: 'app-nuevo-usuario',
    templateUrl: './nuevo-usuario.component.html',
    styleUrl: './nuevo-usuario.component.css'
})
export class NuevoUsuarioComponent implements OnInit {
    usuario: UserCreateDTO;

    public insertar: any;

    constructor(private userService: UserService,
        public dialogRef: MatDialogRef<NuevoUsuarioComponent>,
        // @Inject(MAT_DIALOG_DATA) public data: User
        ) {
            this.usuario = {
                username: "",
                email: "",
                password: "",
                name: "",
                surname: "",
                dni: "",
                roles_ids: [1]
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
                console.log(res)
            },
            error: err => {
            }
        });
    }
}