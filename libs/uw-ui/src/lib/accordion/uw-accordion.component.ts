import { ChangeDetectionStrategy, Component, input, ViewEncapsulation, type WritableSignal } from '@angular/core';

export type UwAccordionMode = 'single' | 'multiple';

@Component({
  selector: 'uw-accordion',
  standalone: true,
  templateUrl: './uw-accordion.component.html',
  styleUrl: './uw-accordion.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UwAccordionComponent {
  readonly mode = input<'single' | 'multiple'>('single');
  private readonly itemSignals: WritableSignal<boolean>[] = [];

  addItem(sig: WritableSignal<boolean>) {
    this.itemSignals.push(sig);
  }

  onItemToggle(sig: WritableSignal<boolean>, value: boolean) {
    if (this.mode() === 'single' && value) {
      this.itemSignals.forEach((s) => {
        if (s !== sig) s.set(false);
      });
    }
  }
}
