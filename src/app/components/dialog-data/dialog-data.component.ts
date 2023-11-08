import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dialog-data',
  templateUrl: './dialog-data.component.html',
  styleUrls: ['./dialog-data.component.scss'],
})
export class DialogDataComponent {
  @Input() data: any;
}
