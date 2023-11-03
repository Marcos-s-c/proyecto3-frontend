import {Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";

@Component({
  selector: 'app-text-area',
  standalone: true,
    imports: [CommonModule, MatFormFieldModule, MatInputModule],
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.scss']
})
export class TextAreaComponent {
  @Input() Name: string | undefined;
}
