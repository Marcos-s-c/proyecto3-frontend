import { Component } from '@angular/core';

@Component({
  selector: 'app-button',
  template: `
    <button mat-raised-button>
      <ng-content></ng-content>
    </button>
  `,
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {}
