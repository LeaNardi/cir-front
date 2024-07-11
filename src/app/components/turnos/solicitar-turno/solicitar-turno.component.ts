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
    nuevoTurnoForm!: FormGroup;

    constructor(
        private obrasocialService: ObraSocialService,
        private especialidadService: EspecialidadService,
        private profesionalService: ProfesionalService,
        private aRoute: ActivatedRoute,
        private router: Router,
        private fb: FormBuilder,
    ) { }

    ngOnInit(): void {
        this.nuevoTurnoForm = this.fb.group({
            obraSocialId: [1, [Validators.required]],
            especialidadId: [1, [Validators.required]],
            profesionaldni: ['', [Validators.required]],
        });


        this.obrasocialService.getObraSociales().subscribe({
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
    }




    solicitar(): void {
        const datos = {
            obraSocialId: this.nuevoTurnoForm.get('obraSocialId')?.value,
            especialidadId: this.nuevoTurnoForm.get('especialidadId')?.value,
            profesionaldni: this.nuevoTurnoForm.get('profesionaldni')?.value,
        }

        console.log(datos);

        // this.router.navigate(['/navigation/grilla-turnos'], datos);
        this.router.navigate(['/navigation/grilla-turnos'], {state: datos}); // VER!!!!!!!

    }

}