import { Directive, ElementRef, HostListener, inject, input } from '@angular/core';
import { UwPopoverComponent } from '../../popover/uw-popover.component';

@Directive({
  selector: '[uwPopoverTriggerFor]',
})
export class UWPopoverTrigger {
  readonly uwPopoverTriggerFor = input<UwPopoverComponent>();

  private host = inject(ElementRef<HTMLElement>);

  @HostListener('click')
  onClick(): void {
    const popover = this.uwPopoverTriggerFor();
    if (popover) {
      popover.toggle(this.host.nativeElement);
    }
  }
}
