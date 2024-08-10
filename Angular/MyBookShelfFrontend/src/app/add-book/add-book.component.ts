import { HttpClient, HttpClientModule, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CloudinaryModule } from '@cloudinary/ng';
import { Cloudinary, CloudinaryImage } from '@cloudinary/url-gen';
import { Book } from '../Book';
import { image } from '@cloudinary/url-gen/qualifiers/source';
import { response } from 'express';
import { Observable } from 'rxjs';

class ImageSnippet {
  constructor(public src: string, public file: File) {}
}

@Component({
  selector: 'app-add-book',
  standalone: true,
  imports: [HttpClientModule, FormsModule, ReactiveFormsModule, CloudinaryModule],
  templateUrl: './add-book.component.html',
  styleUrl: './add-book.component.css'
})

export class AddBookComponent  implements OnInit{
  
  img!: CloudinaryImage;
  form!: FormGroup;
  

  constructor(private http: HttpClient, private router: Router) {
    this.form = new FormGroup({
      title: new FormControl(),
      description: new FormControl(),
      image: new FormControl(),
      author: new FormControl(),
      price: new FormControl(),
      categories: new FormControl(),
      edition: new FormControl(),
      pageNumber: new FormControl(),
      alphabet: new FormControl(),
      releaseDate: new FormControl(),
      youtubeLink: new FormControl(), 
      isbn: new FormControl()
    })
  }
  
  selectedFile!: File;
  url = 'https://api.cloudinary.com/v1_1/dl5u5xg4i/image/upload';
  cloudinaryUrl!: any;

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
  
  createBook(event:any) {
    const formData = new FormData();
    const lin = this.selectedFile.name;
    // const file = document.querySelector("#imageInput");
    //const file = event?.target.files[0]


    //console.log(file)
    //console.log(typeof(file))
    formData.append('title', this.form.get('title')?.value);
    formData.append('description', this.form.get('description')?.value);
    /*if (file) {
      formData.append('image', this.form.get('image')?.value);
    }*/
    // formData.append('image', this.cloudinaryUrl);
    // formData.append('author', this.form.get('author')?.value);
    // formData.append('price', this.form.get('price')?.value);
    // formData.append('categories', this.form.get('categories')?.value);
    // formData.append('edition', this.form.get('edition')?.value);
    // formData.append('pageNumber', this.form.get('pageNumber')?.value);
    // formData.append('alphabet', this.form.get('alphabet')?.value);
    // formData.append('releaseDate', this.form.get('releaseDate')?.value);
    // formData.append('youtubeLink', this.form.get('youtubeLink')?.value);
    // formData.append('isbn', this.form.get('isbn')?.value);
    // console.log(formData)
    const data = {
      title: this.form.get('title')?.value,
      description: this.form.get('description')?.value,
      image: this.cloudinaryUrl,
      author: this.form.get('author')?.value,
      price: this.form.get('price')?.value,
      categories: this.form.get('categories')?.value,
      edition: this.form.get('edition')?.value,
      pageNumber: this.form.get('pageNumber')?.value,
      alphabet: this.form.get('alphabet')?.value,
      releaseDate: this.form.get('releaseDate')?.value,
      youtubeLink: this.form.get('youtubeLink')?.value,
      isbn: this.form.get('isbn')?.value,
    // no image in JSON
    }

    this.http.post<any>('https://localhost:7025/api/create', data)
    .subscribe(response => {
      console.log(this.form.value)
      this.router.navigate(['/home']);
    })
  }

  ngOnInit(): void {
    const cld = new Cloudinary({
      cloud: {
        cloudName: 'dl5u5xg4i'
      }
    });
  }
}
