import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado') || '{}');

  if (!usuarioLogado) {
    router.navigate(['/login']);
    return false;
  }

  return true;
};