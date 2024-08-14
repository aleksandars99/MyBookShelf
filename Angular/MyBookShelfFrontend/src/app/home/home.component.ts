import { Component, OnInit } from '@angular/core';
import { response } from 'express';
import { Emitters } from '../emitters/emitters';
import { error } from 'console';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Book } from '../Book';
import { BookService } from '../../Services/book.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  constructor(private bookService: BookService, private router: Router) {}

  message = 'Hi'
  currentUser = ''
  allBooks: Book[] = [];
  ngOnInit(): void {
    this.bookService.getUser().subscribe(
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
}
