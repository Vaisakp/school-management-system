import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { ClassListResponse } from "../models/interfaces/classlistresponse.interface";
import { StudentListResponse } from "../models/interfaces/studentlistresponse.interface";
import { StudentData } from "../models/interfaces/studentdata.interface";
import { CreateEditStudentResponse } from "../models/interfaces/create-edit-student-response.interface";

@Injectable({
  providedIn: "root",
})
export class StudentService {
  constructor(private httpClient: HttpClient) {}

  getClassList(data: { stage: string; year: string }) {
    return this.httpClient.get<ClassListResponse>(
      `${environment.apiUrl}/classnames`,
      {
        params: data,
      }
    );
  }

  getStudentsData(data: { stage: string; year: string; classname: string }) {
    return this.httpClient.get<StudentListResponse>(`${environment.apiUrl}/students/`, {
      params: data,
    });
  }

  createOrEditStudent(type: string, data: StudentData){
    if(type === "Create"){
      return this.httpClient.post<CreateEditStudentResponse>(`${environment.apiUrl}/students/`, data);
    }
    else{
      return this.httpClient.put<CreateEditStudentResponse>(`${environment.apiUrl}/students/`, data, { params: { id: data.id } });
    }
  }

  deleteStudent(id: number){
    return this.httpClient.delete<any>(`${environment.apiUrl}/students/${id}`,);
  }

}
