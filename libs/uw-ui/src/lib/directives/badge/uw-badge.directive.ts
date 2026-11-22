import {
  Directive,
  ElementRef,
  effect,
  inject,
  input,
  OnDestroy,
  Renderer2,
} from '@angular/core';

export type UWBadgePosition =
  | 'above after'
  | 'above before'
  | 'below before'
  | 'below after';

@Directive({
  selector: '[uwBadge]',
})
export class UWBadge implements OnDestroy {
  readonly uwBadge = input<string | number>('');
  readonly uwBadgePosition = input<UWBadgePosition>('above after');
  readonly uwBadgeHidden = input<boolean>(false);

  private renderer = inject(Renderer2);
  private host = inject(ElementRef<HTMLElement>);
  private badgeEl: HTMLElement;

  constructor() {
    const hostEl = this.host.nativeElement;

    if (getComputedStyle(hostEl).position === 'static') {
      this.renderer.setStyle(hostEl, 'position', 'relative');
    }

    this.badgeEl = this.renderer.createElement('span');
    this.renderer.addClass(this.badgeEl, 'uw-badge-overlay');

    this.renderer.setStyle(this.badgeEl, 'position', 'absolute');
    this.renderer.setStyle(this.badgeEl, 'box-sizing', 'border-box');
    this.renderer.setStyle(this.badgeEl, 'min-width', '18px');
    this.renderer.setStyle(this.badgeEl, 'height', '18px');
    this.renderer.setStyle(this.badgeEl, 'padding', '0 4px');
    this.renderer.setStyle(this.badgeEl, 'border-radius', '999px');
    this.renderer.setStyle(this.badgeEl, 'background', '#e53e3e');
    this.renderer.setStyle(this.badgeEl, 'color', '#fff');
    this.renderer.setStyle(this.badgeEl, 'font-size', '11px');
    this.renderer.setStyle(this.badgeEl, 'font-weight', '700');
    this.renderer.setStyle(this.badgeEl, 'font-family', "'JetBrains Mono', monospace");
    this.renderer.setStyle(this.badgeEl, 'line-height', '18px');
    this.renderer.setStyle(this.badgeEl, 'text-align', 'center');
    this.renderer.setStyle(this.badgeEl, 'pointer-events', 'none');
    this.renderer.setStyle(this.badgeEl, 'user-select', 'none');
    this.renderer.setStyle(this.badgeEl, 'z-index', '1');

    this.renderer.appendChild(hostEl, this.badgeEl);

    effect(() => {
      const text = String(this.uwBadge() ?? '');
      const hidden = this.uwBadgeHidden();
      const pos = this.uwBadgePosition();

      this.renderer.setProperty(this.badgeEl, 'textContent', text);
      this.renderer.setStyle(
        this.badgeEl,
        'display',
        hidden || !text ? 'none' : '',
      );

      this.renderer.setStyle(this.badgeEl, 'top', null);
      this.renderer.setStyle(this.badgeEl, 'bottom', null);
      this.renderer.setStyle(this.badgeEl, 'left', null);
      this.renderer.setStyle(this.badgeEl, 'right', null);

      const [y, x] = pos.split(' ') as [string, string];

      if (y === 'above') this.renderer.setStyle(this.badgeEl, 'top', '-8px');
      else this.renderer.setStyle(this.badgeEl, 'bottom', '-8px');

      if (x === 'after') this.renderer.setStyle(this.badgeEl, 'right', '-8px');
      else this.renderer.setStyle(this.badgeEl, 'left', '-8px');
    });
  }

  ngOnDestroy(): void {
    if (this.badgeEl) {
      this.renderer.removeChild(this.host.nativeElement, this.badgeEl);
    }
  }
}
