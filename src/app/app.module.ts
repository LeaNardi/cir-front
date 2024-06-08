import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';


import { LoginComponent } from './components/login/login.component';
import { NavegacionComponent } from './components/navegacion/navegacion.component';
import { DetallePacienteComponent } from './components/pacientes/detalle-paciente/detalle-paciente.component';
import { EditarPacienteComponent } from './components/pacientes/editar-paciente/editar-paciente.component';
import { ListaPacienteComponent } from './components/pacientes/lista-paciente/lista-paciente.component';
import { NuevoPacienteComponent } from './components/pacientes/nuevo-paciente/nuevo-paciente.component';
import { ListaOsComponent } from './components/obrasSociales/lista-os/lista-os.component';
import { ListaProfesionalesComponent } from './components/profesionales/lista-profesionales/lista-profesionales.component';
import { ListaTurnosComponent } from './components/turnos/lista-turnos/lista-turnos.component';

import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider'
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar'
import { NgToastModule } from 'ng-angular-popup';
import { FormsModule } from '@angular/forms';
import { ListaUsuariosComponent } from './components/users/lista-usuarios/lista-usuarios.component';
import { NuevoUsuarioComponent } from './components/users/nuevo-usuario/nuevo-usuario.component';
import { DetalleUsuarioComponent } from './components/users/detalle-usuario/detalle-usuario.component';
import { EditarUsuarioComponent } from './components/users/editar-usuario/editar-usuario.component';
import { MiusuarioComponent } from './components/miusuario/miusuario.component';




@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        NavegacionComponent,
        DetallePacienteComponent,
        EditarPacienteComponent,
        ListaPacienteComponent,
        NuevoPacienteComponent,
        ListaOsComponent,
        ListaProfesionalesComponent,
        ListaTurnosComponent,
        ListaUsuariosComponent,
        ListaUsuariosComponent,
        NuevoUsuarioComponent,
        DetalleUsuarioComponent,
        EditarUsuarioComponent,
        MiusuarioComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatCardModule,
        MatDialogModule,
        MatDividerModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatPaginatorModule,
        MatSidenavModule,
        MatSortModule,
        MatTableModule,
        MatToolbarModule,
        NgToastModule,
        FormsModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
