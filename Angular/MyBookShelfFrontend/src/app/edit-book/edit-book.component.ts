import { Component, OnInit } from '@angular/core';
import { BookService } from '../../Services/book.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-book',
  standalone: true,
  imports: [HttpClientModule, CommonModule, FormsModule],
  templateUrl: './edit-book.component.html',
  styleUrl: './edit-book.component.css'
})
export class EditBookComponent implements OnInit {
  constructor(private bookService: BookService) {

  }
  ngOnInit(): void {
    console.log(this.bookService.isbn)
    this.getCurrentBook()
  }
  currentBook:any
  getCurrentBook() {
    this.bookService.getBookByIsbn().subscribe(
      (response:any) => {
        this.currentBook = response
        console.log(this.currentBook)
      }
    )
  }

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

  aboutBook = true
  showAboutBook() {
    this.comments = false
    this.aboutBook = true
  }
  comments = false
  showComments() {
    this.aboutBook = false
    this.comments = true
  }

  cutPrice(price:string):string {
    return price.split(' ')[0]
  }
  cutPriceEur(price:any):any {
    const priceNumber = parseFloat(price.split(' ')[0]); 
    const conversionRate = 0.0085; 
    const priceInEUR = priceNumber * conversionRate; 
    const flooredPriceInEUR = Math.floor(priceInEUR); 
    return flooredPriceInEUR.toString(); 
  }
  cutPriceBam(price:any):any {
    const priceNumber = parseFloat(price.split(' ')[0]); 
    const conversionRate = 0.017; 
    const priceInEUR = priceNumber * conversionRate; 
    const flooredPriceInEUR = Math.floor(priceInEUR); 
    return flooredPriceInEUR.toString(); 
  }
  cutPriceMkd(price:any):any {
    const priceNumber = parseFloat(price.split(' ')[0]); 
    const conversionRate = 0.53; 
    const priceInMKD = priceNumber * conversionRate; 
    const roundedPrice = Math.ceil(priceInMKD / 100) * 100;
    return roundedPrice.toString()
  }
  hardcoverPrice(price:any):any {
    const priceNumber = parseFloat(price.split(' ')[0]); 
    const conversionRate = 1.5; 
    const hardcoverPrice = priceNumber * conversionRate; 
    const roundedPrice = Math.ceil(hardcoverPrice / 100) * 100;
    return roundedPrice.toString()
  }
  eBookPrice(price:any):any {
    const priceNumber = parseFloat(price.split(' ')[0]); 
    const conversionRate = 0.6; 
    const eBookPrice = priceNumber * conversionRate; 
    const roundedPrice = Math.ceil(eBookPrice / 100) * 100;
    return roundedPrice.toString()
  }
  audioBookPrice(price:any):any {
    const priceNumber = parseFloat(price.split(' ')[0]); 
    const conversionRate = 1.2; 
    const audiobookPrice = priceNumber * conversionRate; 
    const roundedPrice = Math.ceil(audiobookPrice / 100) * 100;
    return roundedPrice.toString()
  }

  
}

