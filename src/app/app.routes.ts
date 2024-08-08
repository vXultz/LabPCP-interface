import { Routes } from '@angular/router';
import { provideToastr } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { HomeAdminComponent } from './components/home-admin/home-admin.component';
import { HomeEstudanteComponent } from './components/home-estudante/home-estudante.component';
import { RegistroDocenteComponent } from './components/registro-docente/registro-docente.component';
import { authGuard } from './guards/auth.guard';
import { roleGuard } from './guards/role.guard';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home-admin', component: HomeAdminComponent, canActivate: [authGuard, roleGuard], data: { expectedRole: 'Admin' || 'Docente' } },
  { path: 'home-estudante', component: HomeEstudanteComponent, canActivate: [authGuard, roleGuard], data: { expectedRole: 'Aluno' } },
  { path: 'registro-docente', component: RegistroDocenteComponent, canActivate: [authGuard, roleGuard], data: { expectedRole: 'Admin' } },
  { path: '**', redirectTo: '', component: LoginComponent }
];

export const routeProviders = [
  provideToastr(),
  BrowserAnimationsModule
];