import { Component } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
} from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";
import { Router } from "@angular/router";
import { LoginResponse } from "src/app/models/interfaces/loginresponse.interface";
import { LoginService } from "src/app/services/login.service";
import { SnackbarService } from "src/app/shared/services/snackbar.service";

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent {
  loginForm: FormGroup;
  matcher = new MyErrorStateMatcher();
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loginService: LoginService,
    private snackBarService: SnackbarService
  ) {
    this.loginForm = this.formBuilder.group({
      name: ["", [Validators.required]],
      password: ["", [Validators.required]],
    });
  }
  onSubmit() {
    this.loginService.login(this.loginForm.value).subscribe({
      next: (response: LoginResponse) => {
        this.snackBarService.openSnackBar({
          type: "success",
          content: "Logged in successfully",
        });
        localStorage.setItem("token", response.token);
        this.router.navigate(["/user"]);
      },
      error: (response) => {
        this.snackBarService.openSnackBar({
          type: "error",
          content: response?.error?.error,
        });
      },
    });
  }
}
