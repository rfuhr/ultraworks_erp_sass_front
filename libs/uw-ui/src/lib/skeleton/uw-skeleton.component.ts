import { ChangeDetectionStrategy, Component, computed, input, ViewEncapsulation } from '@angular/core';
import { SkeletonVariant } from './uw-skeleton.types';

@Component({
  selector: 'uw-skeleton',
  standalone: true,
  templateUrl: './uw-skeleton.component.html',
  styleUrl: './uw-skeleton.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class UwSkeletonComponent {
  readonly variant = input<SkeletonVariant>('text');
  readonly lines = input(3);
  readonly width = input('100%');
  readonly height = input('16px');
  readonly borderRadius = input('4px');

  readonly linesArray = computed(() => Array.from({ length: this.lines() }, (_, i) => i + 1));
}
