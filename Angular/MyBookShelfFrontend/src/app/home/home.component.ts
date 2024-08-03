import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../Services/api.service';
import { response } from 'express';
import { Emitters } from '../emitters/emitters';
import { error } from 'console';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Book } from '../Book';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  constructor(private http: HttpClient, private apiService: ApiService) {}

  message = 'Hi'
  currentUser = ''
  allBooks: Book[] = [];
  ngOnInit(): void {
    this.http.get('https://localhost:7025/api/user', {withCredentials: true})
    .subscribe(
      (response:any) => {
        this.message = `Hi ${response.userName}`;
        this.currentUser = response.userName;
        Emitters.authEmitter.emit(true)
      },
      error => {
        this.message = "You are not logged in";
        Emitters.authEmitter.emit(false)
      }
    )
    console.log(this.message + "User")
    this.getBooks();
    console.log("Image")
  }
  getBooks() {
    return this.http.get("https://localhost:7025/api/AllBooks", {withCredentials: true})
    .subscribe(
      (response:any) => {
        this.allBooks = response
        console.log('bks', this.allBooks);
      },
      error => {
        console.log(error);
      }
    )
  }
}
