import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ProfesionalService } from '../../../services/profesional.service';
import { ProfesionalDTO } from '../../../interfaces/profesional';
import swal from 'sweetalert2';
import { EspecialidadDTO } from '../../../interfaces/especialidad';
import { EspecialidadService } from '../../../services/especialidad.service';
import { TituloDTO } from '../../../interfaces/titulo';
import { TituloService } from '../../../services/titulo.service';

@Component({
  selector: 'app-lista-profesionales',
  templateUrl: './lista-profesionales.component.html',
  styleUrl: './lista-profesionales.component.css'
})
export class ListaProfesionalesComponent implements OnInit {
    elementProfesionales: ProfesionalDTO[] = [];
    displayedColumns = ['dni', 'Nombre', 'Apellido', 'Especialidad', 'Activo', 'Acciones'];
    dataSource = new MatTableDataSource<ProfesionalDTO>(this.elementProfesionales);
    especialidades: EspecialidadDTO[] = [];
    titulos: TituloDTO[] = [];

    @ViewChild(MatTable) tabla!: MatTable<ProfesionalDTO>;
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    constructor(private profesionalService: ProfesionalService,
        public dialog: MatDialog,
        private toast: NgToastService,
        private router: Router,
        private changeDetectorRefs: ChangeDetectorRef,
        private especialidadService: EspecialidadService,
        private tituloService: TituloService,
    ) { }

    ngOnInit(): void {
        this.especialidadService.getEspecialidades().subscribe({
            next: especialidades => {
                this.especialidades = especialidades;
                console.log(this.especialidades);
            }
        });
        this.tituloService.getTitulos().subscribe({
            next: titulos => {
                this.titulos = titulos;
                console.log(this.titulos);
            }
        });
        this.cargarProfesionales();
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

    cargarProfesionales(): void {
        this.profesionalService.getProfesionales().subscribe(
            {
                next: profesionales => {
                    // this.dataSource.data = profesionales as ProfesionalDTO[];
                    console.log(profesionales);
                    this.dataSource.data = profesionales.map((profesional) => {
                        return {
                            dni: profesional.dni,
                            nombre: profesional.nombre,
                            apellido: profesional.apellido,
                            email: profesional.email,
                            direccion: profesional.direccion,
                            telefono: profesional.telefono,
                            fechaIngreso: profesional.fechaIngreso,
                            activo: profesional.activo,
                            especialidadId: profesional.especialidadId,
                            tituloId: profesional.tituloId,
                            formacionesComplementarias: profesional.formacionesComplementarias,
                            publicacionesRevistas: profesional.publicacionesRevistas,
                            presentacionesCongresos: profesional.presentacionesCongresos,
                            experienciaLaboral: profesional.experienciaLaboral,

                            // especialidad: this.especialidades.filter(x => x.especialidadId == profesional.especialidadId)[0].especialidad,
                            // titulo: this.titulos.filter(x => x.tituloId == profesional.tituloId)[0].titulo,
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

    mostrarEspecialidad(especialidadId: number): string{
        const especialidad = this.especialidades.filter(x => x.especialidadId == especialidadId)[0].especialidad;
        return especialidad;
    }

    // Eliminar profesionales
    deleteProfesional(dni: string) {
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
                    this.profesionalService.deleteProfesional(dni).subscribe({
                        next: data => {
                            console.log(data);
                            this.cargarProfesionales();  //vuelve a cargar la lista luego de eliminar un paciente
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


    // verUsuario(id: number) {
    //     let dialogRef = this.dialog.open(DetalleUsuarioComponent, { data: { id: id }, width: '40%' })
    //     dialogRef.afterClosed().subscribe(() => {
    //         this.cargarProfesionales();
    //     })
    // }

    // editarUsuario(id: number) {
    //     let dialogRef = this.dialog.open(EditarUsuarioComponent, { data: { id: id }, width: '40%' })
    //     dialogRef.afterClosed().subscribe(() => {
    //         this.cargarProfesionales();
    //     })
    // }

    // crearUsuario() {
    //     let dialogRef = this.dialog.open(NuevoUsuarioComponent, { width: '40%' });
    //     dialogRef.afterClosed().subscribe(() => {
    //         this.cargarProfesionales();
    //     })
    // }

}

