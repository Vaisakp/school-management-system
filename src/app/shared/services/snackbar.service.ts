import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { SnackBarComponent } from "../snack-bar/snack-bar.component";
import { SnackBarData } from "src/app/models/interfaces/snackbardata.interface";

@Injectable({
  providedIn: "root",
})
export class SnackbarService {
  durationInSeconds = 3;
  constructor(private _snackBar: MatSnackBar) {}

  openSnackBar(snackBarData: SnackBarData) {
    this._snackBar.openFromComponent(SnackBarComponent, {
      data: snackBarData,
      duration: this.durationInSeconds * 1000,
      horizontalPosition: "right",
      verticalPosition: "top",
    });
  }
}
