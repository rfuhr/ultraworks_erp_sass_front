import { ChangeDetectionStrategy, Component, ContentChild, effect, HostListener, input, output, TemplateRef, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { A11yModule } from '@angular/cdk/a11y';
import type { UwDrawerSize } from './uw-drawer.types';

@Component({
  selector: 'uw-drawer',
  standalone: true,
  imports: [CommonModule, OverlayModule, A11yModule],
  templateUrl: './uw-drawer.component.html',
  styleUrl: './uw-drawer.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UwDrawerComponent {
  readonly open = input(false);
  readonly position = input<'right' | 'left'>('right');
  readonly size = input<UwDrawerSize>('md');
  readonly title = input<string>();
  readonly subTitle = input<string>();
  readonly headerClass = input<string>();
  readonly showOverlay = input(true);

  readonly close = output<void>();

  @ContentChild('header') headerTemplate?: TemplateRef<unknown>;
  @ContentChild('footer') footerTemplate?: TemplateRef<unknown>;

  constructor() {
    effect(() => {
      document.body.style.overflow = this.open() ? 'hidden' : '';
    });
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.open()) {
      this.close.emit();
    }
  }
}
