import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { response } from 'express';

@Component({
  selector: 'app-add-book',
  standalone: true,
  imports: [HttpClientModule, FormsModule, ReactiveFormsModule],
  templateUrl: './add-book.component.html',
  styleUrl: './add-book.component.css'
})
export class AddBookComponent {
  constructor(private http: HttpClient) {
    this.form = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl(''),
      image: new FormControl(''),
      author: new FormControl('', Validators.required),
      rating: new FormControl(''),
      price: new FormControl(''),
      comments: new FormControl(''),
      categories: new FormControl(''),
      edition: new FormControl(''),
      pageNumber: new FormControl(''),
      alphabet: new FormControl(''),
      releaseDate: new FormControl(''),
      youtubeLink: new FormControl(''), 
      isbn: new FormControl('', Validators.required)
    })
  }
  form!: FormGroup;
  genres = ['Fantasy', 'Science Fiction', 'Mystery', 'Thriller', 'Romance', 'Non-Fiction', 'Biography', 'History', 'Children'];
  
  addBook() {
    this.http.post("https://localhost:7025/api/create", this.form)
    .subscribe(response => {
      console.log(response)
    })
  }
}
