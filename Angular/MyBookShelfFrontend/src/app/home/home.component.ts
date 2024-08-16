import { Component, OnInit } from '@angular/core';
import { response } from 'express';
import { Emitters } from '../emitters/emitters';
import { error } from 'console';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Book } from '../Book';
import { BookService } from '../../Services/book.service';
import { Router } from '@angular/router';
import { UserService } from '../../Services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HttpClientModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  constructor(private bookService: BookService,private userService:UserService, private router: Router) {}

  message = 'Hi'
  currentUser:any
  logedUser: any
  userCredentials:any = {}
  allBooks: Book[] = [];
  ngOnInit(): void {
    this.userService.getUser().subscribe(
      (response:any) => {
        this.logedUser = response
        console.log(this.logedUser)
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
    
    this.userService.getUserRoles().subscribe(
      response=> {
        this.userCredentials = response
        console.log(this.userCredentials)
      })
  }
  getBooks() {
    return this.bookService.getAllBooks().subscribe(
      (response:any) => {
        this.allBooks = response
        console.log('bks', this.allBooks)
      },
        error => {
        console.log(error);
      }
    )
  }
  getBookByIsbn(isbn: string) {
    console.log(isbn)
    this.bookService.isbn = isbn;
    this.router.navigate([`editBook/:${isbn}`])
  }
  deleteBook(isbn: string) {
    const confirmed = window.confirm('Are you sure u want to delete this book?')
    if (confirmed) {
      this.bookService.deleteBook(isbn).subscribe(
        response => {
          location.reload();
          console.log(response)
        }
      )
    }
    else {
      console.log('delete canceled')
    }
    
  }
  viewBook(isbn: string) {
    this.bookService.isbn = isbn
    this.router.navigate([`viewBook/:${isbn}`])
  }
}
