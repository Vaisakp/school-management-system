import { CanActivateFn, Router } from "@angular/router";
import { inject } from "@angular/core";
import { AuthService } from "../services/auth.service";

export const authGuard: CanActivateFn = (route, state) => {
  const authService = new AuthService();
  const router = new Router();
  if (!authService.isAuthenticated()) {
    router.navigate(["/login"]);
    return false;
  }
  return true;
};
