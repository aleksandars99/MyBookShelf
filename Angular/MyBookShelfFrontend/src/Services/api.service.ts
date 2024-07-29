import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient ) { }

  getApi() {
    this.http.get<any>("https://localhost:7025/api/login")
  }
}
