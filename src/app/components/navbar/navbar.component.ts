import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { LoginService } from './../../services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  isLoggedIn = false;
  user: any = null;
  currentRoute: string = '';

  constructor(public login: LoginService, private router: Router) {
    // Suscríbete al evento NavigationEnd para obtener la URL una vez que la navegación se completa
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url;
      }
    });
  }

  ngOnInit(): void {
    this.isLoggedIn = this.login.isLoggedIn();
    this.user = this.login.getUser();
    this.login.loginStatusSubjec.asObservable().subscribe((data) => {
      this.user = this.login.getUser();
    });
  }

  public logout() {
    this.login.logout();
    this.router.navigate(['/']);
    this.isLoggedIn = false;
    this.user = null;
  }
}
