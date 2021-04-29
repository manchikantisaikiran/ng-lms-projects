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

  getHeaders(): HttpHeaders {
    let token = localStorage.getItem('token');
    if (!token) return new HttpHeaders({});
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token,
    })
  }

  get(url: string) {
    return this.http.get<List[] | Task[]>(`${this.ROOT_URL}/${url}`, {
      headers: this.getHeaders()
    })
  }

  post(url: string, payload: Object) {
    return this.http.post<List | Task>(`${this.ROOT_URL}/${url}`, payload, {
      headers: this.getHeaders()
    });
  }

  patch(url: string, payload: Object) {
    return this.http.patch<List | Task>(`${this.ROOT_URL}/${url}`, payload, {
      headers: this.getHeaders()
    });
  }

  delete(url: string) {
    return this.http.delete(`${this.ROOT_URL}/${url}`, {
      headers: this.getHeaders()
    });
  }
}