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
  newBooks: Book[] = [];
  trendingBooks: Book[] = [];
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
    this.getNewBooks();
    this.getTrendingBooks();
    console.log("Image")
    
    this.userService.getUserRoles().subscribe(
      response=> {
        this.userCredentials = response
        console.log(this.userCredentials)
      })

      const storedData = localStorage.getItem('bookData');
      if (storedData) {
        this.bookData = JSON.parse(storedData);
      } else {
        this.bookService.getBookByIsbn().subscribe(data => {
          this.bookData = data;
          localStorage.setItem('bookData', JSON.stringify(data));
        });
      }

      
  }
  bookData:any

  getBooks() {
    return this.bookService.getAllBooks().subscribe(
      (response:any) => {
        this.allBooks = response
        console.log('bks', this.allBooks)
        // this.allBooks.forEach((book:any) => {
        //   if (book.author) {
        //     console.log(`Author of "${book.title}": ${book.author.name}`);
        //   } else {
        //     console.log(`No author found for "${book.title}"`);
        //   }
        // })
      },
        error => {
        console.log(error);
      }
    )
  }

  getNewBooks() {
    this.bookService.getAllNewBooks()
    .subscribe((response:any) => {
      this.newBooks = response
      console.log('new books', this.newBooks)
    })
  }

  getTrendingBooks() {
    this.bookService.getAllTrendingBooks()
    .subscribe(response=> {
      this.trendingBooks = response
      console.log("trending books", this.trendingBooks)
    })
  }
  editBookByIsbn(isbn: string) {
    this.bookService.isbn = isbn;
    localStorage.setItem('bookIsbn', isbn)
    this.bookService.getBookByIsbn().subscribe(
      data => {
        localStorage.setItem('bookData', JSON.stringify(data));
        this.router.navigate([`editBook/:${isbn}`])
      }
    )
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
    localStorage.setItem('bookIsbn', isbn)
    this.bookService.getBookByIsbn().subscribe(
      data => {
        localStorage.setItem('bookData', JSON.stringify(data));
        this.router.navigate([`viewBook/:${isbn}`])
      }
    )
  }
}
