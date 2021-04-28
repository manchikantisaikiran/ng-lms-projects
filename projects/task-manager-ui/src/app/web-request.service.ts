import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { List, Task } from './model';

@Injectable({
  providedIn: 'root'
})
export class WebRequestService {

  readonly ROOT_URL: string;

  constructor(private http: HttpClient) {
    this.ROOT_URL = 'http://localhost:3000';
  }

  get(url: string) {
    let token = localStorage.getItem('token');
    if (!token) token = ''
    return this.http.get<List[] | Task[]>(`${this.ROOT_URL}/${url}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': token,
      })
    })
  }

  post(url: string, payload: Object) {
    let token = localStorage.getItem('token');
    if (!token) token = ''
    return this.http.post<List | Task>(`${this.ROOT_URL}/${url}`, payload, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': token,
      })
    });
  }

  patch(url: string, payload: Object) {
    let token = localStorage.getItem('token');
    if (!token) token = ''
    return this.http.patch<List | Task>(`${this.ROOT_URL}/${url}`, payload, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': token
      })
    });
  }

  delete(url: string) {
    let token = localStorage.getItem('token');
    if (!token) token = ''
    return this.http.delete(`${this.ROOT_URL}/${url}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': token,
      })
    });
  }

  login(email: string, password: string) {
    return this.http.post(`${this.ROOT_URL}/users/login`, {
      email, password
    }, { observe: 'response' })
  }
}
