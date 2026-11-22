import { Directive } from '@angular/core';

@Directive({
  selector: '[uwCardHeader]',
  standalone: true,
})
export class UwCardHeaderDirective {}

@Directive({
  selector: '[uwCardFooter]',
  standalone: true,
})
export class UwCardFooterDirective {}
