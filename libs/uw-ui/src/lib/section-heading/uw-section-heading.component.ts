import { ChangeDetectionStrategy, Component, computed, input, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import type { SectionHeadingVariant } from './uw-section-heading.types';

@Component({
  selector: 'uw-section-heading',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './uw-section-heading.component.html',
  styleUrl: './uw-section-heading.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UwSectionHeadingComponent {
  readonly text = input.required<string>();
  readonly icon = input<string>();
  readonly variant = input<SectionHeadingVariant>('default');

  readonly headingClass = computed(() => {
    const base = 'uw-section-heading';
    return `${base} ${base}--${this.variant()}`;
  });
}
