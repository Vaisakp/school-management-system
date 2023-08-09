import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { StudentData } from "src/app/models/interfaces/studentdata.interface";

@Component({
  selector: "app-student-detailed-view",
  templateUrl: "./student-detailed-view.component.html",
  styleUrls: ["./student-detailed-view.component.scss"],
})
export class StudentDetailedViewComponent implements OnInit {
  studentData!: StudentData;
  sampleData = { name: "vaisak", age: 23 }
  studentId: number = 0;
  constructor(
    private activatedRoute: ActivatedRoute,
  ) {
  }
  
  ngOnInit() {
    this.activatedRoute.data.subscribe((response: any) => {
      this.studentData = response.studentData.data;
    })
  }
}
