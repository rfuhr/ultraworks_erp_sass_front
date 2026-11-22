import { ChangeDetectionStrategy, Component, EventEmitter, input, Output, ViewEncapsulation } from '@angular/core';

export type EmptyStateSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'uw-empty-state',
  standalone: true,
  templateUrl: './uw-empty-state.component.html',
  styleUrl: './uw-empty-state.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class UwEmptyStateComponent {
  readonly icon = input('inbox');
  readonly title = input.required<string>();
  readonly description = input<string>();
  readonly actionLabel = input<string>();
  readonly actionIcon = input<string>();
  readonly size = input<EmptyStateSize>('md');

  @Output() readonly action = new EventEmitter<void>();
}
