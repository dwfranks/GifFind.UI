import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { first } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  returnUrl: string;
  error = '';

  loginForm = new FormGroup({
    usernameField: new FormControl('', Validators.required),
    passwordField: new FormControl('', Validators.required)
  });

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly authService: AuthService
  ) { }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get f() { return this.loginForm.controls; }

  handleSubmit() {
    if (this.loginForm.invalid) {
      this.error = JSON.stringify(this.loginForm.errors);
      return;
    }

    this.authService.login(this.f.usernameField.value, this.f.passwordField.value)
      .pipe(first())
      .subscribe(() => this.router.navigate([this.returnUrl]),
        error => this.error = error);
  }
}
