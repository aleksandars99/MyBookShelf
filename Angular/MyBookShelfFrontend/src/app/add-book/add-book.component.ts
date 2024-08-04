import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CloudinaryModule } from '@cloudinary/ng';
import { Cloudinary, CloudinaryImage } from '@cloudinary/url-gen';
import { Book } from '../Book';
import { image } from '@cloudinary/url-gen/qualifiers/source';

@Component({
  selector: 'app-add-book',
  standalone: true,
  imports: [HttpClientModule, FormsModule, ReactiveFormsModule, CloudinaryModule],
  templateUrl: './add-book.component.html',
  styleUrl: './add-book.component.css'
})
export class AddBookComponent  implements OnInit{
  
  img!: CloudinaryImage;
  constructor(private http: HttpClient, private router: Router) {
    this.form = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl(''),
      image: new FormControl(''),
      author: new FormControl('', Validators.required),
      rating: new FormControl(''),
      price: new FormControl(''),
      comments: new FormControl(''),
      categories: new FormControl('', Validators.required),
      edition: new FormControl(''),
      pageNumber: new FormControl(''),
      alphabet: new FormControl(''),
      releaseDate: new FormControl('', Validators.required),
      youtubeLink: new FormControl(''), 
      isbn: new FormControl('', Validators.required)
    })
  }
  uploadLink = 'https://api.cloudinary.com/v1_1/dl5u5xg4i/upload'
  ngOnInit(): void {
    const cld = new Cloudinary({
      cloud: {
        cloudName: 'dl5u5xg4i'
      }
    });
  }
  form!: FormGroup;

  addBook() {
    if (this.form.valid) {
      this.http.post<Book>('https://localhost:7025/api/create', this.form.value)
      .subscribe(response => {
        this.router.navigate(['/home']);
      },
    error => {
      console.log(error)
    });
    console.log(this.form.value)
    }
  }

  upload = 'https://api.cloudinary.com/v1_1/dl5u5xg4i/image/upload'
}
