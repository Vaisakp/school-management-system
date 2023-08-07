import { Component, Inject, inject } from "@angular/core";
import {
  MAT_SNACK_BAR_DATA,
  MatSnackBarRef,
} from "@angular/material/snack-bar";
import { SnackbarService } from "../services/snackbar.service";
import { SnackBarData } from "src/app/models/interfaces/snackbardata.interface";
@Component({
  selector: "app-snack-bar",
  templateUrl: "./snack-bar.component.html",
  styleUrls: ["./snack-bar.component.scss"],
})
export class SnackBarComponent {
  snackBarRef = inject(MatSnackBarRef);
  constructor(
    private snackbarService: SnackbarService,
    @Inject(MAT_SNACK_BAR_DATA) public data: SnackBarData
  ) {}
}
