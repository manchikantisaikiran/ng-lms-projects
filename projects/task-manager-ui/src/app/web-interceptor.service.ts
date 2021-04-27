import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class WebInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    req = this.addAuthHeader(req);
    return next.handle(req).pipe(catchError((error: HttpErrorResponse) => {
      return throwError(error);
    }))
  }

  addAuthHeader(req: HttpRequest<any>) {
    const token = this.authService.getAcesstoken()
    if (token) {
      return req.clone({
        setHeaders: {
          'x-access-token': token,
        }
      })
    }
    return req;
  }
}
