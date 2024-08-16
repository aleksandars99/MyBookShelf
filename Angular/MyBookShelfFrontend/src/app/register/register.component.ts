import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { error } from 'console';
import { UserService } from '../../Services/user.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, HttpClientModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  form!: FormGroup;
  constructor(private router: Router, private user: UserService) {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      emailAdress: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [this.uppercaseValidator,Validators.minLength(6), Validators.required]),
      passwordConfirm: new FormControl('', Validators.required),
    }, {
      validators: this.validatePasswords,
    })
  }

  validatePasswords(control: AbstractControl) {
    return control.get('password')?.value ===
    control.get('passwordConfirm')?.value
    ? null : {mismatch : true};
  }

  register() {
    if (this.form.valid) {
      const {name, emailAdress, password} = this.form.value;
      const user = {name, emailAdress, password};
    this.user.register(user)
    .subscribe(response => {
      this.router.navigate(['/login']);
    }, error => {
      console.log('Registration failed', error)
    });
    console.log(user)
    }
  }
  uppercaseValidator(control: any) {
    const hasUppercase = /[A-Z]/.test(control.value);
    return hasUppercase ? null : { noUppercase: true };
  }
}
