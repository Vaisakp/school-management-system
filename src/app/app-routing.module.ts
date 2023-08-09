import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

// function getRedirectionPath(){
//   const authService = new AuthService;
//   const isLoggedIn = authService.isAuthenticated();
//   return isLoggedIn ? 'user' : 'login'
// }


const routes: Routes = [
  {
    path: "",
    redirectTo: 'login',
    pathMatch: "full",
  },
  {
    path: "login",
    loadChildren: () =>
      import("./modules/login/login.module").then((m) => m.LoginModule)
  },
  {
    path: "user",
    loadChildren: () =>
      import("./modules/user/user.module").then((m) => m.UserModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}