import { Component, OnInit } from '@angular/core';
import { ProfesionalDTO } from '../../../interfaces/profesional';
import { ProfesionalService } from '../../../services/profesional.service';
import { TituloService } from '../../../services/titulo.service';
import { EspecialidadService } from '../../../services/especialidad.service';
import { EspecialidadDTO } from '../../../interfaces/especialidad';
import { TituloDTO } from '../../../interfaces/titulo';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';
import { TurnosService } from '../../../services/turnos.service';
import swal from 'sweetalert2';


@Component({
    selector: 'app-editar-profesional',
    templateUrl: './editar-profesional.component.html',
    styleUrl: './editar-profesional.component.css'
})
export class EditarProfesionalComponent implements OnInit {
    dni: string;
    // profesional: ProfesionalDTO;
    profesionalForm!: FormGroup;
    especialidades: EspecialidadDTO[] = [];
    titulos: TituloDTO[] = [];
    currentPage: number = 0;
    totalPages: number = 2;
    activo: boolean = true;

    motivosbaja: string[] = [
        "Jubilación",
        "Disconforme con la clínica",
        "Otro"
    ];

    constructor(private profesionalService: ProfesionalService,
        private especialidadService: EspecialidadService,
        private tituloService: TituloService,
        private aRoute: ActivatedRoute,
        private router: Router,
        private fb: FormBuilder,
        private turnosService: TurnosService,
    ) {
        this.dni = this.aRoute.snapshot.paramMap.get('dni') || '';

    }

    ngOnInit(): void {
        this.profesionalForm = this.fb.group({
            dni: ['', [Validators.required]],
            nombre: ['', [Validators.required, Validators.minLength(2)]],
            apellido: ['', [Validators.required, Validators.minLength(2)]],
            email: ['', [Validators.required, Validators.email]],
            direccion: ['', [Validators.required, Validators.minLength(4)]],
            telefono: ['', [Validators.required, Validators.pattern('^[+]?[- ()0-9]{6,15}')]],
            fechaIngreso: [formatDate(new Date(), 'yyyy-MM-dd', 'en'), [Validators.required]],
            // activo: [true, [Validators.required]],
            motivobaja: [''],
            especialidadId: [1, [Validators.required]],
            tituloId: [1, [Validators.required]],
            formacionesComplementarias: this.fb.array([]),
            publicacionesRevistas: this.fb.array([]),
            presentacionesCongresos: this.fb.array([]),
            experienciaLaboral: this.fb.array([]),
        });
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
        this.cargarProfesional(this.dni);

        this.profesionalForm.get('dni')?.disable();
    }

    cargarProfesional(dni: string) {
        this.profesionalService.getProfesional(dni).subscribe({
            next: prof => {
                console.log(prof);
                this.profesionalForm.get('dni')?.setValue(prof.dni);
                this.profesionalForm.get('nombre')?.setValue(prof.nombre);
                this.profesionalForm.get('apellido')?.setValue(prof.apellido);
                this.profesionalForm.get('email')?.setValue(prof.email);
                this.profesionalForm.get('direccion')?.setValue(prof.direccion);
                this.profesionalForm.get('telefono')?.setValue(prof.telefono);
                this.profesionalForm.get('fechaIngreso')?.setValue(formatDate(prof.fechaIngreso, 'yyyy-MM-dd', 'en'));
                // this.profesionalForm.get('activo')?.setValue(prof.activo);
                this.activo = prof.activo;
                this.profesionalForm.get('motivobaja')?.setValue(prof.motivobaja);
                this.profesionalForm.get('especialidadId')?.setValue(prof.especialidadId);
                this.profesionalForm.get('tituloId')?.setValue(prof.tituloId);
                prof.formacionesComplementarias.forEach(element => {
                    const item = this.fb.group({
                        item: [element, Validators.required],
                    });
                    this.formacionesComplementariasForm.push(item);
                });
                prof.publicacionesRevistas.forEach(element => {
                    const item = this.fb.group({
                        item: [element, Validators.required],
                    });
                    this.publicacionesRevistasForm.push(item);
                });
                prof.presentacionesCongresos.forEach(element => {
                    const item = this.fb.group({
                        item: [element, Validators.required],
                    });
                    this.presentacionesCongresosForm.push(item);
                });
                prof.experienciaLaboral.forEach(element => {
                    const item = this.fb.group({
                        item: [element, Validators.required],
                    });
                    this.experienciaLaboralForm.push(item);
                });
            },
            error: err => {
                console.log(err);
            }
        })
    }

