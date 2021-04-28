import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User, UserDetails } from './model'

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  BASE_URL = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  signupOrLogin(email: string, password: string, url: string) {
    return this.http.post<User>(`${this.BASE_URL}/${url}`, {
      email,
      password
    }, {
      observe: 'response',
    })
  }

  isUserAutenticated() {
    let token = localStorage.getItem('token');
    if (!token) token = ''
    return this.http.get<UserDetails>(`${this.BASE_URL}/users/me`, {
      observe: 'response',
      headers: new HttpHeaders({
        'Authorization': token
      })
    })
  }

  logoutUser() {
    let token = localStorage.getItem('token');
    if (!token) token = ''
    return this.http.post(`${this.BASE_URL}/users/logout`, {}, {
      observe: 'response',
      headers: new HttpHeaders({
        'Authorization': token
      })
    })
  }

}