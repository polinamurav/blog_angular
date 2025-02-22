import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm = this.fb.group({
    name: ['', [Validators.required, Validators.pattern('^([А-ЯЁ][а-яё]*)(\\s[А-ЯЁ][а-яё]*)*$')]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.pattern('^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$')]],
    agree: [false, [Validators.requiredTrue]],
  })

  constructor(private fb: FormBuilder,
              private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  signup() {
    if (this.signupForm.valid && this.signupForm.value.name && this.signupForm.value.email
      && this.signupForm.value.password && this.signupForm.value.agree) {
      console.log('проверка прошла');
    } else {
      this.signupForm.dirty;
    }
  }
}
