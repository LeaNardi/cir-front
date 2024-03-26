import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { NavegacionComponent } from './components/navegacion/navegacion.component';
import { ListaPacienteComponent } from './components/pacientes/lista-paciente/lista-paciente.component';
import { DetallePacienteComponent } from './components/pacientes/detalle-paciente/detalle-paciente.component';
import { EditarPacienteComponent } from './components/pacientes/editar-paciente/editar-paciente.component';
import { NuevoPacienteComponent } from './components/pacientes/nuevo-paciente/nuevo-paciente.component';
import { ListaTurnosComponent } from './components/turnos/lista-turnos/lista-turnos.component';
import { ListaProfesionalesComponent } from './components/profesionales/lista-profesionales/lista-profesionales.component';
import { ListaOsComponent } from './components/obrasSociales/lista-os/lista-os.component';
import { ListaUsuariosComponent } from './components/users/lista-usuarios/lista-usuarios.component';

const routes: Routes = [

    {path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    {
      path: 'navigation', component: NavegacionComponent,
      children: [
        { path: 'lista', component: ListaPacienteComponent },
        { path: 'detalle/:id', component: DetallePacienteComponent },
        { path: 'editar/:id', component: EditarPacienteComponent },
        { path: 'nuevo', component: NuevoPacienteComponent },
        { path: 'auth/user', component: LoginComponent },
        { path: 'lista-turnos', component: ListaTurnosComponent },
        { path: 'lista-profesionales', component: ListaProfesionalesComponent },
        { path: 'lista-os', component: ListaOsComponent },
        { path: 'lista-usuarios', component: ListaUsuariosComponent },
        { path: '**', redirectTo: '', pathMatch: 'full' },
      ],
    }
  
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
