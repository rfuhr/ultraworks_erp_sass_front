import { Component, ContentChild, TemplateRef, ChangeDetectionStrategy, ViewEncapsulation, HostListener, input, output, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { A11yModule } from '@angular/cdk/a11y';
import { ModalSize } from './uw-modal.types';

@Component({
  selector: 'uw-modal',
  standalone: true,
  imports: [CommonModule, A11yModule],
  templateUrl: './uw-modal.component.html',
  styleUrl: './uw-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class UwModalComponent {
  readonly open = input(false);
  readonly size = input<ModalSize>('md');
  readonly width = input<string>('');
  readonly closeOnOverlay = input(true);
  readonly closeOnEscape = input(true);
  readonly showCloseButton = input(true);
  readonly title = input('');

  readonly close = output<void>();

  @ContentChild('footer', { read: TemplateRef }) footer?: TemplateRef<unknown>;

  constructor() {
    effect(() => {
      if (this.open()) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    });
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.closeOnEscape() && this.open()) {
      this.close.emit();
    }
  }

  onOverlayClick(event: MouseEvent): void {
    if (this.closeOnOverlay() && event.target === event.currentTarget) {
      this.close.emit();
    }
  }
}
