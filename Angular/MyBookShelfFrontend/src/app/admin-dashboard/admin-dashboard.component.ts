import { Component, OnInit } from '@angular/core';
import { AuthorService } from '../../Services/author.service';
import { Cloudinary, CloudinaryImage } from '@cloudinary/url-gen';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CloudinaryModule } from '@cloudinary/ng';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from '../../Services/user.service';
import { CommonModule } from '@angular/common';
import { BookService } from '../../Services/book.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CloudinaryModule, HttpClientModule, CommonModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit {

  form!: FormGroup;

  constructor(
    private authorService: AuthorService,
    private userService: UserService,
    private bookService: BookService,
    private router: Router) {
    
  }
  img!: CloudinaryImage;
  selectedFile!: File;
  url = 'https://api.cloudinary.com/v1_1/dl5u5xg4i/image/upload';
  cloudinaryUrl: string = ''
  //tempImage = 'https://res-console.cloudinary.com/dl5u5xg4i/thumbnails/v1/image/upload/v1723936204/YXRqbWN1dnpiYXNqc2FmbWVwbG8=/grid_landscape'

  onFileSelect(event: any): void {
    const file: File = event.target.files[0];
    this.selectedFile = file;

    // Log the file name (without fake path)
    console.log('Selected file name:', file.name);
    console.log(this.selectedFile);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'docs_upload_image_preset');

    fetch(this.url, {
      method: 'POST',
      body: formData,
    })
      .then((response:any) => response.text())
      .then(responseText => {
        console.log('Raw Response Text:', responseText);

        try{
          const jsonResponse = JSON.parse(responseText);
          this.cloudinaryUrl = jsonResponse.secure_url;
          console.log(this.cloudinaryUrl);
        }
        catch(error){
          console.error('Error parsing JSON', error);
        }
      })
      .catch(error => {
        console.error('Fetch error:', error);
      });
  }

  saveAuthor() {
    if (this.form) {
      const data = {
        name: this.form.get('name')?.value,
        biography: this.form.get('biography')?.value,
        image: this.cloudinaryUrl,
        isForeign: this.form.get('isForeign')?.value
      }
      //author exists - update it
      if (this.selectedAuthorId) {
        this.authorService.updateAuthor(this.selectedAuthorId, data)
          .subscribe(response => {
        console.log(response)
        setTimeout(() => {
         location.reload(); 
        }, 1000);
        })
      }
      //author does not exist
      else {
        this.authorService.addAuthor(data)
        .subscribe(response => {
          console.log(this.form.value)
          this.formReset()
        });
      } 
    }

  // setTimeout(() => {
  //   location.reload(); 
  // }, 1000);
  }

  formReset() {
    this.form.reset();
    this.selectedAuthorId = null;
    this.cloudinaryUrl = ''
  }
  ngOnInit(): void {
    const cld = new Cloudinary({
      cloud: {
        cloudName: 'dl5u5xg4i'
      }
    });

    this.form = new FormGroup ({
      name: new FormControl(),
      biography: new FormControl(),
      image: new FormControl('', Validators.required),
      isForeign: new FormControl(false)
    })

    this.getAllAuthors();
    this.getUserCredentials();
    this.getBooks();
  }

  allAuthors: any[] = []
  getAllAuthors() {
    this.authorService.getAuthors().subscribe(
      response => {
        this.allAuthors = response
        console.log(this.allAuthors)
      }
    )
  }
  selectedAuthorId : any
  currentAuthor : any
  currentImage: any
  getEditAuthor(author: any) {
    this.selectedAuthorId = author.id
    this.currentAuthor = author
    this.currentImage = author.image
    console.log(this.currentImage)
    this.form.patchValue({
      name: author.name,
      biography: author.biography,
      isForeign: author.isForeign
    });
  }
  editAuthor(id: number, data: any) {
    this.authorService.updateAuthor(id, data)
    .subscribe(response => {
      console.log(response)
    })
  }

  deleteAuthor(id: number) {
    const confirmed = window.confirm('Are you sure u want to delete this author?')
    if (confirmed) {
      this.authorService.deleteAuthor(id).subscribe(
        response => {
          location.reload();
          console.log(response)
        }
      )
    }
  }
  
  userRole: any
  getUserCredentials() {
    return this.userService.getUserRoles().subscribe(
      response=> {
        this.userRole = response.roles
        console.log(this.userRole)
      }
    )
  }

  allBooks:any[] = []
  getBooks() {
    this.bookService.getAllBooks().subscribe(
      response=> {
        this.allBooks = response
        console.log(this.allBooks, 'all books')
      }
    )
  }

  authorsPage = true;
  booksPage = false;
  userPage = false;
  accountControlerPage = false;

  openAuthors() {
    this.authorsPage = true;
    this.booksPage = false;
    this.userPage = false;
    this.accountControlerPage = false;
  }
  openBooks() {
    this.authorsPage = false;
    this.booksPage = true;
    this.userPage = false;
    this.accountControlerPage = false;
  }
  openUsers() {
    this.authorsPage = false;
    this.booksPage = false;
    this.userPage = true;
    this.accountControlerPage = false;
  }
  openAccountController() {
    this.authorsPage = false;
    this.booksPage = false;
    this.userPage = false;
    this.accountControlerPage = true;
  }

  currentBook:any = {}
  getEdition(edition: any) {
    if (this.currentBook.edition === 0) {
      return this.currentBook.edition = 'Hardcover'
    }
    else if (this.currentBook.edition === 1) {
      return this.currentBook.edition = 'Paperback'
    }
    else if (this.currentBook.edition === 2) {
      return this.currentBook.edition = 'eBook'
    }
    else {
      return this.currentBook.edition = 'Audiobook'
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

  

}
