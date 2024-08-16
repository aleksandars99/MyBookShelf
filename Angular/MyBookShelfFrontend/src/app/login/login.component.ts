import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../Services/user.service';

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
    private router: Router,
    private formBuilder: FormBuilder,
    private user: UserService
  ) {
    
  }
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      emailAdress: '',
      password: ''
    });
    
  }

  submit() {
    this.user.login(this.form.getRawValue())
    .subscribe( () => this.router.navigate(['/home']));
  }

  // getUserWithRoles() {
  //   this.user.getUserWithRoles().subscribe(
  //     (response:any) => {console.log(response)}
  //   )
  // }

}
