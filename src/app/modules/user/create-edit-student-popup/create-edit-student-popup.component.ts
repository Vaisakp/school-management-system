import { Component, Inject } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
} from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { finalize } from "rxjs";
import { CreateEditStudentResponse } from "src/app/models/interfaces/create-edit-student-response.interface";
import { DialogData } from "src/app/models/interfaces/dialogdata.interface";
import { StudentService } from "src/app/services/student.service";
import { SnackbarService } from "src/app/shared/services/snackbar.service";

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: "app-create-edit-student-popup",
  templateUrl: "./create-edit-student-popup.component.html",
  styleUrls: ["./create-edit-student-popup.component.scss"],
})
export class CreateEditStudentPopupComponent {
  createEditStudentForm: FormGroup;
  matcher = new MyErrorStateMatcher();
  createEditStudentLoader: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private studentService: StudentService,
    private snackbarService: SnackbarService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialogRef: MatDialogRef<CreateEditStudentPopupComponent>
  ) {
    this.createEditStudentForm = this.formBuilder.group({
      name: ["", [Validators.required]],
      age: ["", [Validators.required]],
      address: ["", [Validators.required]],
      subject1: ["", [Validators.required]],
      subject2: ["", [Validators.required]],
      subject3: ["", [Validators.required]],
    });
  }

  addEditStudent() {
    this.createEditStudentLoader = true;
    this.studentService
      .createStudent({
        ...this.createEditStudentForm.value,
        ...this.data.classData,
      })
      .pipe(
        finalize(() => {
          this.createEditStudentLoader = false;
        })
      )
      .subscribe({
        next: (response: CreateEditStudentResponse) => {
          this.snackbarService.openSnackBar({
            type: "success",
            content: "Data added successfully",
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
