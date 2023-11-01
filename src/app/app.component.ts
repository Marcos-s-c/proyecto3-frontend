import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'sistema-examenes-frontend';
  constructor(private router: Router) {}

  shouldShowNavbar() {
    const currentRoute = this.router.url;
    return currentRoute !== '/signup' && currentRoute !== '/login'; //
  }
}
