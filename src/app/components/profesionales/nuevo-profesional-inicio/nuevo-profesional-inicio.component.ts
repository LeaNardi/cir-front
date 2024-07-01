import { Component, OnInit } from '@angular/core';
import { ProfesionalService } from '../../../services/profesional.service';
import { ActivatedRoute, Router } from '@angular/router';
import swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-nuevo-profesional-inicio',
    templateUrl: './nuevo-profesional-inicio.component.html',
    styleUrl: './nuevo-profesional-inicio.component.css'
})
export class NuevoProfesionalInicioComponent implements OnInit {
    // dni: string;
    profesionalForm!: FormGroup;

    constructor(private profesionalService: ProfesionalService,
        private aRoute: ActivatedRoute,
        private router: Router,
        private fb: FormBuilder,
    ) {
        // this.dni = '';
    }

    ngOnInit(): void {
        this.profesionalForm = this.fb.group({
            dni: ['', [Validators.required, Validators.pattern('[0-9]{7,10}')]]
        });
    }

    siguiente(): void {
        if (this.profesionalForm.invalid) {
            this.profesionalForm.markAllAsTouched();
            return;
        }

        const dni = this.profesionalForm.get('dni')?.value;
        this.profesionalService.existsProfesional(dni).subscribe({
            next: response => {
                if (response.exists) {
                    if (response.active) {
                        swal.fire({
                            title: 'Ya existe profesional',
                            text: "El profesional ya existe en la base de datos",
                            confirmButtonText: 'Aceptar',
                            buttonsStyling: true
                        })
                            .then((result) => {
                                if (result.isConfirmed) {
                                    this.router.navigate(['/navigation/lista-profesionales']);
                                }
                            })
                    } else {
                        swal.fire({
                            title: 'Ya existe profesional',
                            text: "El profesional existe en la base de datos, pero se encuentra deshabilitado. ¿Desea darlo de alta?",
                            showCancelButton: true,
                            cancelButtonColor: '#d33',
                            confirmButtonText: 'Si',
                            cancelButtonText: 'No',
                            buttonsStyling: true
                        })
                            .then((result) => {
                                if (result.isConfirmed) {
                                    this.router.navigate([`/navigation/editar-profesional/${dni}`]);
                                }
                                if (result.isDismissed) {
                                    this.router.navigate(['/navigation/lista-profesionales']);
                                }
                            })
                    }
                } else {
                    this.router.navigate([`/navigation/agregar-profesional/${dni}`]);
                }

            },
            error: err => {

            }

        })
    }
}
