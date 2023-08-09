import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";

export const isLoggedInGuard: CanActivateFn = (route, state) => {
  const authService = new AuthService();
  const router = new Router();
  debugger
  if (authService.isAuthenticated()) {
    router.navigate(["/user"]);
    return false;
  }
  return true;
};
