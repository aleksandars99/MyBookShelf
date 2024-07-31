import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { error } from 'console';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, HttpClientModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  form!: FormGroup;
  constructor(private http: HttpClient, private router: Router) {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      emailAdress: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
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
    this.http.post('https://localhost:7025/api/register', user)
    .subscribe(response => {
      this.router.navigate(['/login']);
    }, error => {
      console.log('Registration failed', error)
    });
    console.log(user)
    }
  }
}
