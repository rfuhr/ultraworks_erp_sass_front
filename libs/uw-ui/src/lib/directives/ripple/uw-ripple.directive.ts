import {
  Directive,
  ElementRef,
  inject,
  input,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[uwRipple]',
  host: {
    '(click)': 'onClick($event)',
    '[style.overflow]': '"hidden"',
    '[style.position]': '"relative"',
  },
})
export class UWRipple {
  readonly uwRippleDisabled = input(false);

  private renderer = inject(Renderer2);
  private host = inject(ElementRef<HTMLElement>);

  onClick(event: MouseEvent): void {
    if (this.uwRippleDisabled()) return;

    const hostEl = this.host.nativeElement;
    const rect = hostEl.getBoundingClientRect();

    const size = Math.max(rect.width, rect.height) * 1.5;
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    const ripple = this.renderer.createElement('span');
    this.renderer.addClass(ripple, 'uw-ripple');

    this.renderer.setStyle(ripple, 'position', 'absolute');
    this.renderer.setStyle(ripple, 'width', `${size}px`);
    this.renderer.setStyle(ripple, 'height', `${size}px`);
    this.renderer.setStyle(ripple, 'left', `${x}px`);
    this.renderer.setStyle(ripple, 'top', `${y}px`);
    this.renderer.setStyle(ripple, 'border-radius', '50%');
    this.renderer.setStyle(ripple, 'background', 'rgba(255,255,255,0.4)');
    this.renderer.setStyle(ripple, 'transform', 'scale(0)');
    this.renderer.setStyle(ripple, 'animation', 'uw-ripple-anim 0.5s ease-out forwards');
    this.renderer.setStyle(ripple, 'pointer-events', 'none');

    this.renderer.appendChild(hostEl, ripple);

    setTimeout(() => {
      this.renderer.removeChild(hostEl, ripple);
    }, 500);
  }
}
