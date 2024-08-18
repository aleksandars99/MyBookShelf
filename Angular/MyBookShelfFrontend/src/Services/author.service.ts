import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  constructor(
    private http:HttpClient
  ) { 

  }
  url = 'https://api.cloudinary.com/v1_1/dl5u5xg4i/image/upload';


  addAuthorImage(data: any):Observable<any> {
  return this.http.post(this.url, data)
  }

  getAuthors():Observable<any> {
     return this.http.get('https://localhost:7025/api/getAllAuthors')
  }

  getAuthorById(id: number):Observable<any> {
    return this.http.get(`https://localhost:7025/api/getAuthorById/${id}`)
  }

  addAuthor(data:any):Observable<any> {
    return this.http.post('https://localhost:7025/api/addAuthor', data)
  }
  updateAuthor(id: any, data:any):Observable<any> {
    return this.http.put(`https://localhost:7025/api/editAuthor/${id}`, data, {withCredentials: true})
  }

  deleteAuthor(id: number):Observable<any> {
    return this.http.delete(`https://localhost:7025/api/deleteAuthor/${id}`);
  }
  
  getSerbianAuthors() {
    return this.http.get(`https://localhost:7025/api/getSerbianAuthors`)
  }

  getForeignAuthors() {
    return this.http.get(`https://localhost:7025/api/getForeignAuthors`)
  }

}
