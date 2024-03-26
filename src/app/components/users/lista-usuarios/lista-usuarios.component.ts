import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { UserService } from '../../../services/user.service';
import { User } from '../../../interfaces/user';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrl: './lista-usuarios.component.css'
})
export class ListaUsuariosComponent implements OnInit {
    elementUsers: User[] = [];
    displayedColumns = ['Usuario', 'Email', 'Nombre', 'Apellido', 'DNI', 'Acciones'];
    dataSource = new MatTableDataSource<User>(this.elementUsers)
  
    @ViewChild(MatTable) tabla!: MatTable<User>;
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
  
    constructor(private userService: UserService,
      public dialog: MatDialog,
      private toast: NgToastService,
      private router: Router,
      private changeDetectorRefs: ChangeDetectorRef) { }
  
    ngOnInit(): void {
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
            this.dataSource.data = users as User[];
          },
          error: err => {
            console.log(err);
          }
        }
      );
    }
  
    // Eliminar pacientes
  
    // // Eliminar pacientes
    // deleteSelectPatient(dni: string) {
    //   swal({
    //     title: '¿Esta seguro?',
    //     text: "Confirme si desea eliminar al Paciente",
    //     type: 'warning',
    //     showCancelButton: true,
    //     confirmButtonColor: '#3085d6',
    //     cancelButtonColor: '#d33',
    //     confirmButtonText: 'Si, eliminarlo',
    //     cancelButtonText: 'No, cancelar',
    //     confirmButtonClass: 'btn btn-success',
    //     cancelButtonClass: 'btn btn-danger',
    //     buttonsStyling: true
    //   }).then((result) => {
    //     if (result.value) {
    //       this.pacienteService.deletePatient(dni).subscribe({
    //         next: data => {
    //           console.log(data);
    //           this.cargarPacientes();  //vuelve a cargar la lista luego de eliminar un paciente
    //           this.toast.success({ detail: "Mensaje exitoso", summary: "Paciente eliminado con exito", duration: 3000 });
    //         },
  
    //         error: err => {
    //           console.log(err);
    //           this.toast.error({ detail: "Mensaje de Error", summary: "No se pudo eliminar el paciente", duration: 3000 });
    //         }//error
    //       } //service
    //       ); //subscribe  
    //     }
    //   })
    // }
    // Ventana modal para crear paciente
  
    // openDialog() {
    //   let dialogRef = this.dialog.open(NuevoPacienteComponent, {
    //     data: new Paciente('',
    //       '',
    //       '',
    //       '',
    //       '',
    //       '')
    //   });
  
    //   dialogRef.afterClosed().subscribe(pac => {
    //     if (pac != undefined)
    //       this.onCreate(pac);
    //   });
    // }
  
    // // Metodo que crea paciente luego de cerrar la ventana Modal y actualizo filas
    // onCreate(pac: Paciente): void {
    //   const paciente = new Paciente(pac.dni,
    //     pac.nombre,
    //     pac.apellido,
    //     pac.localidad,
    //     pac.direccion,
    //     pac.telefono);
  
    //   this.pacienteService.save(paciente).subscribe(
    //     {
    //       next: data => {
    //         this.toast.success({ detail: "Mensaje exitoso", summary: "Paciente creado con exito", duration: 3000 })
    //         this.router.navigate(['/navigation/lista']);
    //       },
    //       error: err => {
    //         this.toast.error({ detail: "Mensaje de Error", summary: "Error al crear paciente", duration: 3000 })
    //         this.router.navigate(['/navigation/lista']);
    //       }
    //     });
    // }
  
    // // creacion de ventana pop y llama a actualizar paciente ...
    // modificarPaciente(id: number) {
    //   this.pacienteService.getPatientDetailById(id).subscribe({
    //     next: res => {
    //       this.pacientes.push(res);
    //       console.log(res);
  
    //       let dialogRef = this.dialog.open(EditarPacientesComponent, {
    //         data: {
    //           id: res.id,
    //           dni: res.dni,
    //           nombre: res.nombre,
    //           apellido: res.apellido,
    //           localidad: res.localidad,
    //           direccion: res.direccion,
    //           telefono: res.telefono
    //         },
    //         width: '40%'
    //       })
  
    //       dialogRef.afterClosed().subscribe(pac => {
    //         if (pac != undefined)
    //           this.onUpdate(pac.id, pac);
    //       });
    //     },
  
    //     error: err => {
    //       this.toast.error({ detail: "Mensaje de Error", summary: "No se pudo actaulizar el paciente", duration: 3000 });
    //       this.cargarPacientes();
    //     }
    //   });
    // }
  
    // // actualiza paciente ...
    // onUpdate(id: number, pac: Paciente) {
    //   this.pacienteService.update(id, pac).subscribe(
    //     {
    //       next: data => {
    //         this.toast.success({ detail: "Mensaje exitoso", summary: "Paciente actualizado con exito", duration: 3000 });
    //         this.cargarPacientes();
    //       },
    //       error: err => {
    //         this.toast.error({ detail: "Mensaje de Error", summary: "No se pudo actaulizar el paciente", duration: 3000 });
    //         this.cargarPacientes();
    //       }
    //     });
    // }
  
    // // ver informacion de paciente ...
    // verPaciente(id: number) {
    //   this.pacienteService.getPatientDetailById(id).subscribe({
    //     next: res => {
    //       this.pacientes.push(res);
    //       console.log(res);
  
    //       let dialogRef = this.dialog.open(DetallePacientesComponent, {
    //         data: {
    //           id: res.id,
    //           dni: res.dni,
    //           nombre: res.nombre,
    //           apellido: res.apellido,
    //           localidad: res.localidad,
    //           direccion: res.direccion,
    //           telefono: res.telefono
    //         },
    //         width: '40%'
    //       })
    //     },
  
    //     error: err => {
    //       this.toast.error({ detail: "Mensaje de Error", summary: "No se pudo actaulizar el paciente", duration: 3000 });
    //       this.cargarPacientes();
    //     }
    //   });
    // }
  
  }
  
  
  
  
