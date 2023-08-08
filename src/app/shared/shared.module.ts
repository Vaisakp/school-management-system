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
import { UppercaseOnlyDirective } from "./directives/uppercase-only.directive";
import { ConfirmPopupComponent } from "./confirm-popup/confirm-popup.component";
import { MatDialogModule } from "@angular/material/dialog";

@NgModule({
  declarations: [
    SnackBarComponent,
    UppercaseOnlyDirective,
    ConfirmPopupComponent,
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatDialogModule,
  ],
  providers: [SharedUtils, SnackbarService],
  exports: [SnackBarComponent, UppercaseOnlyDirective, ConfirmPopupComponent]
})
export class SharedModule {}
