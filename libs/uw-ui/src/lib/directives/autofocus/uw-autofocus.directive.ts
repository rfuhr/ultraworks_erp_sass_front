import { Directive, effect, ElementRef, inject, input } from '@angular/core';

@Directive({
  selector: '[uwAutofocus]',
  standalone: true,
})
export class UwAutofocusDirective {
  readonly uwAutofocus = input(false);

  private readonly el = inject(ElementRef<HTMLElement>);

  constructor() {
    effect(() => {
      if (!this.uwAutofocus()) return;
      setTimeout(() => {
        const focusable = this.el.nativeElement.querySelector('input, button, textarea, select, [tabindex]:not([tabindex="-1"])');
        (focusable || this.el.nativeElement)?.focus();
      });
    });
  }
}
