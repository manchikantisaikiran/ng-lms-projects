import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { shareReplay, tap } from 'rxjs/operators';
import { WebRequestService } from './web-request.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router,
    private webRequestService: WebRequestService) { }

  login(email: string, password: string) {
    return this.webRequestService.login(email, password)
      .pipe(shareReplay(),
        tap((response: HttpResponse<any>) => {
          console.log(response);

          this.setSession(response.body._id,
            response.headers.get('x-acces-token'),
            response.headers.get('x-refresh-token'))
        }))
  }

  getAcesstoken() {
    return localStorage.getItem('x-access-token');
  }

  setAccessToken(accessToken: string) {
    localStorage.setItem('x-access-token', accessToken);
  }

  getrefreshToken(){
    return localStorage.getItem('x-refresh-token')
  }

  private setSession(userId: string, accessToken: string | null, refreshToken: string | null) {
    localStorage.setItem('user-id', userId);
    if (accessToken && refreshToken) {
      localStorage.setItem('access-token', accessToken);
      localStorage.setItem('refresh-token', refreshToken);
    }
  }

  private removeSession() {
    localStorage.removeItem('user-id');
    localStorage.removeItem('access-token');
    localStorage.removeItem('refresh-token');
  }

  logout() {
    this.removeSession();
  }
}
