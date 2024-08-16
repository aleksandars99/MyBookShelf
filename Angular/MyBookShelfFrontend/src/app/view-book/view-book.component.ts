import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BookService } from '../../Services/book.service';
import { response } from 'express';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from '../../Services/user.service';

@Component({
  selector: 'app-view-book',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './view-book.component.html',
  styleUrl: './view-book.component.css'
})
export class ViewBookComponent implements OnInit{

  form!: FormGroup
  constructor(private bookService: BookService, private userService: UserService) {

  }
  initializeForm() {
    this.form = new FormGroup({
        text: new FormControl('', Validators.required),
        dateTime: new FormControl(Date.now()),
        userName: new FormControl(this.currentUser.userName),
        bookId: new FormControl(this.currentBook.id)
    }) 
    console.log(this.form.value);
  }

  comment() {
    const data ={
      text : this.form.get('text')?.value,
      // dateTime: this.form.get('dateTime')?.value,
      // userName: this.form.get('userName')?.value,
      bookId: this.form.get('bookId')?.value
    }
    // console.log(data)
    this.bookService.comment(data).subscribe(
      response => {
        console.log(response)
      }
    )
  }

  ngOnInit(): void {
    this.getCurrentBook()
    this.getCurrentUser()
    //console.log(this.form.value)
  }
  currentBook:any = {}
  aboutBook = true
  showAboutBook() {
    this.commentsActive = false
    this.aboutBook = true
  }
  commentsActive = false
  showComments() {
    this.aboutBook = false
    this.commentsActive = true
  }
  getCurrentBook() {
    this.bookService.getBookByIsbn()
    .subscribe(response =>{
      this.currentBook = response
      console.log(this.currentBook)

      if (this.currentBook && this.currentUser) {
        this.initializeForm();
      }
    })
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
  priceVal: any
  editionPrice:any
  currencyVal: string = ''
  changeToRsd() {
    var priceNum = parseFloat(this.currentBook.price.split(' ')[0])
    this.priceVal =Math.floor(priceNum)
    this.editionPrice = this.priceVal
    console.log(this.editionPrice)
    this.currencyVal = "RSD"
  }
  changeToEur(){
    var priceNum = parseFloat(this.currentBook.price.split(' ')[0])
    this.priceVal =Math.floor(priceNum* 0.0085)
    this.editionPrice = this.priceVal
    console.log(this.editionPrice)
    this.currencyVal = "EUR"
  }
  changeToBam() {
    var priceNum = parseFloat(this.currentBook.price.split(' ')[0])
    this.priceVal =Math.floor(priceNum* 0.017)
    this.editionPrice = this.priceVal
    console.log(this.editionPrice)
    this.currencyVal = "BAM"
  }
  changeToMkd() {
    var priceNum = parseFloat(this.currentBook.price.split(' ')[0])
    this.priceVal =Math.ceil((priceNum* 0.53)/100)*100
    this.editionPrice = this.priceVal
    console.log(this.editionPrice)
    this.currencyVal = "MKD"
  }

  currentUser:any = {}
  getCurrentUser() {
    this.userService.getUserRoles().subscribe(
      response => {  
        this.currentUser = response
        console.log(this.currentUser)
      } 
    )
    if (this.currentUser && this.currentBook) {
      this.initializeForm();
    }
    console.log(this.form.value)
  }
  // addComment() {
  //   this.bookService.comment()
  // }
}
