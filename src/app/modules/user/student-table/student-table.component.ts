import { Component, EventEmitter, Input, Output } from "@angular/core";
import { StudentData } from "src/app/models/interfaces/studentdata.interface";
import { CreateEditStudentPopupComponent } from "../create-edit-student-popup/create-edit-student-popup.component";
import { MatDialog } from "@angular/material/dialog";
import { SharedUtils } from "src/app/shared/services/shared.utils";
import { ConfirmPopupComponent } from "src/app/shared/confirm-popup/confirm-popup.component";
import { Router } from "@angular/router";
import { ClassConfig } from "src/app/models/interfaces/classconfig.interface";

@Component({
  selector: "app-student-table",
  templateUrl: "./student-table.component.html",
  styleUrls: ["./student-table.component.scss"],
})
export class StudentTableComponent {
  @Output() studentDataChangeEmitter = new EventEmitter<boolean>();
  @Input() dataSource: Array<StudentData> = [];
  @Input() classConfig: ClassConfig = { stage: '', classname: '', year: '' }
  displayedColumns: string[] = ["No.", "Name", "Age", "Address", "Actions"];
  dialogConfig = this.sharedUtils.getMatCommonDialogConfig();
  constructor(private dialog: MatDialog, private sharedUtils: SharedUtils, private router: Router) {}
  openDetailedPage(studentData: StudentData) {
    this.router.navigate(['/user','student-detailed-view',studentData.id] );
  }
  editStudentData(event: Event,studentData: StudentData) {
    event.stopPropagation();
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

  deleteStudent(event: Event,studentData: StudentData) {
    event.stopPropagation();
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
