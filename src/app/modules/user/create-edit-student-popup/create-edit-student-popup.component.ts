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
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { DialogData } from "src/app/models/interfaces/dialogdata.interface";

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
  constructor(
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.createEditStudentForm = this.formBuilder.group({
      name: ["", [Validators.required]],
      age: ["", [Validators.required]],
      address: ["", [Validators.required]],
    });
  }
}
