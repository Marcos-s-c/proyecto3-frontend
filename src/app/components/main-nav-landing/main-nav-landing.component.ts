import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-main-nav-landing',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatButtonModule],
  templateUrl: './main-nav-landing.component.html',
  styleUrls: ['./main-nav-landing.component.scss']
})
export class MainNavLandingComponent {

}
