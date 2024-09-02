import { Component } from '@angular/core';
import { BookService } from '../../Services/book.service';
import { UserService } from '../../Services/user.service';
import { Router } from '@angular/router';
import { AuthorService } from '../../Services/author.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-author',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-author.component.html',
  styleUrl: './view-author.component.css'
})
export class ViewAuthorComponent {


  constructor(private bookService: BookService, 
    private userService: UserService, 
    private authorService: AuthorService,
    private router: Router) {

  }
  
  currentAuthor: any = {}
  ngOnInit(): void {
    //this.currentAuthor = this.authorService.currentAuthor
    this.getCurrentAuthor()
  }

  getCurrentAuthor () {
    this.authorService.getAuthorById()
    .subscribe(response=> {
      this.currentAuthor = response
      console.log(this.currentAuthor)
      
    })
  }

  homePage() {
    this.router.navigate(['home'])
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