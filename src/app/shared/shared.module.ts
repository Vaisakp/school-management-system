import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SnackBarComponent } from "./snack-bar/snack-bar.component";
import { MatFormFieldModule } from "@angular/material/form-field";
import { FormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { SharedUtils } from "./services/shared.utils";
import { SnackbarService } from "./services/snackbar.service";
import { UppercaseOnlyDirective } from './directives/uppercase-only.directive';

@NgModule({
  declarations: [SnackBarComponent, UppercaseOnlyDirective],
  imports: [
    CommonModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
  ],
  providers: [SharedUtils, SnackbarService],
  exports: [SnackBarComponent, UppercaseOnlyDirective],
})
export class SharedModule {}
