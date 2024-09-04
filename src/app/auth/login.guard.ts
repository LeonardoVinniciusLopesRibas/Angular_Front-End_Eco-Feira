import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from './login.service';
import { inject } from '@angular/core';

export const loginGuard: CanActivateFn = (route, state) => {
  const loginService = inject(LoginService);
  const router = inject(Router);

  const hasPermission = loginService.hasPermission("ADMIN");

  if (!hasPermission) {
    router.navigate(['/login']);
    return false;
  }

  return true;
};
