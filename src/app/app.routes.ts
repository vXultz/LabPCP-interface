import { Routes } from '@angular/router';
import { provideToastr } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { HomeAdminComponent } from './components/home-admin/home-admin.component';
import { HomeAlunoComponent } from './components/home-aluno/home-aluno.component';
import { RegistroDocenteComponent } from './components/registro-docente/registro-docente.component';
import { RegistroTurmaComponent } from './components/registro-turma/registro-turma.component';
import { authGuard } from './guards/auth.guard';
import { roleGuard } from './guards/role.guard';
import { ListaProfessoresComponent } from './components/lista-professores/lista-professores.component';
import { RegistroAlunoComponent } from './components/registro-aluno/registro-aluno.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home-admin', component: HomeAdminComponent, canActivate: [authGuard, roleGuard], data: { expectedRole: ['Admin', 'Docente'] } },
  { path: 'home-aluno', component: HomeAlunoComponent, canActivate: [authGuard, roleGuard], data: { expectedRole: 'Aluno' } },
  { path: 'registro-docente', component: RegistroDocenteComponent, canActivate: [authGuard, roleGuard], data: { expectedRole: 'Admin' } },
  { path: 'registro-aluno', component: RegistroAlunoComponent, canActivate: [authGuard, roleGuard], data: { expectedRole: 'Admin' } },
  { path: 'registro-turma', component: RegistroTurmaComponent, canActivate: [authGuard, roleGuard], data: { expectedRole: ['Admin', 'Docente'] } },
  { path: 'lista-professores', component: ListaProfessoresComponent, canActivate: [authGuard, roleGuard], data: { expectedRole: 'Admin' } },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login', pathMatch: 'full' }
];

export const routeProviders = [
  provideToastr(),
  BrowserAnimationsModule
];