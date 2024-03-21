import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { matchPasswordsValidator } from 'src/app/shared/utils/march-passwords-validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  form = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(5)]],
    email: ['', [Validators.required, Validators.pattern("^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$")]],
    passGroup: this.fb.group(
      {
        password: ['', [Validators.required]],
        rePassword: ['', [Validators.required]]
      },
      {
        validators: [matchPasswordsValidator('password','rePassword')]
      }
    )
   });

  constructor(private fb: FormBuilder) { }

  register(): void {
    if (this.form.invalid) {
      return;
    }

    console.log(this.form.value);

  }
}
