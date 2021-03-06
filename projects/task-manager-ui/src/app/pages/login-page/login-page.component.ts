import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../login.service';
import { User } from '../../model';
import { FormControl } from '@angular/forms'

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  email = new FormControl('');
  password = new FormControl('');
  toLogin = true;
  buttonClicked = false;
  loginStatusMsg = '';
  loginStatus = false;

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
    this.loginService.isUserAutenticated()
      .subscribe(res => {
        this.router.navigate(['/lists']);
      }, err => console.log(err))
  }

  toggle() {
    this.email.setValue('');
    this.password.setValue('');
    this.toLogin = !this.toLogin;
  }

  onLoginbutton(email: string, password: string) {
    this.buttonClicked = true;
    if (this.toLogin) {
      this.loginService.signupOrLogin(email, password, 'users/login')
        .subscribe(res => {
          this.responsehandler(res);
        }, (err: HttpErrorResponse) => {
          this.errorHandler(err);
        })
    } else {
      this.loginService.signupOrLogin(email, password, 'users')
        .subscribe(res => {
          this.responsehandler(res);
        }, (err: HttpErrorResponse) => {
          this.errorHandler(err);
        })
    }
  }

  responsehandler(res: HttpResponse<User>) {
    if (res.status === 200 && res.body || res.status === 201 && res.body) {
      localStorage.setItem('userDetails', JSON.stringify(res.body.user));
      localStorage.setItem('token', res.body.token);
      this.loginStatusMsg = 'loginSuccess!'
      this.loginStatus = true;
      this.router.navigate(['/lists']);
    }
  }

  errorHandler(err: HttpErrorResponse) {
    this.loginStatus = false;
    this.loginStatusMsg = err.error.error;
  }

}
