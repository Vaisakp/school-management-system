import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { CreateEditStudentPopupComponent } from "../create-edit-student-popup/create-edit-student-popup.component";
import { SharedUtils } from "src/app/shared/services/shared.utils";
import { StudentService } from "src/app/services/student.service";
import { ClassListResponse } from "src/app/models/interfaces/classlistresponse.interface";
import { finalize } from "rxjs";
import { SnackbarService } from "src/app/shared/services/snackbar.service";
import { StudentData } from "src/app/models/interfaces/studentdata.interface";
import { StudentListResponse } from "src/app/models/interfaces/studentlistresponse.interface";

@Component({
  selector: "app-homepage",
  templateUrl: "./homepage.component.html",
  styleUrls: ["./homepage.component.scss"],
})
export class HomepageComponent {
  getDataForm: FormGroup;
  stageData: Array<string> = ["Primary", "Secondary"];
  yearData: Array<string> = [];
  classData: Array<string> = [];
  studentListData: Array<StudentData> = [];
  getClassListLoader: boolean = false;
  getStudentDataLoader: boolean = false;
  showDataSection: boolean = false;
  dialogConfig = this.sharedUtils.getMatCommonDialogConfig();
  constructor(
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private sharedUtils: SharedUtils,
    private studentService: StudentService,
    private snackBarService: SnackbarService
  ) {
    this.getDataForm = this.formBuilder.group({
      stage: ["Primary", Validators.required],
      year: ["", Validators.required],
      classname: ["", Validators.required],
    });
    this.setYear();
  }

  setYear() {
    if (this.getDataForm.controls["stage"].value === "Primary") {
      this.yearData = [
        "KG 1",
        "KG 2",
        "KG 3",
        "Year 1",
        "Year 2",
        "Year 3",
        "Year 4",
        "Year 5",
      ];
    } else {
      this.yearData = ["Year 6", "Year 7", "Year 8", "Year 9"];
    }
    this.getDataForm.controls["year"].setValue(this.yearData[0]);
    this.setClass();
  }

  setClass() {
    this.getClassListLoader = true;
    this.getDataForm.get("classname")?.disable();
    this.studentService
      .getClassList({
        year: this.getDataForm.controls["year"].value,
        stage: this.getDataForm.controls["stage"].value,
      })
      .pipe(
        finalize(() => {
          this.getClassListLoader = false;
          this.getDataForm.get("classname")?.enable();
        })
      )
      .subscribe({
        next: (response: ClassListResponse) => {
          this.classData = response.data;
          this.getDataForm.controls["classname"].setValue(
            this.classData[0] ? this.classData[0] : ""
          );
        },
        error: (response) => {
          this.snackBarService.openSnackBar({
            type: "error",
            content: response?.error?.error,
          });
        },
      });
  }

  getStudentsData() {
    this.getStudentDataLoader = true;
    this.studentService
      .getStudentsData(this.getDataForm.value)
      .pipe(
        finalize(() => {
          this.getStudentDataLoader = false;
        })
      )
      .subscribe({
        next: (response: StudentListResponse) => {
          this.studentListData = response.data;
          this.showDataSection = true;
        },
        error: (response) => {
          console.log(response);
        },
      });
  }

  openCreateStudentDialog() {
    const dialogRef = this.dialog.open(CreateEditStudentPopupComponent, {
      ...this.dialogConfig,
      data: { type: "Create", classData: this.getDataForm.value },
    });
    dialogRef.afterClosed().subscribe((dataFromDialog) => {
      if(dataFromDialog){
        this.getStudentsData();
      }
    });
  }
}
