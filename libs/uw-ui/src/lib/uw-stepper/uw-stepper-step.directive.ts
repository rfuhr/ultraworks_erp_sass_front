import { Directive, inject, input, TemplateRef } from '@angular/core';

@Directive({
  selector: '[uwStepperStep]',
  standalone: true,
})
export class UwStepperStepDirective {
  readonly uwStepperStep = input.required<string | number>();
  readonly templateRef = inject(TemplateRef<unknown>);
}
