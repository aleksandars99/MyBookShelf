import { Component, OnInit } from '@angular/core';
import { BookService } from '../../Services/book.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { response } from 'express';

@Component({
  selector: 'app-edit-book',
  standalone: true,
  imports: [HttpClientModule, CommonModule, FormsModule],
  templateUrl: './edit-book.component.html',
  styleUrl: './edit-book.component.css'
})
export class EditBookComponent implements OnInit {
  priceVal: any
  priceStable: any
  editionPrice: any
  currencyVal: string = 'RSD'
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
        this.priceVal =this.cutPrice(this.currentBook.price)
        console.log(this.priceVal)
        this.hardcoverPriceVal = this.priceVal * 1.5
        this.letherbackPriceVal = this.priceVal
        this.eBookPriceVal = this.priceVal * 0.6
        this.audiobookPriceVal = this.priceVal * 1.2
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
  // hardcoverPrice(price:any):any {
  //   const priceNumber = parseFloat(price.split(' ')[0]); 
  //   const conversionRate = 1.5; 
  //   const hardcoverPrice = priceNumber * conversionRate; 
  //   const roundedPrice = Math.ceil(hardcoverPrice / 100) * 100;
  //   return roundedPrice.toString()
  // }
  // eBookPrice(price:any):any {
  //   const priceNumber = parseFloat(price.split(' ')[0]); 
  //   const conversionRate = 0.6; 
  //   const eBookPrice = priceNumber * conversionRate; 
  //   const roundedPrice = Math.ceil(eBookPrice / 100) * 100;
  //   return roundedPrice.toString()
  // }
  // audioBookPrice() {
  //   this.editionPrice = this.editionPrice * 1.2
  //   const conversionRate = 1.2; 
  //   //const audiobookPrice = priceNumber * conversionRate; 
  //   //const roundedPrice = Math.ceil(audiobookPrice / 100) * 100;
  //   //return roundedPrice.toString()
  // }
  hardcoverPriceVal:any
  letherbackPriceVal:any
  eBookPriceVal:any
  audiobookPriceVal:any

  changeToRsd() {
    var priceNum = parseFloat(this.currentBook.price.split(' ')[0])
    this.priceVal =Math.floor(priceNum)
    this.editionPrice = this.priceVal
    console.log(this.editionPrice)
    this.currencyVal = "RSD"
    this.hardcoverPriceVal =Math.floor(this.priceVal * 1.5)
    this.letherbackPriceVal = Math.floor(this.priceVal)
    this.eBookPriceVal = Math.floor(this.priceVal * 0.6)
    this.audiobookPriceVal = Math.floor(this.priceVal * 1.2)
  }
  changeToEur(){
    var priceNum = parseFloat(this.currentBook.price.split(' ')[0])
    this.priceVal =Math.floor(priceNum* 0.0085)
    this.editionPrice = this.priceVal
    console.log(this.editionPrice)
    this.currencyVal = "EUR"
    this.hardcoverPriceVal =Math.floor(this.priceVal * 1.5)
    this.letherbackPriceVal = Math.floor(this.priceVal)
    this.eBookPriceVal = Math.floor(this.priceVal * 0.6)
    this.audiobookPriceVal = Math.floor(this.priceVal * 1.2)
  }
  changeToBam() {
    var priceNum = parseFloat(this.currentBook.price.split(' ')[0])
    this.priceVal =Math.floor(priceNum* 0.017)
    this.editionPrice = this.priceVal
    console.log(this.editionPrice)
    this.currencyVal = "BAM"
    this.hardcoverPriceVal =Math.floor(this.priceVal * 1.5)
    this.letherbackPriceVal = Math.floor(this.priceVal)
    this.eBookPriceVal = Math.floor(this.priceVal * 0.6)
    this.audiobookPriceVal = Math.floor(this.priceVal * 1.2)
  }
  changeToMkd() {
    var priceNum = parseFloat(this.currentBook.price.split(' ')[0])
    this.priceVal =Math.ceil((priceNum* 0.53)/100)*100
    this.editionPrice = this.priceVal
    console.log(this.editionPrice)
    this.currencyVal = "MKD"
    this.hardcoverPriceVal =Math.floor(this.priceVal * 1.5)
    this.letherbackPriceVal = Math.floor(this.priceVal)
    this.eBookPriceVal = Math.floor(this.priceVal * 0.6)
    this.audiobookPriceVal = Math.floor(this.priceVal * 1.2)
  }
  updateBook() {
    this.bookService.updateBook().subscribe(
      (response:any) => {
        console.log(response)
      }
    )
  }
}

