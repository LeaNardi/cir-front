import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { TurnosService } from '../../../services/turnos.service';
import { TurnoDTO } from '../../../interfaces/turno';
import { startOfWeek, addDays, format } from 'date-fns';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../../services/authentication.service';

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

    fecha = '';
    horarios = [
        '08:00:00', '08:15:00', '08:30:00', '08:45:00', '09:00:00', '09:15:00', '09:30:00', '09:45:00',
        '10:00:00', '10:15:00', '10:30:00', '10:45:00', '11:00:00', '11:15:00', '11:30:00', '11:45:00',
        '12:00:00', '12:15:00', '12:30:00', '12:45:00', '13:00:00', '13:15:00', '13:30:00', '13:45:00',
        '14:00:00', '14:15:00', '14:30:00', '14:45:00', '15:00:00', '15:15:00', '15:30:00', '15:45:00',
        '16:00:00', '16:15:00', '16:30:00', '16:45:00', '17:00:00', '17:15:00', '17:30:00', '17:45:00'
    ]


    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    obraSocialId!: number;
    especialidadId!: number;
    profesionaldni!: string;

    constructor(
        private turnosService: TurnosService,
        private datePipe: DatePipe,
        private router: Router,
        private aRoute: ActivatedRoute,
        private auth: AuthenticationService

    ) {
        // const navigation = this.router.getCurrentNavigation();
        // const state = navigation?.extras.state as { obraSocialId: number, especialidadId: number, profesionaldni: string };

        // console.log(state);
        // this.obraSocialId = state.obraSocialId;
        // this.especialidadId = state.especialidadId;
        // this.profesionaldni = state.profesionaldni;

        // if (state && state.data) {
        //     this.obraSocialId = state.data.obraSocialId;
        //     this.especialidadId = state.data.especialidadId;
        //     this.profesionaldni = state.data.profesionaldni;
        // }
        this.aRoute.paramMap.subscribe(params => {
            this.obraSocialId = Number(params.get('obraSocialId'));
            this.especialidadId = Number(params.get('especialidadId'));
            this.profesionaldni = params.get('profesionaldni') || '';

            console.log(this.obraSocialId, this.especialidadId, this.profesionaldni);
        });

    }

    ngOnInit(): void {
        this.loadTurnos('35584700'); // Puedes cambiar el DNI del profesional según sea necesario
        this.fecha = '2024-07-10';


        console.log(this.obraSocialId);
        console.log(this.especialidadId);
        console.log(this.profesionaldni);


    }

    loadTurnos(profesionalDni: string) {
        const fecha = '2024-07-10';
        this.turnosService.getTurnosDisponibles(profesionalDni, fecha).subscribe({
            next: data => {
                // console.log("data");
                console.log(data);
                console.log("transform(data)");
                console.log(this.transformTurnos(data));
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
        const startOfWeekDate = startOfWeek(new Date(), { weekStartsOn: 1 }); // Semana empieza el lunes
        // console.log("startOfWeekDate: ", startOfWeekDate.toISOString());
        const daysOfWeek = Array.from({ length: 7 }, (_, i) => addDays(startOfWeekDate, i));
        // console.log("daysOfWeek: ", daysOfWeek.map(x => x.toISOString()));


        // const horarios = Array.from(new Set(turnos.map(t => t.hora))); // Obtener horarios únicos
        // console.log("horarios: ", horarios);


        return this.horarios.map(hora => {
            const row: any = { hora };
            daysOfWeek.forEach(day => {
                const dayStr = format(day, 'yyyy-MM-dd');
                const turno = turnos.find(t => t.fecha === dayStr && t.hora === hora);
                // console.log(turno);
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

    solicitarTurno(turnoId: number) {
        // console.log(`Solicitando turno para el ${dia} a las ${hora}`);
        console.log(`Solicitando turno para el id ${turnoId}`);

        const userId = this.auth.getUserId();


        const turno: TurnoDTO = {
            "turnoId": turnoId,
            "profesionalDni": "35584700", //this.profesionalDni;
            "fecha": "2000-01-01",
            "hora": "00:00:00",
            "obraSocialId": this.obraSocialId,
            "pacienteId": Number(userId),
        };

        console.log(turno);
        this.turnosService.reservarTurno(turno).subscribe({
            next: response => {
                console.log(response);
            }
        });

    }

    formatHora(hora: string): string {
        return this.datePipe.transform(`1970-01-01T${hora}`, 'HH:mm') || hora;
    }
}
