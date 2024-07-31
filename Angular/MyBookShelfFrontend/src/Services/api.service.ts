import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // constructor(private http: HttpClient ) { }

  // authenticated: boolean = false;
  // private baseUrl = 'https://localhost:7084/api';

  // getUser() {
  //   this.http.get(`${this.baseUrl}/user`, {withCredentials: true})
  // }
  // registerUser() {
  //   this.http.get(`${this.baseUrl}/Register`, {withCredentials: true})
  // }
  // loginUser() {
  //   this.http.get(`${this.baseUrl}/Login`, {withCredentials: true})
  // }

  // logout() {
  //   this.http.post("https://localhost:7084/api/Logout", {}, {withCredentials:true})
  //   .subscribe( () => this.authenticated = false)
  // }
}
