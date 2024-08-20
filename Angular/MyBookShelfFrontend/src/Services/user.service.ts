import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUserWithRoles(id: number):Observable<any> {
    return this.http.get(`https://localhost:7025/api/getUserWithRole/${id}`, {withCredentials: true});
  }
  login(data: any):Observable<any> {
    return this.http.post('https://localhost:7025/api/login', data, { withCredentials: true });
  }
  register(data:any):Observable<any> {
    return this.http.post('https://localhost:7025/api/register', data, {withCredentials: true});
  }
  logout():Observable<any> {
    return this.http.post("https://localhost:7025/api/logout", {}, {withCredentials: true})
  }
  getUser(): Observable<any> {
    return this.http.get('https://localhost:7025/api/user', {withCredentials: true})
  }
  getUserRoles(): Observable<any> {
    return this.http.get('https://localhost:7025/api/userRoles', {withCredentials: true})
  }

  getAllUsers():Observable<any> {
    return this.http.get('https://localhost:7025/api/getAllUsers')
  }

  updateUser(data: any):Observable<any> {
    return this.http.put('https://localhost:7025/api/updateUser', data, {withCredentials: true})
  }
}
