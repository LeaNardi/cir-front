import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';


@Component({
    selector: 'app-navegacion',
    templateUrl: './navegacion.component.html',
    styleUrls: ['./navegacion.component.css']
})
export class NavegacionComponent implements OnInit {
    role: string = "paciente";

    constructor(private auth: AuthenticationService, private router: Router) { }

    ngOnInit(): void {
        this.role = this.auth.getUserRole();
    }
    @ViewChild('sidenav') sidenav: MatSidenav | undefined;

    // barra de navegacion
    MiPerfil = [{
        name: "Mis datos",
        url: "miusuario"
    }
    ];

    Usuarios = [{
        name: "Usuarios",
        url: "lista-usuarios"
    }
    ];

    Turnos = [{
        name: "Turnos Reservados",
        url: "lista-turnos"
    }
    ];

    Pacientes = [{
        name: "Listado Pacientes",
        url: "lista"
    }
    ];

    Profesionales = [{
        name: "Listado Profesionales",
        url: "lista-profesionales"
    }
    ];

    OS = [{
        name: "Listado Obras Sociales",
        url: "lista-os"
    }
    ];

    Login = [{
        name: "Cerrar sesion",
        url: ""
    }
    ];

    // declaracion de variables ...
    siExpandir = true;
    mostrarMenuMiPerfil: boolean = false;
    mostrarMenuTurnos: boolean = false;
    mostrarMenuPacientes: boolean = false;
    mostrarMenuProfesionales: boolean = false;
    mostrarMenuOS: boolean = false;
    mostrarMenuUsuarios: boolean = false;

    async logout() {
        const token = await this.auth.resetSession();
        this.router.navigate(['/login']); 
      }
    
      confirmarSalir() {
        if (confirm('¿Estás seguro que deseas salir?')) {
            this.logout(); // Llama a la función logout si se confirma la salida
        }
    }
}
