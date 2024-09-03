import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BookService } from '../../Services/book.service';
import { Router } from '@angular/router';
import { UserService } from '../../Services/user.service';
import { Book } from '../Book';
import { AuthorService } from '../../Services/author.service';

@Component({
  selector: 'app-all-books',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './all-books.component.html',
  styleUrl: './all-books.component.css'
})
export class AllBooksComponent implements OnInit{

  constructor(
    private bookService: BookService,
    private userService: UserService,
    private authorService: AuthorService,
    private router: Router
  ) 
  {

  }
  ngOnInit(): void {

    this.getBooks()
    
    this.userService.getUserRoles().subscribe(
      response=> {
        this.userCredentials = response
        console.log(this.userCredentials)
      })
  }
  userCredentials:any = {}
  allBooks: Book[] = [];
  serbianBooks: any = []
  foreignBooks: any = []


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
  
  getSerbianBooks() {
    this.authorService.getForeignAuthors().subscribe(response => {
      this.serbianBooks = response
      console.log(this.serbianBooks)
    })
  }
  getForeignBooks() {
    this.authorService.getForeignAuthors().subscribe(response => {
      this.foreignBooks = response
      console.log(this.foreignBooks)
    })
  }
 
}
