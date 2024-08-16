import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from '../app/Book';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private apiUrl = 'https:localhost:7025/api'

  constructor(private http: HttpClient) { }

  // getUser(): Observable<any> {
  //   return this.http.get('https://localhost:7025/api/user', {withCredentials: true})
  // }
  // getUserRoles(): Observable<any> {
  //   return this.http.get('https://localhost:7025/api/userRoles', {withCredentials: true})
  // }
  isbn: string = ''
  getBookByIsbn() {
    const sbn = localStorage.getItem('bookIsbn')
    return this.http.get(`https://localhost:7025/api/getBook/${sbn}`, {withCredentials: true});
  }
  getAllBooks():Observable<any> {
    return this.http.get("https://localhost:7025/api/AllBooks", {withCredentials: true})
  }
  updateBook(data: Book, isbn: string):Observable<any> {
    return this.http.put(`https://localhost:7025/api/edit/${isbn}`, data)
  }
  deleteBook(isbn: string): Observable<any> {
    return this.http.delete(`https://localhost:7025/api/delete/${isbn}`)
  }
  comment(data: any):Observable<any> {
    return this.http.post('https://localhost:7025/api/addComment', data, {withCredentials: true})
  }
}
