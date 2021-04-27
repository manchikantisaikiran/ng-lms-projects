import { HttpClient } from '@angular/common/http';
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
    return this.http.get<List[] | Task[]>(`${this.ROOT_URL}/${url}`);
  }

  post(url: string, payload: Object) {
    return this.http.post<List | Task>(`${this.ROOT_URL}/${url}`, payload);
  }

  patch(url: string, payload: Object) {
    return this.http.patch<List | Task>(`${this.ROOT_URL}/${url}`, payload);
  }

  delete(url: string) {
    return this.http.delete(`${this.ROOT_URL}/${url}`);
  }

  login(email: string, password: string) {
    return this.http.post(`${this.ROOT_URL}/users/login`, {
      email, password
    }, { observe: 'response' })
  }
}
