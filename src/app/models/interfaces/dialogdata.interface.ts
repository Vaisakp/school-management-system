import { ClassConfig } from "./classconfig.interface";
import { StudentData } from "./studentdata.interface";

export interface DialogData {
  type: string;
  studentData?: StudentData;
  classData?: ClassConfig;
}
