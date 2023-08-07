import { StudentData } from "./studentdata.interface";

export interface StudentListResponse {
  data: Array<StudentData>;
  success: boolean;
}
