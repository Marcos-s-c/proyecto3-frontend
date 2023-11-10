import {Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";

@Component({
  selector: 'app-text-area',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule],
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.scss']
})
export class TextAreaComponent {
  @Input() name: string | undefined;
  textArea = new FormControl('', [Validators.required]);
  getErrorMessage() {
    if (this.textArea.hasError('required')) {
      return 'Debes digitar un asunto.';
    }

    return this.textArea.hasError('email') ? 'El campo no puede ser vacío' : '';
  }
}
