import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginForm } from 'src/app/services/http/http.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  formLogin: LoginForm = {} as LoginForm;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  login() {
    this.router.navigate(['/tabs']);
  }

}
