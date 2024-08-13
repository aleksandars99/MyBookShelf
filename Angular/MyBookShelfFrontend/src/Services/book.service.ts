import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private apiUrl = 'https:localhost:7025/api'

  constructor(private http: HttpClient) { }

  getUser(): Observable<any> {
    return this.http.get('https://localhost:7025/api/user', {withCredentials: true})
  }
  isbn: string = ''
  getBookByIsbn() {
    return this.http.get(`https://localhost:7025/api/getBook/${this.isbn}`, {withCredentials: true});
  }
  getAllBooks():Observable<any> {
    return this.http.get("https://localhost:7025/api/AllBooks", {withCredentials: true})
  }
  updateBook():Observable<any> {
    return this.http.put(`https://localhost:7025/edit/${this.isbn}`,{withCredentials: true})
  }
}
