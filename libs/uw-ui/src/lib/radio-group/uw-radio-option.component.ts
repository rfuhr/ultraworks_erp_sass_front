import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  input,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { UwRadioGroupComponent } from './uw-radio-group.component';

@Component({
  selector: 'uw-radio-option',
  standalone: true,
  templateUrl: './uw-radio-option.component.html',
  styleUrl: './uw-radio-option.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UwRadioOptionComponent {
  readonly value = input<any>();
  readonly disabled = input(false);
  readonly label = input('');

  readonly group = signal<UwRadioGroupComponent | null>(null);
  readonly checked = signal(false);
  readonly optionName = signal('');

  @HostListener('keydown', ['$event'])
  onKeydown(event: KeyboardEvent): void {
    const g = this.group();
    if (!g) return;
    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
      event.preventDefault();
      g.focusNext(this);
    } else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
      event.preventDefault();
      g.focusPrev(this);
    }
  }

  select(): void {
    const g = this.group();
    if (g) {
      g.selectOption(this);
    }
  }

  focus(): void {
    const el = document.querySelector<HTMLElement>(`uw-radio-option[ng-reflect-value="${this.value()}"]`);
    el?.focus();
  }
}
