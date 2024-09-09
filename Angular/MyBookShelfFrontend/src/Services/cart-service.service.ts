import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartServiceService {

  apiEndpoint = 'https://localhost:7025/order/'
  constructor(private http: HttpClient) 
  {

  }

  addToCart(bookId: number, quantity:number):Observable<any> {
    const item = {bookId, quantity}
    return this.http.post(`${this.apiEndpoint}/makeOrder`, item)
  }
  getCart(cartId: number): Observable<any> {
    return this.http.get(`${this.apiEndpoint}/${cartId}`);
  }

  removeFromCart(cartId: number, bookId: number): Observable<any> {
    return this.http.delete(`${this.apiEndpoint}/remove/${cartId}/${bookId}`);
  }

}
