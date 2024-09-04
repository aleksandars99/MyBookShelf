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
  addBook(data: any):Observable<any> {
    return this.http.post('https://localhost:7025/api/create', data)
  }
  getBookByIsbn() {
    const sbn = localStorage.getItem('bookIsbn')
    return this.http.get(`https://localhost:7025/api/getBook/${sbn}`, {withCredentials: true});
  }
  getAllBooks():Observable<any> {
    return this.http.get("https://localhost:7025/api/GetAll", {withCredentials: true})
  }
  getAllNewBooks():Observable<any> {
    return this.http.get('https://localhost:7025/api/GetNew')
  }
  getAllTrendingBooks():Observable<any> {
    return this.http.get('https://localhost:7025/api/GetTrending')
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

  getSerbianBooks():Observable<any> {
    return this.http.get('https://localhost:7025/api/SerbianBooks')
  }
  getForeignBooks():Observable<any> {
    return this.http.get('https://localhost:7025/api/ForeignBooks')
  }
  ActionBooks():Observable<any> {
    return this.http.get('https://localhost:7025/api/ActionBooks')
  }
  AdventureBooks():Observable<any> {
    return this.http.get('https://localhost:7025/api/AdventureBooks')
  }
  BiographyBooks():Observable<any> {
    return this.http.get('https://localhost:7025/api/BiographyBooks')
  }
  ChildrensBooks():Observable<any> {
    return this.http.get('https://localhost:7025/api/ChildrensBooks')
  }
  ClassicsBooks():Observable<any> {
    return this.http.get('https://localhost:7025/api/ClassicsBooks')
  }
  CrimeBooks():Observable<any> {
    return this.http.get('https://localhost:7025/api/CrimeBooks')
  }
  DramaBooks():Observable<any> {
    return this.http.get('https://localhost:7025/api/DramaBooks')
  }
  FantasyBooks():Observable<any> {
    return this.http.get('https://localhost:7025/api/FantasyBooks')
  }
  HistoryBooks():Observable<any> {
    return this.http.get('https://localhost:7025/api/HistoryBooks')
  }
  HorrorBooks():Observable<any> {
    return this.http.get('https://localhost:7025/api/HorrorBooks')
  }
  HumourBooks():Observable<any> {
    return this.http.get('https://localhost:7025/api/HumourBooks')
  }
  MangaBooks():Observable<any> {
    return this.http.get('https://localhost:7025/api/MangaBooks')
  }
  ParanormalBooks():Observable<any> {
    return this.http.get('https://localhost:7025/api/ParanormalBooks')
  }
  PhilosophyBooks():Observable<any> {
    return this.http.get('https://localhost:7025/api/PhilosophyBooks')
  }
  PsychologyBooks():Observable<any> {
    return this.http.get('https://localhost:7025/api/PsychologyBooks')
  }
  ReligionBooks():Observable<any> {
    return this.http.get('https://localhost:7025/api/ReligionBooks')
  }
  ScienceBooks():Observable<any> {
    return this.http.get('https://localhost:7025/api/ScienceBooks')
  }
  SciFiBooks():Observable<any> {
    return this.http.get('https://localhost:7025/api/SciFiBooks')
  }

  sortByNameDescending():Observable<any> {
    return this.http.get('https://localhost:7025/api/SortByNameDescending')
  }

  sortByNameAscending():Observable<any> {
    return this.http.get('https://localhost:7025/api/SortByNameAscending')
  }

}
