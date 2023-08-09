import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { finalize } from "rxjs";
import { DialogData } from "src/app/models/interfaces/dialogdata.interface";
import { StudentService } from "src/app/services/student.service";
import { SnackbarService } from "../services/snackbar.service";

@Component({
  selector: "app-confirm-popup",
  templateUrl: "./confirm-popup.component.html",
  styleUrls: ["./confirm-popup.component.scss"],
})
export class ConfirmPopupComponent {
  confirmPopupLoader: boolean = false;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialogRef: MatDialogRef<ConfirmPopupComponent>,
    private studentService: StudentService,
    private snackbarService: SnackbarService
  ) {}

  deletestudent(){
    this.studentService.deleteStudent(this.data.studentData.id).pipe(
      finalize(() => {
        this.confirmPopupLoader = false;
      })
    )
    .subscribe({
      next: (response: any) => {
        this.snackbarService.openSnackBar({
          type: "success",
          content: "Data deleted successfully"
        });
        this.dialogRef.close(true);
      },
      error: (response) => {
        this.snackbarService.openSnackBar({
          type: "error",
          content: response?.error?.error,
        });
      },
    });
  }
} 
