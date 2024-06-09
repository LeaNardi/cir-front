import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { NavegacionComponent } from './components/navegacion/navegacion.component';
import { ListaTurnosComponent } from './components/turnos/lista-turnos/lista-turnos.component';
import { ListaProfesionalesComponent } from './components/profesionales/lista-profesionales/lista-profesionales.component';
import { ListaOsComponent } from './components/obrasSociales/lista-os/lista-os.component';
import { ListaUsuariosComponent } from './components/users/lista-usuarios/lista-usuarios.component';
import { MiusuarioComponent } from './components/miusuario/miusuario.component';

const routes: Routes = [

    {path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    {
      path: 'navigation', component: NavegacionComponent,
      children: [
          { path: 'miusuario', component: MiusuarioComponent },
          { path: 'lista-usuarios', component: ListaUsuariosComponent },
          { path: 'auth/user', component: LoginComponent },
          { path: 'lista-turnos', component: ListaTurnosComponent },
          { path: 'lista-profesionales', component: ListaProfesionalesComponent },
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
