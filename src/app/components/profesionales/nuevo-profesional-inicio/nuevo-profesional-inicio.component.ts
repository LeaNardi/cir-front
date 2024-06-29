import { Component, OnInit } from '@angular/core';
import { ProfesionalDTO } from '../../../interfaces/profesional';
import { ProfesionalService } from '../../../services/profesional.service';
import { TituloService } from '../../../services/titulo.service';
import { EspecialidadService } from '../../../services/especialidad.service';
import { ActivatedRoute, Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
    selector: 'app-nuevo-profesional-inicio',
    templateUrl: './nuevo-profesional-inicio.component.html',
    styleUrl: './nuevo-profesional-inicio.component.css'
})
export class NuevoProfesionalInicioComponent {
    dni: string;

    constructor(private profesionalService: ProfesionalService,
        private aRoute: ActivatedRoute,
        private router: Router,
    ) {
        this.dni = '';
    }

    siguiente(): void {
        console.log(this.dni);
        this.profesionalService.existsProfesional(this.dni).subscribe({
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
                                    this.router.navigate([`/navigation/editar-profesional/${this.dni}`]);
                                }
                                if (result.isDismissed) {
                                    this.router.navigate(['/navigation/lista-profesionales']);
                                }
                            })
                    }
                } else {
                    this.router.navigate([`/navigation/agregar-profesional/${this.dni}`]);
                }

            },
            error: err => {

            }

        })
    }
}
