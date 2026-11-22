import { ChangeDetectionStrategy, Component, computed, input, output, signal, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UwIconComponent } from '../icon/uw-icon.component';
import type { UwAlertVariant } from './uw-alert.types';

const ICON_MAP: Record<UwAlertVariant, string> = {
  info: 'info',
  success: 'check_circle',
  warning: 'warning',
  danger: 'error',
};

@Component({
  selector: 'uw-alert',
  standalone: true,
  imports: [CommonModule, UwIconComponent],
  templateUrl: './uw-alert.component.html',
  styleUrl: './uw-alert.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UwAlertComponent {
  readonly variant = input<UwAlertVariant>('info');
  readonly dismissible = input<boolean>(false);

  readonly dismissed = output<void>();

  private readonly _hidden = signal(false);
  readonly visible = computed(() => !this._hidden());

  readonly alertClass = computed(() => `uw-alert uw-alert--${this.variant()}`);
  readonly iconName = computed(() => ICON_MAP[this.variant()]);

  onDismiss(): void {
    this._hidden.set(true);
    this.dismissed.emit();
  }
}
