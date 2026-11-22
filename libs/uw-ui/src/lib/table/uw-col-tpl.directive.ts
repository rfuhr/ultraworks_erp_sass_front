import { Directive, inject, input, TemplateRef } from '@angular/core';

@Directive({
  selector: '[uwColTpl]',
  standalone: true,
})
export class UwColTplDirective {
  readonly columnKey = input.required<string>({ alias: 'uwColTpl' });
  readonly templateRef = inject(TemplateRef<{ $implicit: any }>);
}
