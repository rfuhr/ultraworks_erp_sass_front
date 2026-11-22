import { ChangeDetectionStrategy, Component, input, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

export type TimelineItemSide = 'left' | 'right' | 'auto';

@Component({
  selector: 'uw-timeline-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './uw-timeline-item.component.html',
  styleUrl: './uw-timeline-item.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UwTimelineItemComponent {
  readonly title = input<string>();
  readonly description = input<string>();
  readonly timestamp = input<string>();
  readonly icon = input<string>();
  readonly color = input('#0041c8');
  readonly side = input<TimelineItemSide>('auto');
}
