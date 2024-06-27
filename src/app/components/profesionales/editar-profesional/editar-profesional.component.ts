import { Component, OnInit } from '@angular/core';
import { ProfesionalDTO } from '../../../interfaces/profesional';
import { ProfesionalService } from '../../../services/profesional.service';
import { TituloService } from '../../../services/titulo.service';
import { EspecialidadService } from '../../../services/especialidad.service';
import { EspecialidadDTO } from '../../../interfaces/especialidad';
import { TituloDTO } from '../../../interfaces/titulo';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-editar-profesional',
    templateUrl: './editar-profesional.component.html',
    styleUrl: './editar-profesional.component.css'
})
export class EditarProfesionalComponent implements OnInit {
    dni: string;
    profesional: ProfesionalDTO;
    editDisabled = false;
    especialidades: EspecialidadDTO[] = [];
    titulos: TituloDTO[] = [];
    currentPage: number = 0;
    totalPages: number = 3;

    constructor(private profesionalService: ProfesionalService,
        private especialidadService: EspecialidadService,
        private tituloService: TituloService,
        private aRoute: ActivatedRoute,
        private router: Router,
    ) {
        this.dni = this.aRoute.snapshot.paramMap.get('dni') || '';
        this.profesional = {
            dni: "",
            nombre: "",
            apellido: "",
            email: "",
            direccion: "",
            telefono: "",
            fechaIngreso: new Date(),
            especialidadId: 0,
            tituloId: 0,
            formacionesComplementarias: [""],
            publicacionesRevistas: [""],
            presentacionesCongresos: [""],
            experienciaLaboral: [""],
        }
    }

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
        console.log(this.dni)
        this.cargarProfesional(this.dni);
    }

    cargarProfesional(dni: string) {
        this.profesionalService.getProfesional(dni).subscribe({
            next: prof => {
                console.log(prof);
                this.profesional = { ...prof };
            },
            error: err => {
                console.log(err);
            }

        })
    }

    get formattedFechaIngreso(): string {
        if (!(this.profesional.fechaIngreso instanceof Date)) {
            this.profesional.fechaIngreso = new Date(this.profesional.fechaIngreso);
        }
        return this.profesional.fechaIngreso.toISOString().split('T')[0];
    }

    set formattedFechaIngreso(value: string) {
        this.profesional.fechaIngreso = new Date(value);
    }

    addFormacion(): void {
        this.profesional.formacionesComplementarias.push("");
    }

    removeFormacion(index: number): void {
        if (this.profesional.formacionesComplementarias.length > 0) {
            this.profesional.formacionesComplementarias.splice(index, 1);
        }
    }

    addPublicacion(): void {
        this.profesional.publicacionesRevistas.push("");
    }

    removePublicacion(index: number): void {
        if (this.profesional.publicacionesRevistas.length > 0) {
            this.profesional.publicacionesRevistas.splice(index, 1);
        }
    }

    addPresentacion(): void {
        this.profesional.presentacionesCongresos.push("");
    }

    removePresentacion(index: number): void {
        if (this.profesional.presentacionesCongresos.length > 0) {
            this.profesional.presentacionesCongresos.splice(index, 1);
        }
    }

    addExperiencia(): void {
        this.profesional.experienciaLaboral.push("");
    }

    removeExperiencia(index: number): void {
        if (this.profesional.experienciaLaboral.length > 0) {
            this.profesional.experienciaLaboral.splice(index, 1);
        }
    }

    trackByFn(index: number, item: string): any {
        return index;
    }

    changePage(increment: number): void {
        const newPage = this.currentPage + increment;
        if (newPage >= 0 && newPage < this.totalPages) {
            this.currentPage = newPage;
        }
    }

    guardar(): void {
        //this.editarUsuario();
        //this.editDisabled = true;
        console.log(this.profesional);
        this.profesionalService.updateProfesional(this.profesional.dni, this.profesional).subscribe({
            next: res => {
                console.log(res)
                this.router.navigate(['/navigation/lista-profesionales']);

            },
            error: err => {
            }

        })
    }





}