import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../Services/api.service';
import { response } from 'express';
import { Emitters } from '../emitters/emitters';
import { error } from 'console';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  constructor(private http: HttpClient) {}

  message = 'Hi'
  ngOnInit(): void {
    this.http.get('https://localhost:7025/api/user', {withCredentials: true})
    .subscribe(
      (response:any) => {
        this.message = `Hi ${response.userName}`;
        Emitters.authEmitter.emit(true)
      },
      error => {
        this.message = "You are not logged in";
        Emitters.authEmitter.emit(false)
      }
    )
    console.log(this.message + "User")
  }
}
