import { ChangeDetectionStrategy, Component, ContentChildren, input, QueryList, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UwTimelineItemComponent } from './uw-timeline-item.component';

@Component({
  selector: 'uw-timeline',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './uw-timeline.component.html',
  styleUrl: './uw-timeline.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UwTimelineComponent {
  readonly mode = input<'linear' | 'alternate'>('linear');

  @ContentChildren(UwTimelineItemComponent) items!: QueryList<UwTimelineItemComponent>;
}
