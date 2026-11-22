import {
  ChangeDetectionStrategy,
  Component,
  input,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { UwDrawerComponent } from '../drawer/uw-drawer.component';
import { UwButtonComponent } from '../button/uw-button.component';

export interface HelpSection {
  id: string;
  title: string;
  body: string;
  rules: string[];
}

export interface HelpContent {
  title: string;
  sections: HelpSection[];
}

@Component({
  selector: 'uw-help',
  standalone: true,
  imports: [CommonModule, UwDrawerComponent, UwButtonComponent],
  templateUrl: './uw-help.component.html',
  styleUrl: './uw-help.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UwHelpComponent {
  readonly content = input.required<HelpContent>();

  readonly isOpen = signal(false);

  toggle(): void {
    this.isOpen.update((v) => !v);
  }
}
