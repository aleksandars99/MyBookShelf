import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { error } from 'console';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  form!: FormGroup

  constructor(
    private http: HttpClient,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    
  }
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      emailAdress: '',
      password: ''
    });
  }

  submit() {
    this.http.post("https://localhost:7025/api/login", this.form.getRawValue(), 
    {withCredentials: true})
    .subscribe( () => this.router.navigate(['/home']));
  }



}
