import { Component, OnInit } from '@angular/core';

import { TurnoDTO } from '../../../interfaces/turno';
import { ProfesionalDTO, ProfesionalDTOSimp } from '../../../interfaces/profesional';
import { ProfesionalService } from '../../../services/profesional.service';
import { EspecialidadService } from '../../../services/especialidad.service';
import { EspecialidadDTO } from '../../../interfaces/especialidad';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ObraSocialDTO } from '../../../interfaces/obrasocial';
import { ObraSocialService } from '../../../services/obrasocial.service';

@Component({
    selector: 'app-solicitar-turno',
    templateUrl: './solicitar-turno.component.html',
    styleUrl: './solicitar-turno.component.css'
})
export class SolicitarTurnoComponent implements OnInit {
    obrassociales: ObraSocialDTO[] = [];
    especialidades: EspecialidadDTO[] = [];
    profesionales: ProfesionalDTOSimp[] = [];
    profesionalesFiltrados: ProfesionalDTOSimp[] = [];

    nuevoTurnoForm!: FormGroup;

    obraSocialId!: number;
    especialidadId!: number;
    profesionaldni!: string;

    constructor(
        private obrasocialService: ObraSocialService,
        private especialidadService: EspecialidadService,
        private profesionalService: ProfesionalService,
        private aRoute: ActivatedRoute,
        private router: Router,
        private fb: FormBuilder,
    ) {
        this.aRoute.paramMap.subscribe(params => {
            this.obraSocialId = Number(params.get('obraSocialId'));
            this.especialidadId = Number(params.get('especialidadId'));
            this.profesionaldni = params.get('profesionaldni') || '';

            console.log(this.obraSocialId, this.especialidadId, this.profesionaldni);
        });
    }

    ngOnInit(): void {
        this.nuevoTurnoForm = this.fb.group({
            obraSocialId: [this.obraSocialId, [Validators.required]],
            especialidadId: [this.especialidadId, [Validators.required]],
            profesionaldni: [this.profesionaldni, [Validators.required]],
        });


        this.obrasocialService.getObrasSociales().subscribe({
            next: obrassociales => {
                this.obrassociales = obrassociales;
            }
        });
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

        this.nuevoTurnoForm.get('especialidadId')?.valueChanges.subscribe({
            next: (value) => {
                this.filterProfesionalesByEspecialidad(value);
            }
        })
    }


    filterProfesionalesByEspecialidad(especialidadId: number): void {
        this.profesionalesFiltrados = this.profesionales.filter(prof => prof.especialidadId === especialidadId);
    }



    solicitar(): void {
        const obraSocialId = this.nuevoTurnoForm.get('obraSocialId')?.value;
        const especialidadId = this.nuevoTurnoForm.get('especialidadId')?.value;
        const profesionaldni = this.nuevoTurnoForm.get('profesionaldni')?.value;

        // this.router.navigate(['/navigation/grilla-turnos'], datos);
        this.router.navigate(['/navigation/grilla-turnos', obraSocialId, especialidadId, profesionaldni]); // VER!!!!!!!

    }

}