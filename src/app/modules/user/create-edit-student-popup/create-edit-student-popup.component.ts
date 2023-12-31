import { Component, ElementRef, Inject, ViewChild } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
} from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { finalize } from "rxjs";
import { MyErrorStateMatcher } from "src/app/common/class/my-error-state-matcher";
import { CreateEditStudentResponse } from "src/app/models/interfaces/create-edit-student-response.interface";
import { DialogData } from "src/app/models/interfaces/dialogdata.interface";
import { StudentService } from "src/app/services/student.service";
import { SnackbarService } from "src/app/shared/services/snackbar.service";

@Component({
  selector: "app-create-edit-student-popup",
  templateUrl: "./create-edit-student-popup.component.html",
  styleUrls: ["./create-edit-student-popup.component.scss"],
})
export class CreateEditStudentPopupComponent {
  @ViewChild("imageInput") imageInputRef!: ElementRef<HTMLInputElement>;
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
      image: [""]
    });
    if (this.data.type === "Edit") {
      this.createEditStudentForm.patchValue({ ...this.data.studentData });
    }
  }

  triggerImageInputClick() {
    this.imageInputRef.nativeElement.click();
  }

  handleImageUpload(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const selectedImage = inputElement.files?.[0];
    if (selectedImage) {
      const reader = new FileReader();
      reader.onload = (e) => (this.createEditStudentForm.get('image')?.setValue(e.target?.result));
      reader.readAsDataURL(selectedImage);
    }
  }

  addOrEditStudent() {
    this.createEditStudentLoader = true;
    this.studentService
      .createOrEditStudent(this.data.type, {
        ...this.data.studentData,
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
            content:
              this.data.type === "Create"
                ? "Data added successfully"
                : "Data updated succesfully",
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
