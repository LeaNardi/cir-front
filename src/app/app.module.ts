import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { NavegacionComponent } from './components/navegacion/navegacion.component';
import { DetallePacienteComponent } from './components/pacientes/detalle-paciente/detalle-paciente.component';
import { EditarPacienteComponent } from './components/pacientes/editar-paciente/editar-paciente.component';
import { ListaPacienteComponent } from './components/pacientes/lista-paciente/lista-paciente.component';
import { NuevoPacienteComponent } from './components/pacientes/nuevo-paciente/nuevo-paciente.component';
import { ListaOsComponent } from './components/obrasSociales/lista-os/lista-os.component';
import { ListaProfesionalesComponent } from './components/profesionales/lista-profesionales/lista-profesionales.component';
import { ListaTurnosComponent } from './components/turnos/lista-turnos/lista-turnos.component';

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
    ListaTurnosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
