import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from './login.service';
import { inject } from '@angular/core';

export const loginGuard: CanActivateFn = (route, state) => {
  const loginService = inject(LoginService);
  const router = inject(Router);

  const hasPermission = loginService.hasPermission("ADMIN");
  console.log('Verificando permissão:', hasPermission);

  if (!hasPermission) {
    console.log('Permissão negada, redirecionando para /login');
    router.navigate(['/login']);
    return false;
  }

  console.log('Permissão concedida');
  return true;
};
