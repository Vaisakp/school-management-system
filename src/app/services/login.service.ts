import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import {
  LoginResponse,
  UserData,
} from "../models/interfaces/loginresponse.interface";
@Injectable({
  providedIn: "root",
})
export class LoginService {
  constructor(private httpClient: HttpClient) {}

  login(data: UserData) {
    return this.httpClient.post<LoginResponse>(`${environment.apiUrl}/login`, {
      ...data,
    });
  }
}
