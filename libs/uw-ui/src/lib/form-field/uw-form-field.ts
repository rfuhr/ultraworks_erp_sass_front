import { Component, input } from '@angular/core';
import { UwIconComponent } from '../icon/uw-icon.component';

@Component({
  selector: 'uw-form-field',
  standalone: true,
  imports: [UwIconComponent],
  templateUrl: './uw-form-field.html',
  styleUrl: './uw-form-field.scss',
})
export class FormFieldComponent {
  readonly label = input.required<string>();
  readonly required = input(false);
  readonly hint = input<string>();
}
