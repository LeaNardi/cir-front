import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { TurnosService } from '../../../services/turnos.service';
import { TurnoDTO } from '../../../interfaces/turno';
import { startOfWeek, addDays, format } from 'date-fns';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-grilla-turnos',
    templateUrl: './grilla-turnos.component.html',
    styleUrl: './grilla-turnos.component.css'
})
export class GrillaTurnosComponent implements OnInit, AfterViewInit {
    displayedColumns: string[] = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes'];
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

    constructor(private turnosService: TurnosService, private datePipe: DatePipe) { }

    ngOnInit(): void {
        this.loadTurnos('35584700'); // Puedes cambiar el DNI del profesional según sea necesario
        this.fecha = '2024-07-10';

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
                if(typeof turno != "undefined"){
                    row[format(day, 'eeee').toLowerCase()] = turno.pacienteId !== 0 ? 'Ocupado' : 'libre';
                }else{
                    row[format(day, 'eeee').toLowerCase()] = 'No existe';
                }
            });
            
            return row;
        });
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    solicitarTurno(hora: string, dia: string){
        console.log(`Solicitando turno para el ${dia} a las ${hora}`);
    }
    
    formatHora(hora: string): string {
        return this.datePipe.transform(`1970-01-01T${hora}`, 'HH:mm') || hora;
    }
}
