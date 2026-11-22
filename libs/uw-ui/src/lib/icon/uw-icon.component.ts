import { booleanAttribute, ChangeDetectionStrategy, Component, computed, input, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

export type UwIconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

const SIZE_CLASS: Record<UwIconSize, string> = {
  xs: 'text-xs',
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl'
};

const SIZE_VALUE: Record<UwIconSize, string> = {
  xs: '0.75rem',
  sm: '0.875rem',
  md: '1rem',
  lg: '1.125rem',
  xl: '1.5rem'
};

@Component({
  selector: 'uw-icon',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './uw-icon.component.html',
  styleUrl: './uw-icon.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UwIconComponent {
  readonly name = input.required<string>();
  readonly size = input<UwIconSize>('md');
  readonly filled = input(false, { transform: booleanAttribute });

  readonly spanClass = computed(() => {
    const base = 'material-symbols-outlined inline-flex shrink-0 items-center justify-center';
    const sz = SIZE_CLASS[this.size()];
    const fill = this.filled() ? ' uw-icon--filled' : '';
    return `${base} ${sz}${fill}`;
  });

  readonly fontSize = computed(() => SIZE_VALUE[this.size()]);
}
