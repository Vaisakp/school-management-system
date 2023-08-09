import { NgModule, inject } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  RouterModule,
  RouterStateSnapshot,
  Routes,
} from "@angular/router";
import { UserComponent } from "./user.component";
import { HomepageComponent } from "./homepage/homepage.component";
import { StudentDetailedViewComponent } from "./student-detailed-view/student-detailed-view.component";
import { StudentService } from "src/app/services/student.service";

const routes: Routes = [
  {
    path: "",
    component: UserComponent,
    children: [
      { path: "", redirectTo: "homepage", pathMatch: "full" },
      { path: "homepage", component: HomepageComponent },
      {
        path: "student-detailed-view/:id",
        component: StudentDetailedViewComponent,
        resolve: {
          studentData: (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
            return inject(StudentService).getStudentData(
              route.paramMap.get("id")!
            );
          },
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