    get formacionesComplementariasForm() {
        return this.profesionalForm.controls['formacionesComplementarias'] as FormArray
    }
    addFormacion(): void {
        const formacionForm = this.fb.group({
            item: ['', Validators.required],
        });

        this.formacionesComplementariasForm.push(formacionForm);
    }
    removeFormacion(index: number): void {
        this.formacionesComplementariasForm.removeAt(index);
    }

    get publicacionesRevistasForm() {
        return this.profesionalForm.controls['publicacionesRevistas'] as FormArray
    }
    addPublicacion(): void {
        const publicacionForm = this.fb.group({
            item: ['', Validators.required],
        });

        this.publicacionesRevistasForm.push(publicacionForm);
    }
    removePublicacion(index: number): void {
        this.publicacionesRevistasForm.removeAt(index);
    }

    get presentacionesCongresosForm() {
        return this.profesionalForm.controls['presentacionesCongresos'] as FormArray
    }
    addPresentacion(): void {
        const presentacionForm = this.fb.group({
            item: ['', Validators.required],
        });

        this.presentacionesCongresosForm.push(presentacionForm);
    }
    removePresentacion(index: number): void {
        this.presentacionesCongresosForm.removeAt(index);
    }

    get experienciaLaboralForm() {
        return this.profesionalForm.controls['experienciaLaboral'] as FormArray
    }
    addExperiencia(): void {
        const experienciaForm = this.fb.group({
            item: ['', Validators.required],
        });

        this.experienciaLaboralForm.push(experienciaForm);
    }
    removeExperiencia(index: number): void {
        this.experienciaLaboralForm.removeAt(index);
    }


    changePage(increment: number): void {
        const newPage = this.currentPage + increment;
        if (newPage >= 0 && newPage < this.totalPages) {
            this.currentPage = newPage;
        }
    }

    // get profesionalActivo() {
    //     return this.profesionalForm.controls['activo']
    // }
    changeActivo(): void {
        console.log(this.activo)
        if (this.activo){
            this.activo = false;
        } else {

            this.activo = true;
            this.profesionalForm.get('motivobaja')?.setValue(null);
        }
    }

    guardar(): void {
        const activo = this.profesionalForm.get('activo')?.value;

        const profesional: ProfesionalDTO = {
            dni: this.profesionalForm.get('dni')?.value,
            nombre: this.profesionalForm.get('nombre')?.value,
            apellido: this.profesionalForm.get('apellido')?.value,
            email: this.profesionalForm.get('email')?.value,
            direccion: this.profesionalForm.get('direccion')?.value,
            telefono: this.profesionalForm.get('telefono')?.value,
            fechaIngreso: this.profesionalForm.get('fechaIngreso')?.value,
            activo: this.activo,
            motivobaja: activo ? null : this.profesionalForm.get('motivobaja')?.value,
            especialidadId: this.profesionalForm.get('especialidadId')?.value,
            tituloId: this.profesionalForm.get('tituloId')?.value,
            formacionesComplementarias: (this.profesionalForm.get('formacionesComplementarias')?.value as { item: string }[]).map(obj => obj.item),
            publicacionesRevistas: (this.profesionalForm.get('publicacionesRevistas')?.value as { item: string }[]).map(obj => obj.item),
            presentacionesCongresos: (this.profesionalForm.get('presentacionesCongresos')?.value as { item: string }[]).map(obj => obj.item),
            experienciaLaboral: (this.profesionalForm.get('experienciaLaboral')?.value as { item: string }[]).map(obj => obj.item),
        }


        // MEJORA: Podría chequearse que el profesional no tiene turnos para dar de baja
        this.turnosService.getCantidadTurnosOcupados(profesional.dni).subscribe({
            next: cantidadturnos => {
                console.log(`Cantidad de turnos: ${cantidadturnos}`);
                console.log(`Activo?: ${profesional.activo}`);
                if (cantidadturnos > 0 && profesional.activo === false) {
                    swal.fire({
                        title: 'No se puede dar de baja al profesional',
                        html: `El profesional que intenta eliminar posee turnos asignados.<br>
                        Por favor, cancelar todos los turnos antes de realizar esta acción.`,
                        confirmButtonText: 'Aceptar',
                        buttonsStyling: true
                    })
                } else {
                    this.profesionalService.updateProfesional(profesional.dni, profesional).subscribe({
                        next: res => {
                            console.log(res)
                            this.router.navigate(['/navigation/lista-profesionales']);

                        },
                        error: err => {
                        }

                    })
                }
            }
        })
    }





}