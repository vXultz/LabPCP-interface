import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { inject } from '@angular/core';

export const roleGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const router = inject(Router);
  const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado') || '{}');
  const expectedRole = route.data['expectedRole'];

  if (usuarioLogado.role !== expectedRole) {
    alert('Você não tem permissão para acessar esta página.');

    if (usuarioLogado.role === 'Admin' || usuarioLogado.role === 'Docente') {
      router.navigate(['/home-admin']);
    } else if (usuarioLogado.role === 'Aluno') {
      router.navigate(['/home-estudante']);
    } else {
      router.navigate(['/login']);
    }

    return false;
  }

  return true;
};