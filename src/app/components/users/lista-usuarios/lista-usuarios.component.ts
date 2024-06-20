import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { UserService } from '../../../services/user.service';
import { User, UserDTO } from '../../../interfaces/user';
import { NuevoUsuarioComponent } from '../nuevo-usuario/nuevo-usuario.component';
import { DetalleUsuarioComponent } from '../detalle-usuario/detalle-usuario.component';
import swal from 'sweetalert2';
import { EditarUsuarioComponent } from '../editar-usuario/editar-usuario.component';
import { RoleService } from '../../../services/role.service';
import { RoleDTO } from '../../../interfaces/role';


@Component({
    selector: 'app-lista-usuarios',
    templateUrl: './lista-usuarios.component.html',
    styleUrl: './lista-usuarios.component.css'
})
export class ListaUsuariosComponent implements OnInit {
    elementUsers: User[] = [];
    displayedColumns = ['Usuario', 'Email', 'Nombre', 'Apellido', 'DNI', 'Role', 'Acciones'];
    dataSource = new MatTableDataSource<User>(this.elementUsers);
    roles: RoleDTO[] = [];

    @ViewChild(MatTable) tabla!: MatTable<UserDTO>;
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    constructor(private userService: UserService,
        public dialog: MatDialog,
        private toast: NgToastService,
        private router: Router,
        private changeDetectorRefs: ChangeDetectorRef,
        private roleService: RoleService,
    ) { }

    ngOnInit(): void {
        this.roleService.getRoles().subscribe({
            next: roles => {
                this.roles = roles;
                console.log(this.roles);
            }
        });
        this.cargarPacientes();
    }

    // Paginacion de la tabla y filtrado

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    // Cargar pacientes desde bdd

    cargarPacientes(): void {
        this.userService.getUsers().subscribe(
            {
                next: users => {
                    // this.dataSource.data = users as User[];
                    console.log(users);
                    this.dataSource.data = users.map((user) => {
                        return {
                            userId: user.userId,
                            username: user.username, 
                            email: user.email,
                            name: user.name,
                            surname: user.surname,
                            dni: user.dni,
                            role: this.roles.filter(x => x.roleId == user.role_id)[0].role,
                        };
                    })
                    console.log(this.dataSource.data);
                },
                error: err => {
                    console.log(err);
                }
            }
        );
    }


    // Eliminar pacientes
    deleteUsuario(id: number) {
        swal.fire({
            title: '¿Esta seguro?',
            text: "Confirme si desea eliminar al Paciente",
            showCancelButton: true,
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminarlo',
            cancelButtonText: 'No, cancelar',
            buttonsStyling: true
        })
            .then((result) => {
                if (result.value) {
                    this.userService.deleteUser(id).subscribe({
                        next: data => {
                            console.log(data);
                            this.cargarPacientes();  //vuelve a cargar la lista luego de eliminar un paciente
                            this.toast.success({ detail: "Mensaje exitoso", summary: "Usuario eliminado con exito", duration: 3000 });
                        },

                        error: err => {
                            console.log(err);
                            this.toast.error({ detail: "Mensaje de Error", summary: "No se pudo eliminar el usuario", duration: 3000 });
                        }//error
                    } //service
                    ); //subscribe  
                }
            })
    }


    verUsuario(id: number) {
        let dialogRef = this.dialog.open(DetalleUsuarioComponent, { data: { id: id }, width: '40%' })
        dialogRef.afterClosed().subscribe(() => {
            this.cargarPacientes();
        })
    }

    editarUsuario(id: number) {
        let dialogRef = this.dialog.open(EditarUsuarioComponent, { data: { id: id }, width: '40%' })
        dialogRef.afterClosed().subscribe(() => {
            this.cargarPacientes();
        })
    }

    crearUsuario() {
        let dialogRef = this.dialog.open(NuevoUsuarioComponent, { width: '40%' });
        dialogRef.afterClosed().subscribe(() => {
            this.cargarPacientes();
        })
    }

}

