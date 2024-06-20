import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserCreateDTO } from '../../../interfaces/user';
import { UserService } from '../../../services/user.service';
import { RoleDTO } from '../../../interfaces/role';
import { RoleService } from '../../../services/role.service';

@Component({
    selector: 'app-nuevo-usuario',
    templateUrl: './nuevo-usuario.component.html',
    styleUrl: './nuevo-usuario.component.css'
})
export class NuevoUsuarioComponent implements OnInit {
    usuario: UserCreateDTO;
    roles: RoleDTO[] = [];

    public insertar: any;

    constructor(private userService: UserService,
        private roleService: RoleService, 
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