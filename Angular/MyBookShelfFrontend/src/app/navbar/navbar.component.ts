import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Emitters } from '../emitters/emitters';
import { FlowbiteService } from '../flowbite.service';
import { UserService } from '../../Services/user.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule, HttpClientModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{
  authenticated:boolean = false;
  constructor(private userService: UserService, private fb: FlowbiteService, private user: UserService) {}

  ngOnInit(): void {
    this.fb.loadFlowbite(flowbite => {
      // Your custom code here
      console.log('Flowbite loaded navbar', flowbite);
    });

    Emitters.authEmitter.subscribe(
      (auth:boolean) => {
        this.authenticated = auth;
      }
    )

    this.userService.getUserRoles().subscribe(
      response=> {
        this.userCredentials = response
        this.credRole = response.roles
        console.log(this.credRole, 'role')
        console.log(this.userCredentials)
      })
      this.credRole
  }
  credRole :any
  logout() {
    this.userService.logout()
    .subscribe( () => this.authenticated = false)
  }
  getLoginInfo(id: number) {
    this.user.getUserWithRoles(id).subscribe(
      response => {
        console.log(response)
      }
    )
  }

  userCredentials:any = {}

  
}
