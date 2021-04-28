import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './model'

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  BASE_URL = 'localhost:3000';

  constructor(private http: HttpClient) { }

  signupOrLogin(email: string, password: string, url: string) {
    return this.http.post<User>(`${this.BASE_URL}/${url}`, {
      email,
      password
    }, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        // s'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDg4NTE1NGQ2MGJiYzA2NmMwNzUzNWUiLCJpYXQiOjE2MTk1ODQ1ODd9.mzKL3a3MVurNK11oNbrcl_CEInRJfs5sUVSA_eUkozc'
      })
    }
    )
  }
}
