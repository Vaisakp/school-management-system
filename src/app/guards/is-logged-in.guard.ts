import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { inject } from "@angular/core";

export const isLoggedInGuard: CanActivateFn = (route, state) => {
  inject(AuthService)
  const router = inject(Router);
  const authService = inject(AuthService)
  if (authService.isAuthenticated()) {
    router.navigate(['user'])
    return false;
  }
  else{
    return true;
  }
};
