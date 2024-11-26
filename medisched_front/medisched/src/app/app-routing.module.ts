import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PacientesComponent } from './modules/pacientes/pacientes.component';
import { ConsultasComponent } from './modules/consultas/consultas.component';
import { EspecialidadesComponent } from './modules/especialidades/especialidades.component';
import { MedicosComponent } from './modules/medicos/medicos.component';
import { HomeComponent } from './modules/home/home.component';
import { LoginComponent } from './modules/login/login.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'especialidades', component: EspecialidadesComponent },
  { path: 'medicos', component: MedicosComponent },
  { path: 'pacientes', component: PacientesComponent },
  { path: 'consultas', component: ConsultasComponent },
  { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
