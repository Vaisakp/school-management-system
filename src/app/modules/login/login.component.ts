import { Component } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { MyErrorStateMatcher } from "src/app/common/class/my-error-state-matcher";
import { LoginResponse } from "src/app/models/interfaces/login-response.interface";
import { LoginService } from "src/app/services/login.service";
import { SnackbarService } from "src/app/shared/services/snackbar.service";

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
