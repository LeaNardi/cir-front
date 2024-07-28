import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { NavegacionComponent } from './components/navegacion/navegacion.component';
import { ListaTurnosComponent } from './components/turnos/lista-turnos/lista-turnos.component';
import { ListaProfesionalesComponent } from './components/profesionales/lista-profesionales/lista-profesionales.component';
import { ListaOsComponent } from './components/obrasSociales/lista-os/lista-os.component';
import { ListaUsuariosComponent } from './components/users/lista-usuarios/lista-usuarios.component';
import { MiusuarioComponent } from './components/miusuario/miusuario.component';
import { ListaRolesComponent } from './components/roles/lista-roles/lista-roles.component';
import { NuevoProfesionalComponent } from './components/profesionales/nuevo-profesional/nuevo-profesional.component';
import { DetalleProfesionalComponent } from './components/profesionales/detalle-profesional/detalle-profesional.component';
import { EditarProfesionalComponent } from './components/profesionales/editar-profesional/editar-profesional.component';
import { ListaEspecialidadesComponent } from './components/especialidades/lista-especialidades/lista-especialidades.component';
import { NuevoProfesionalInicioComponent } from './components/profesionales/nuevo-profesional-inicio/nuevo-profesional-inicio.component';
import { SolicitarTurnoComponent } from './components/turnos/solicitar-turno/solicitar-turno.component';
import { GrillaTurnosComponent } from './components/turnos/grilla-turnos/grilla-turnos.component';
import { TurnosprofesionalComponent } from './components/profesionales/turnosprofesional/turnosprofesional.component';

const routes: Routes = [

    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    {
        path: 'navigation', component: NavegacionComponent,
        children: [
            { path: 'miusuario', component: MiusuarioComponent },
            { path: 'lista-roles', component: ListaRolesComponent },
            { path: 'lista-usuarios', component: ListaUsuariosComponent },
            { path: 'lista-especialidades', component: ListaEspecialidadesComponent },
            { path: 'lista-profesionales', component: ListaProfesionalesComponent },
            { path: 'agregar-profesional', component: NuevoProfesionalInicioComponent },
            { path: 'agregar-profesional/:dni', component: NuevoProfesionalComponent },
            { path: 'detalle-profesional/:dni', component: DetalleProfesionalComponent },
            { path: 'editar-profesional/:dni', component: EditarProfesionalComponent },
            { path: 'turnos-profesional/:dni', component: TurnosprofesionalComponent },
            { path: 'lista-turnos', component: ListaTurnosComponent },
            { path: 'solicitar-turno', component: SolicitarTurnoComponent },
            { path: 'solicitar-turno/:obraSocialId/:especialidadId/:profesionaldni', component: SolicitarTurnoComponent },
            { path: 'grilla-turnos/:obraSocialId/:especialidadId/:profesionaldni', component: GrillaTurnosComponent },

            { path: 'lista-os', component: ListaOsComponent },
            //   { path: 'lista', component: ListaPacienteComponent },
            //   { path: 'detalle/:id', component: DetallePacienteComponent },
            //   { path: 'editar/:id', component: EditarPacienteComponent },
            //   { path: 'nuevo', component: NuevoPacienteComponent },
            { path: '**', redirectTo: '', pathMatch: 'full' },
        ],
    }

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
