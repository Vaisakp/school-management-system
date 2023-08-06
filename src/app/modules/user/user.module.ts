import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatSelectModule } from "@angular/material/select";
import { UserRoutingModule } from "./user-routing.module";
import { UserComponent } from "./user.component";
import { HomepageComponent } from "./homepage/homepage.component";
import { NavBarComponent } from "./nav-bar/nav-bar.component";
import { MatButtonModule } from "@angular/material/button";
import { ReactiveFormsModule } from "@angular/forms";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { StudentTableComponent } from "./student-table/student-table.component";
import { MatTableModule } from "@angular/material/table";
import { CreateEditStudentPopupComponent } from "./create-edit-student-popup/create-edit-student-popup.component";
import { MatDialogModule } from "@angular/material/dialog";
import { MatInputModule } from "@angular/material/input";
import { SharedModule } from "src/app/shared/shared.module";

@NgModule({
  declarations: [
    UserComponent,
    HomepageComponent,
    NavBarComponent,
    StudentTableComponent,
    CreateEditStudentPopupComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    MatSelectModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatDialogModule,
    MatInputModule,
    SharedModule,
  ],
})
export class UserModule {}
