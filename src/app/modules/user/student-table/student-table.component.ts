import { Component } from '@angular/core';

export interface StudentData {
  name: string;
  age: number;
  address: string;
  rollNo: number;
}

const ELEMENT_DATA: StudentData[] = [
  { rollNo: 1, name: "Vaisak", age: 24, address: "Poomthopil pollethai po alappuzha" },
  { rollNo: 2, name: "Vaisak", age: 24, address: "Poomthopil pollethai po alappuzha" },
  { rollNo: 3, name: "Vaisak", age: 24, address: "Poomthopil pollethai po alappuzha" },
  { rollNo: 4, name: "Vaisak", age: 24, address: "Poomthopil pollethai po alappuzha" },
  { rollNo: 1, name: "Vaisak", age: 24, address: "Poomthopil pollethai po alappuzha" },
  { rollNo: 2, name: "Vaisak", age: 24, address: "Poomthopil pollethai po alappuzha" },
  { rollNo: 3, name: "Vaisak", age: 24, address: "Poomthopil pollethai po alappuzha" },
  { rollNo: 4, name: "Vaisak", age: 24, address: "Poomthopil pollethai po alappuzha" },
  { rollNo: 1, name: "Vaisak", age: 24, address: "Poomthopil pollethai po alappuzha" },
  { rollNo: 2, name: "Vaisak", age: 24, address: "Poomthopil pollethai po alappuzha" },
  { rollNo: 3, name: "Vaisak", age: 24, address: "Poomthopil pollethai po alappuzha" },
  { rollNo: 4, name: "Vaisak", age: 24, address: "Poomthopil pollethai po alappuzha" },
  { rollNo: 1, name: "Vaisak", age: 24, address: "Poomthopil pollethai po alappuzha" },
  { rollNo: 2, name: "Vaisak", age: 24, address: "Poomthopil pollethai po alappuzha" },
  { rollNo: 3, name: "Vaisak", age: 24, address: "Poomthopil pollethai po alappuzha" },
  { rollNo: 4, name: "Vaisak", age: 24, address: "Poomthopil pollethai po alappuzha" },
];


@Component({
  selector: 'app-student-table',
  templateUrl: './student-table.component.html',
  styleUrls: ['./student-table.component.scss']
})
export class StudentTableComponent {
  displayedColumns: string[] = [ 'No.','Name', 'Age', 'Address', 'Actions'];
  dataSource = ELEMENT_DATA;
  openDetailedPage(studentData: StudentData){
    console.log(studentData);
  }
}
