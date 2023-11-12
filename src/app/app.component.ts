import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'venus';
  constructor(private router: Router) {}

  shouldShowNavbar() {
    const currentRoute = this.router.url;
    return (
      currentRoute !== '/signup' &&
      currentRoute !== '/login' &&
      currentRoute !== '/' &&
      currentRoute !== '/#venus'  &&
      currentRoute !== '/#services'  &&
      currentRoute !== '/#testimonies' &&
      currentRoute !== '/#science' &&
      currentRoute !== '/#contact' 
    ); //
  }
}
