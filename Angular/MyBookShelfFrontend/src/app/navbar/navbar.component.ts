import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Emitters } from '../emitters/emitters';
import { FlowbiteService } from '../flowbite.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule, HttpClientModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{
  authenticated:boolean = false;
  constructor(private http: HttpClient, private fb: FlowbiteService) {}

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
  }
  logout() {
    this.http.post("https://localhost:7025/api/logout", {}, {withCredentials: true})
    .subscribe( () => this.authenticated = false)
  }
}
