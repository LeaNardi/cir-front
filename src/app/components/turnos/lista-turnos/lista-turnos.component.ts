import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { TurnoDTO } from '../../../interfaces/turno';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';import { MatTable, MatTableDataSource } from '@angular/material/table';
import { TurnosService } from '../../../services/turnos.service';
import { AuthenticationService } from '../../../services/authentication.service';
import swal from 'sweetalert2';
import { ProfesionalService } from '../../../services/profesional.service';
import { EspecialidadService } from '../../../services/especialidad.service';
import { EspecialidadDTO } from '../../../interfaces/especialidad';
import { ProfesionalDTOSimp } from '../../../interfaces/profesional';

@Component({
    selector: 'app-lista-turnos',
    templateUrl: './lista-turnos.component.html',
    styleUrl: './lista-turnos.component.css'
})
export class ListaTurnosComponent implements OnInit {
    turnos: TurnoDTO[] = [];
    displayedColumns = ['fecha', 'profesionalDni', 'Hora', 'Cancelar'];
    dataSource = new MatTableDataSource<TurnoDTO>(this.turnos);

    especialidades: EspecialidadDTO[] = [];
    profesionales: ProfesionalDTOSimp[] = [];

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    constructor(
        private auth: AuthenticationService,
        private turnosService: TurnosService,
        private especialidadService: EspecialidadService,
        private profesionalService: ProfesionalService,
    ){

    }

    ngOnInit(): void {
        this.especialidadService.getEspecialidades().subscribe({
            next: especialidades => {
                this.especialidades = especialidades;
            }
        });
        this.profesionalService.getProfesionalesSimplified().subscribe({
            next: profesionales => {
                this.profesionales = profesionales;
            }
        });
        this.cargarMisTurnos();
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    cargarMisTurnos(): void {
        this.turnosService.getMisTurnos(Number(this.auth.getUserId())).subscribe(
            {
                next: turnos => {
                    this.dataSource.data = turnos as TurnoDTO[];
                },
                error: err => {
                    console.log(err);
                }
            }
        );
    }

    cancelarTurno(turno: TurnoDTO) {
        swal.fire({
            title: '¿Esta seguro?',
            text: "¿Confirma que desea cancelar el turno?",
            showCancelButton: true,
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si',
            cancelButtonText: 'No',
            buttonsStyling: true
        })
            .then((result) => {
                if (result.value) {
                    console.log(turno);
                    this.turnosService.cancelarTurno(turno).subscribe({
                        next: data => {
                            this.cargarMisTurnos();  //vuelve a cargar la lista luego de eliminar un paciente
                            
                        },

                        error: err => {
                            console.log(err);
                        }//error
                    } //service
                    ); //subscribe  
                }
            })
    }

    getProfesional(dni: string){
        const profesional = this.profesionales.filter(p => p.dni === dni )[0];
        return profesional;
    }

}
