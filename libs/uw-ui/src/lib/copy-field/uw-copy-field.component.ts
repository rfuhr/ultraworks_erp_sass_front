import { ChangeDetectionStrategy, Component, computed, input, signal, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UwIconComponent } from '../icon/uw-icon.component';

@Component({
  selector: 'uw-copy-field',
  standalone: true,
  imports: [CommonModule, UwIconComponent],
  templateUrl: './uw-copy-field.component.html',
  styleUrl: './uw-copy-field.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UwCopyFieldComponent {
  readonly value = input.required<string>();
  readonly label = input<string>('');

  readonly copied = signal(false);
  private readonly copyTimeout = signal<ReturnType<typeof setTimeout> | null>(null);

  readonly displayValue = computed(() => this.value());

  async copiar(): Promise<void> {
    try {
      await navigator.clipboard.writeText(this.value());
      this.copied.set(true);

      const prev = this.copyTimeout();
      if (prev) clearTimeout(prev);

      const timeout = setTimeout(() => this.copied.set(false), 2000);
      this.copyTimeout.set(timeout);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = this.value();
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);

      this.copied.set(true);
      const prev = this.copyTimeout();
      if (prev) clearTimeout(prev);
      const timeout = setTimeout(() => this.copied.set(false), 2000);
      this.copyTimeout.set(timeout);
    }
  }
}
