import { Component, OnInit } from '@angular/core';
import { ProfesionalDTO } from '../../../interfaces/profesional';
import { ProfesionalService } from '../../../services/profesional.service';
import { TituloService } from '../../../services/titulo.service';
import { EspecialidadService } from '../../../services/especialidad.service';
import { EspecialidadDTO } from '../../../interfaces/especialidad';
import { TituloDTO } from '../../../interfaces/titulo';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-detalle-profesional',
    templateUrl: './detalle-profesional.component.html',
    styleUrl: './detalle-profesional.component.css'
})
export class DetalleProfesionalComponent implements OnInit {
    dni: string;
    profesional: ProfesionalDTO;
    editDisabled = true;
    especialidades: EspecialidadDTO[] = [];
    titulos: TituloDTO[] = [];


    constructor(private profesionalService: ProfesionalService,
        private especialidadService: EspecialidadService,
        private tituloService: TituloService,
        private aRoute: ActivatedRoute,
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
                // this.dataSource.data = profesionales as ProfesionalDTO[];
                console.log(prof);
                this.profesional = { ...prof };
                // this.profesional.dni = prof.dni;
                // this.profesional.nombre = prof.nombre;
                // this.profesional.apellido = prof.apellido;
                // this.profesional.email = prof.email;
                // this.profesional.direccion = prof.direccion;
                // this.profesional.telefono = prof.telefono;
                // this.profesional.fechaIngreso = prof.fechaIngreso;
                // this.profesional.especialidadId = prof.especialidadId;
                // this.profesional.tituloId = prof.tituloId;
                // this.profesional.formacionesComplementarias = prof.formacionesComplementarias;
                // this.profesional.publicacionesRevistas = prof.publicacionesRevistas;
                // this.profesional.presentacionesCongresos = prof.presentacionesCongresos;
                // this.profesional.experienciaLaboral = prof.experienciaLaboral;

                // especialidad: this.especialidades.filter(x => x.especialidadId == profesional.especialidadId)[0].especialidad,
                // titulo: this.titulos.filter(x => x.tituloId == profesional.tituloId)[0].titulo,

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


}