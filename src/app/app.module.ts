import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';


import { LoginComponent } from './components/login/login.component';
import { NavegacionComponent } from './components/navegacion/navegacion.component';
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
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgToastModule } from 'ng-angular-popup';
import { FormsModule } from '@angular/forms';
import { ListaUsuariosComponent } from './components/users/lista-usuarios/lista-usuarios.component';
import { NuevoUsuarioComponent } from './components/users/nuevo-usuario/nuevo-usuario.component';
import { DetalleUsuarioComponent } from './components/users/detalle-usuario/detalle-usuario.component';
import { EditarUsuarioComponent } from './components/users/editar-usuario/editar-usuario.component';
import { MiusuarioComponent } from './components/miusuario/miusuario.component';
import { ListaRolesComponent } from './components/roles/lista-roles/lista-roles.component';
import { MatSelectModule } from '@angular/material/select';
import { NuevoProfesionalComponent } from './components/profesionales/nuevo-profesional/nuevo-profesional.component';
import { EditarProfesionalComponent } from './components/profesionales/editar-profesional/editar-profesional.component';
import { DetalleProfesionalComponent } from './components/profesionales/detalle-profesional/detalle-profesional.component';
import { ListaEspecialidadesComponent } from './components/especialidades/lista-especialidades/lista-especialidades.component';
import { NuevoProfesionalInicioComponent } from './components/profesionales/nuevo-profesional-inicio/nuevo-profesional-inicio.component';
import { SolicitarTurnoComponent } from './components/turnos/solicitar-turno/solicitar-turno.component';
import { GrillaTurnosComponent } from './components/turnos/grilla-turnos/grilla-turnos.component';
import { DatePipe } from '@angular/common';
import { TurnosprofesionalComponent } from './components/profesionales/turnosprofesional/turnosprofesional.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatNativeDateModule, MAT_DATE_LOCALE, DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        NavegacionComponent,
        ListaOsComponent,
        ListaProfesionalesComponent,
        ListaTurnosComponent,
        ListaUsuariosComponent,
        ListaUsuariosComponent,
        NuevoUsuarioComponent,
        DetalleUsuarioComponent,
        EditarUsuarioComponent,
        MiusuarioComponent,
        ListaRolesComponent,
        NuevoProfesionalComponent,
        EditarProfesionalComponent,
        DetalleProfesionalComponent,
        ListaEspecialidadesComponent,
        NuevoProfesionalInicioComponent,
        SolicitarTurnoComponent,
        GrillaTurnosComponent,
        TurnosprofesionalComponent,
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
        MatSelectModule,
        MatCheckboxModule,
        DatePipe,
        MatDatepickerModule,
        MatNativeDateModule,
    ],
    providers: [
        DatePipe,
        provideNativeDateAdapter(),
        { provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
        { provide: MAT_DATE_FORMATS, useValue: {
            parse: {
              dateInput: 'DD/MM/YYYY',
            },
            display: {
              dateInput: 'DD/MM/YYYY',
              monthYearLabel: 'MMMM YYYY',
              dateA11yLabel: 'DD/MM/YYYY',
              monthYearA11yLabel: 'MMMM YYYY',
            },
          } },
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
