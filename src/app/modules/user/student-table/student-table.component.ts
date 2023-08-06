import { Component } from "@angular/core";
import { StudentData } from "src/app/models/interfaces/studentdata.interface";
import { CreateEditStudentPopupComponent } from "../create-edit-student-popup/create-edit-student-popup.component";
import { MatDialog } from "@angular/material/dialog";
import { SharedUtils } from "src/app/shared/shared.utils";

const ELEMENT_DATA: StudentData[] = [
  {
    rollNo: 1,
    name: "Vaisak",
    age: 24,
    address: "Poomthopil pollethai po alappuzha",
  },
  {
    rollNo: 2,
    name: "Vaisak",
    age: 24,
    address: "Poomthopil pollethai po alappuzha",
  },
  {
    rollNo: 3,
    name: "Vaisak",
    age: 24,
    address: "Poomthopil pollethai po alappuzha",
  },
  {
    rollNo: 4,
    name: "Vaisak",
    age: 24,
    address: "Poomthopil pollethai po alappuzha",
  },
  {
    rollNo: 1,
    name: "Vaisak",
    age: 24,
    address: "Poomthopil pollethai po alappuzha",
  },
  {
    rollNo: 2,
    name: "Vaisak",
    age: 24,
    address: "Poomthopil pollethai po alappuzha",
  },
  {
    rollNo: 3,
    name: "Vaisak",
    age: 24,
    address: "Poomthopil pollethai po alappuzha",
  },
  {
    rollNo: 4,
    name: "Vaisak",
    age: 24,
    address: "Poomthopil pollethai po alappuzha",
  },
  {
    rollNo: 1,
    name: "Vaisak",
    age: 24,
    address: "Poomthopil pollethai po alappuzha",
  },
  {
    rollNo: 2,
    name: "Vaisak",
    age: 24,
    address: "Poomthopil pollethai po alappuzha",
  },
  {
    rollNo: 3,
    name: "Vaisak",
    age: 24,
    address: "Poomthopil pollethai po alappuzha",
  },
  {
    rollNo: 4,
    name: "Vaisak",
    age: 24,
    address: "Poomthopil pollethai po alappuzha",
  },
  {
    rollNo: 1,
    name: "Vaisak",
    age: 24,
    address: "Poomthopil pollethai po alappuzha",
  },
  {
    rollNo: 2,
    name: "Vaisak",
    age: 24,
    address: "Poomthopil pollethai po alappuzha",
  },
  {
    rollNo: 3,
    name: "Vaisak",
    age: 24,
    address: "Poomthopil pollethai po alappuzha",
  },
  {
    rollNo: 4,
    name: "Vaisak",
    age: 24,
    address: "Poomthopil pollethai po alappuzha",
  },
];

@Component({
  selector: "app-student-table",
  templateUrl: "./student-table.component.html",
  styleUrls: ["./student-table.component.scss"],
})
export class StudentTableComponent {
  displayedColumns: string[] = ["No.", "Name", "Age", "Address", "Actions"];
  dataSource = ELEMENT_DATA;
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
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
