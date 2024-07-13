import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { TurnosService } from '../../../services/turnos.service';
import { TurnoDTO } from '../../../interfaces/turno';
import { startOfWeek, addDays, format } from 'date-fns';
import { es } from 'date-fns/locale';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../../services/authentication.service';
import swal from 'sweetalert2';
import { UserService } from '../../../services/user.service';
import { EspecialidadService } from '../../../services/especialidad.service';
import { EspecialidadDTO } from '../../../interfaces/especialidad';
import { ObraSocialDTO } from '../../../interfaces/obrasocial';
import { ObraSocialService } from '../../../services/obrasocial.service';
import { ProfesionalService } from '../../../services/profesional.service';
import { ProfesionalDTOSimp } from '../../../interfaces/profesional';
import { Observable } from 'rxjs';


@Component({
    selector: 'app-grilla-turnos',
    templateUrl: './grilla-turnos.component.html',
    styleUrl: './grilla-turnos.component.css'
})
export class GrillaTurnosComponent implements OnInit, AfterViewInit {
    displayedColumns: string[] = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];
    // columnNames: string[] = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes'];
    dayLabels = new Map<string, string>([
        ['monday', 'Lunes'],
        ['tuesday', 'Martes'],
        ['wednesday', 'Miércoles'],
        ['thursday', 'Jueves'],
        ['friday', 'Viernes']
    ]);
    dataSource = new MatTableDataSource<any>();

    horarios = [
        '08:00:00', '08:15:00', '08:30:00', '08:45:00', '09:00:00', '09:15:00', '09:30:00', '09:45:00',
        '10:00:00', '10:15:00', '10:30:00', '10:45:00', '11:00:00', '11:15:00', '11:30:00', '11:45:00',
        '12:00:00', '12:15:00', '12:30:00', '12:45:00', '13:00:00', '13:15:00', '13:30:00', '13:45:00',
        '14:00:00', '14:15:00', '14:30:00', '14:45:00', '15:00:00', '15:15:00', '15:30:00', '15:45:00',
        '16:00:00', '16:15:00', '16:30:00', '16:45:00', '17:00:00', '17:15:00', '17:30:00', '17:45:00'
    ]

    currentPage: number = 0;
    totalPages: number = 4;

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    obraSocialId!: number;
    especialidadId!: number;
    profesionaldni!: string;

    nombre: string = "";
    apellido: string = "";

    especialidades: EspecialidadDTO[] = [];
    obrassociales: ObraSocialDTO[] = [];
    profesionalSimp!: ProfesionalDTOSimp;


    constructor(
        private turnosService: TurnosService,
        private datePipe: DatePipe,
        private router: Router,
        private aRoute: ActivatedRoute,
        private auth: AuthenticationService,
        private userService: UserService,
        private especialidadService: EspecialidadService,
        private obrasocialService: ObraSocialService,
        private profesionalService: ProfesionalService,
    ) {
        this.aRoute.paramMap.subscribe(params => {
            this.obraSocialId = Number(params.get('obraSocialId'));
            this.especialidadId = Number(params.get('especialidadId'));
            this.profesionaldni = params.get('profesionaldni') || '';

            console.log(this.obraSocialId, this.especialidadId, this.profesionaldni);
        });

    }

    ngOnInit(): void {
        this.loadTurnos(this.profesionaldni);
        const username = this.auth.getUserName();
        if (username) {
            this.userService.getMyUser(username).subscribe({
                next: usuario => {
                    this.nombre = usuario.name;
                    this.apellido = usuario.surname;
                }
            })
        }

        this.especialidadService.getEspecialidades().subscribe({
            next: especialidades => {
                this.especialidades = especialidades;
            }
        });
        this.obrasocialService.getObrasSociales().subscribe({
            next: obrassociales => {
                this.obrassociales = obrassociales;
            }
        });

        this.profesionalService.getProfesionalSimplified(this.profesionaldni).subscribe({
            next: prof => {
                this.profesionalSimp = prof;
            }
        })
    }

    loadTurnos(profesionalDni: string) {
        this.turnosService.getTurnosDisponibles(profesionalDni).subscribe({
            next: data => {
                this.dataSource.data = this.transformTurnos(data);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
            },
            error: err => {
                console.error('Error al obtener los turnos disponibles', err);
            }
        });
    }

    transformTurnos(turnos: TurnoDTO[]): any[] {
        let startOfWeekDate = startOfWeek(new Date(), { weekStartsOn: 1 }); // Semana empieza el lunes
        startOfWeekDate = addDays(startOfWeekDate, this.currentPage * 7);
        console.log("startOfWeekDate: ", startOfWeekDate.toISOString());
        const formattedDate = format(startOfWeekDate, 'EEEE dd/MM', { locale: es });
        console.log("startOfWeekDate: ", formattedDate);

        const daysOfWeek = Array.from({ length: 7 }, (_, i) => addDays(startOfWeekDate, i));
        // console.log("daysOfWeek: ", daysOfWeek.map(x => x.toISOString()));
        this.dayLabels = new Map<string, string>([
            ['monday', format(startOfWeekDate, 'EEEE dd/MM', { locale: es })],
            ['tuesday', format(addDays(startOfWeekDate, 1), 'EEEE dd/MM', { locale: es })],
            ['wednesday', format(addDays(startOfWeekDate, 2), 'EEEE dd/MM', { locale: es })],
            ['thursday', format(addDays(startOfWeekDate, 3), 'EEEE dd/MM', { locale: es })],
            ['friday', format(addDays(startOfWeekDate, 4), 'EEEE dd/MM', { locale: es })]
        ]);


        return this.horarios.map(hora => {
            const row: any = { hora };
            daysOfWeek.forEach(day => {
                const dayStr = format(day, 'yyyy-MM-dd');
                const turno = turnos.find(t => t.fecha === dayStr && t.hora === hora);
                if (typeof turno != "undefined") {
                    row[format(day, 'eeee').toLowerCase()] = turno.pacienteId !== 0 ? 0 : turno.turnoId;
                } else {
                    row[format(day, 'eeee').toLowerCase()] = 0;
                }
            });

            return row;
        });
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    solicitarTurno(turnoId: number, dia: string | undefined, hora: string) {
        const userId = this.auth.getUserId();
        const turno: TurnoDTO = {
            "turnoId": turnoId,
            "profesionalDni": "35584700", //this.profesionalDni;
            "fecha": "2000-01-01",
            "hora": "00:00:00",
            "obraSocialId": this.obraSocialId,
            "pacienteId": Number(userId),
        };

        swal.fire({
            title: '¿Confirmar turno?',
            // text: "Está solicitando el siguiente turno:",
            html: `Está solicitando el siguiente turno:<br>
            Paciente: ${this.nombre} ${this.apellido}<br>
            Obra Social: ${this.obrassociales.filter(x => x.obraSocialId == this.obraSocialId)[0].obraSocial}<br>
            Profesional: ${this.profesionalSimp.nombre} ${this.profesionalSimp.apellido}<br>
            Especialidad: ${this.especialidades.filter(x => x.especialidadId == this.especialidadId)[0].especialidad}<br>
            Día: ${dia}<br>
            Horario: ${hora}`,
            showCancelButton: true,
            cancelButtonColor: '#d33',
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar',
            buttonsStyling: true
        }).then((result) => {
            if (result.isConfirmed) {
                let turnosExistentes;
                this.turnosService.getMisTurnos(Number(this.auth.getUserId())).subscribe({
                    next: turnos => {
                        turnosExistentes = turnos.filter(t => t.profesionalDni === this.profesionaldni);
                        const cantidad = turnosExistentes.length;
                        if (cantidad > 0) {
                            let htmlmessage = "";
                            turnosExistentes.forEach(element => {
                                htmlmessage += `${format(element.fecha, 'EEEE dd/MM', { locale: es })} - ${element.hora} <br>`
                            });

                            swal.fire({
                                title: 'Turnos existentes',
                                html: `Usted ya tiene turnos con el profesional ${this.profesionalSimp.nombre} ${this.profesionalSimp.apellido}:<br>
                                ${htmlmessage}<br>
                                ¿Desea reservar este turno igualmente?`,
                                showCancelButton: true,
                                cancelButtonColor: '#d33',
                                confirmButtonText: 'Confirmar',
                                cancelButtonText: 'Cancelar',
                                buttonsStyling: true
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    this.turnosService.reservarTurno(turno).subscribe({
                                        next: response => {
                                            this.router.navigate(['/navigation/lista-turnos']);
                                        }
                                    });
                                }
                            })
                        } else {
                            this.turnosService.reservarTurno(turno).subscribe({
                                next: response => {
                                    this.router.navigate(['/navigation/lista-turnos']);
                                }
                            });
                        }
                    },
                });
            }
            //if (result.isDismissed) {
            //this.router.navigate(['/navigation/lista-profesionales']);
            //}
        })
    }


    formatHora(hora: string): string {
        return this.datePipe.transform(`1970-01-01T${hora}`, 'HH:mm') || hora;
    }

    changePage(increment: number): void {
        const newPage = this.currentPage + increment;
        if (newPage >= 0 && newPage < this.totalPages) {
            this.currentPage = newPage;
        }
        this.loadTurnos(this.profesionaldni);
    }
}
