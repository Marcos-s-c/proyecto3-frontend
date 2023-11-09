import { LoginService } from './../../services/login.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main-nav-landing',
  templateUrl: './main-nav-landing.component.html',
  styleUrls: ['./main-nav-landing.component.scss'],
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatButtonModule],
})
export class MainNavLandingComponent implements OnInit {
  isLoggedIn = false;
  user: any = null;

  constructor(public login: LoginService, private router: Router) {}

  ngOnInit(): void {
    this.isLoggedIn = this.login.isLoggedIn();
    this.user = this.login.getUser();
    this.login.loginStatusSubjec.asObservable().subscribe((data) => {
      this.isLoggedIn = this.login.isLoggedIn();
      this.user = this.login.getUser();
    });
  }

  public logout() {
    this.login.logout();
    this.router.navigate(['/']);
  }

  navigateToHome() {
    window.location.href = '/';
  }

  navigateToLogin() {
    window.location.href = '/login';
  }
}
