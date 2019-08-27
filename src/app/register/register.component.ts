import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm = new FormGroup({
    emailField: new FormControl('', Validators.compose([Validators.required, Validators.email])),
    usernameField: new FormControl('', Validators.required),
    passwordField: new FormControl(''),
    confirmField: new FormControl('')
  }, { validators: this.checkPasswords });

  constructor(private readonly userService: UserService,
              private readonly router: Router) { }

  get f() { return this.registerForm.controls; }

  ngOnInit() {
  }

  handleRegister() {
    const newUser: User = {
      email: this.f.emailField.value,
      userName: this.f.usernameField.value,
      password: this.f.passwordField.value
    };

    this.userService.registerUser(newUser).subscribe();

    // this.router.navigate(['/login']);
  }

  checkPasswords(group: FormGroup) {
    const password = group.get('passwordField').value;
    const confirm = group.get('confirmField').value;

    return password === confirm ? null : { noMatch: true };
  }
}
