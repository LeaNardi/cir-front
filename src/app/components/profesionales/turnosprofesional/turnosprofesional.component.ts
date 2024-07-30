import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { TurnosService } from '../../../services/turnos.service';
import { TurnoDTO, TurnosGenerateDTO } from '../../../interfaces/turno';
import { startOfWeek, addDays, format, daysToWeeks } from 'date-fns';
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
import { Observable, forkJoin } from 'rxjs';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-turnosprofesional',
    templateUrl: './turnosprofesional.component.html',
    styleUrl: './turnosprofesional.component.css'
})
export class TurnosprofesionalComponent implements OnInit, AfterViewInit {
    displayedColumns: string[] = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    // columnNames: string[] = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes'];
    dayLabels = new Map<string, string>([]);
    dayNumbers = new Map<string, number>([]);

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

    profesionaldni!: string;
    horarioForm: FormGroup;
    horarioFormArray: FormArray;

    constructor(
        private turnosService: TurnosService,
        private datePipe: DatePipe,
        private router: Router,
        private aRoute: ActivatedRoute,
        private profesionalService: ProfesionalService,
        private fb: FormBuilder,
    ) {
        this.aRoute.paramMap.subscribe(params => {
            this.profesionaldni = params.get('profesionaldni') || '';
        });

        this.horarioForm = this.fb.group({
            inicio: [''],
            fin: ['']
        });

        this.horarioFormArray = this.fb.array([]);
        this.horarioFormArray.clear();
        this.displayedColumns.forEach((_, index) => {
            this.horarioFormArray.push(this.fb.group({
                inicio: [''],
                fin: ['']
            }));
        });

    }

    ngOnInit(): void {
        this.obtenerTurnosPorDia();

    }

    getFormGroup(index: number): FormGroup {
        return this.horarioFormArray.at(index) as FormGroup;
    }

    obtenerTurnosPorDia() {
        let startOfWeekDate = startOfWeek(new Date(), { weekStartsOn: 1 }); // Semana empieza el lunes
        startOfWeekDate = addDays(startOfWeekDate, this.currentPage * 7);

        const daysOfWeek = Array.from({ length: 6 }, (_, i) => addDays(startOfWeekDate, i));
        this.dayLabels = new Map<string, string>([
            ['monday', format(startOfWeekDate, 'EEEE dd/MM', { locale: es })],
            ['tuesday', format(addDays(startOfWeekDate, 1), 'EEEE dd/MM', { locale: es })],
            ['wednesday', format(addDays(startOfWeekDate, 2), 'EEEE dd/MM', { locale: es })],
            ['thursday', format(addDays(startOfWeekDate, 3), 'EEEE dd/MM', { locale: es })],
            ['friday', format(addDays(startOfWeekDate, 4), 'EEEE dd/MM', { locale: es })],
            ['saturday', format(addDays(startOfWeekDate, 5), 'EEEE dd/MM', { locale: es })]
        ]);



        const row: any = {};
        let observables = daysOfWeek.map(day => {
            const dayStr = format(day, 'yyyy-MM-dd');
            return this.turnosService.getTurnosParaProfesional(this.profesionaldni, dayStr);

        });


        forkJoin(observables).subscribe(results => {
            results.forEach((result, index) => {
                console.log(result)
                console.log("Original values for index :" + index);
                const day = format(daysOfWeek[index], 'eeee').toLowerCase();
                if (result.atencionInicio && result.atencionFin) {
                    // this.horarioForm.get('inicio')?.setValue(result.atencionInicio);
                    // this.horarioForm.get('fin')?.setValue(result.atencionFin);

                    console.log(this.horarioFormArray.at(index).get('inicio')?.value);
                    console.log(this.horarioFormArray.at(index).get('fin')?.value);
                    this.horarioFormArray.at(index).setValue({
                        inicio: result.atencionInicio,
                        fin: result.atencionFin
                    });
                    console.log("After patch:");
                    this.horarioFormArray.at(index).get('inicio')?.disable();
                    this.horarioFormArray.at(index).get('fin')?.disable();

                    console.log(`Inicio set ${result.atencionInicio} and Fin set ${result.atencionFin}`);
                    row[day] = {
                        start: this.formatHora(result.atencionInicio),
                        end: this.formatHora(result.atencionFin)
                    };
                } else {
                    this.horarioFormArray.at(index).get('inicio')?.enable();
                    this.horarioFormArray.at(index).get('fin')?.enable();
                    this.horarioFormArray.at(index).get('inicio')?.reset();
                    this.horarioFormArray.at(index).get('fin')?.reset();
                    row[day] = null;
                }
            });
        });

        console.log(row);
        this.dataSource.data = [row];



    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }


    generarTurnos(dayIndex: number, day: string) {
        let startOfWeekDate = startOfWeek(new Date(), { weekStartsOn: 1 }); // Semana empieza el lunes
        startOfWeekDate = addDays(startOfWeekDate, this.currentPage * 7);
        this.dayNumbers = new Map<string, number>([
            ['monday', 0],
            ['tuesday', 1],
            ['wednesday', 2],
            ['thursday', 3],
            ['friday', 4],
            ['saturday', 5]
        ]);

        const dayOfWeek = addDays(startOfWeekDate, Number(this.dayNumbers.get(day)))
        const dayStr = format(dayOfWeek, 'yyyy-MM-dd');

        // const inicio = this.horarioForm.get('inicio')?.value;
        // const fin = this.horarioForm.get('fin')?.value;
        const inicio = this.horarioFormArray.at(dayIndex).get('inicio')?.value;
        const fin = this.horarioFormArray.at(dayIndex).get('fin')?.value;

        const turnosGenerate: TurnosGenerateDTO = {
            profesionalDni: this.profesionaldni,
            fecha: dayStr,
            atencionInicio: inicio,
            atencionFin: fin,
            duracion: 15,
        }

        console.log(turnosGenerate);
        this.turnosService.generateTurnosParaProfesional(turnosGenerate).subscribe({
            next: response => {
                console.log(response);
                this.obtenerTurnosPorDia();
            }
        })


    }



    borrarTurnos(day: string) {
        let startOfWeekDate = startOfWeek(new Date(), { weekStartsOn: 1 }); // Semana empieza el lunes
        startOfWeekDate = addDays(startOfWeekDate, this.currentPage * 7);
        this.dayNumbers = new Map<string, number>([
            ['monday', 0],
            ['tuesday', 1],
            ['wednesday', 2],
            ['thursday', 3],
            ['friday', 4],
            ['saturday', 5]
        ]);

        const dayOfWeek = addDays(startOfWeekDate, Number(this.dayNumbers.get(day)))
        const dayStr = format(dayOfWeek, 'yyyy-MM-dd');


        this.turnosService.deleteTurnosParaProfesional(this.profesionaldni, dayStr).subscribe({
            next: response => {
                console.log(response);
                this.obtenerTurnosPorDia();
            }
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
        this.obtenerTurnosPorDia();
    }

    volver(): void {
        this.router.navigate(['/navigation/lista-profesionales']);

    }
}
