import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { UserComponent } from "./user.component";
import { HomepageComponent } from "./homepage/homepage.component";

const routes: Routes = [
  {
    path: "",
    component: UserComponent,
    children: [
      { path: "", redirectTo: "homepage", pathMatch: "full" },
      { path: "homepage", component: HomepageComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
