import { Component, EventEmitter, Input, Output } from "@angular/core";
import { StudentData } from "src/app/models/interfaces/studentdata.interface";
import { CreateEditStudentPopupComponent } from "../create-edit-student-popup/create-edit-student-popup.component";
import { MatDialog } from "@angular/material/dialog";
import { SharedUtils } from "src/app/shared/services/shared.utils";
import { ConfirmPopupComponent } from "src/app/shared/confirm-popup/confirm-popup.component";

@Component({
  selector: "app-student-table",
  templateUrl: "./student-table.component.html",
  styleUrls: ["./student-table.component.scss"],
})
export class StudentTableComponent {
  @Output() studentDataChangeEmitter = new EventEmitter<boolean>();
  @Input() dataSource: Array<StudentData> = [];
  displayedColumns: string[] = ["No.", "Name", "Age", "Address", "Actions"];
  dialogConfig = this.sharedUtils.getMatCommonDialogConfig();
  constructor(private dialog: MatDialog, private sharedUtils: SharedUtils) {}
  openDetailedPage(studentData: StudentData) {
    console.log(studentData);
  }
  editStudentData(studentData: StudentData) {
    const dialogRef = this.dialog.open(CreateEditStudentPopupComponent, {
      ...this.dialogConfig,
      data: { type: "Edit", studentData },
    });
    dialogRef.afterClosed().subscribe((result: boolean) => {
      if(result){
        this.studentDataChangeEmitter.emit(result);
      }
    });
  }

  deleteStudent(studentData: StudentData) {
    const dialogRef = this.dialog.open(ConfirmPopupComponent, {
      ...this.dialogConfig,
      data: { type: "Delete", studentData },
    });
    dialogRef.afterClosed().subscribe((result: boolean) => {
      if(result){
        this.studentDataChangeEmitter.emit(result);
      }
    });
  }

}
