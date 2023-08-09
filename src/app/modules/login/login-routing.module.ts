import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./login.component";
import { isLoggedInGuard } from "src/app/guards/is-logged-in.guard";

const routes: Routes = [
  { path: "", component: LoginComponent, canActivate: [isLoggedInGuard] },
  { path: 'user', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginRoutingModule {}
