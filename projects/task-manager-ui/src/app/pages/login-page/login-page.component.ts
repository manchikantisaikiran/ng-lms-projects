import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { LoginService } from '../../login.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  toLogin = true;

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
  }

  toggle() {
    this.toLogin = !this.toLogin;
  }

  onLoginbutton(email: string, password: string) {
    if (this.toLogin) {
      this.loginService.signupOrLogin(email, password,'users/login')
        .subscribe(res => {
          console.log(res);
        })
    } else {
      this.loginService.signupOrLogin(email, password,'users')
        .subscribe(res => {
          console.log(res);
        })
    }
  }

}
