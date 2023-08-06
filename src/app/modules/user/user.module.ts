import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { HomepageComponent } from './homepage/homepage.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { StudentTableComponent } from './student-table/student-table.component';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [
    UserComponent,
    HomepageComponent,
    NavBarComponent,
    StudentTableComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    MatSelectModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatTableModule
  ]
})
export class UserModule { }
