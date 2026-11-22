import { ChangeDetectionStrategy, Component, model, input, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UwIconComponent } from '../icon/uw-icon.component';
import type { UwTab } from './uw-tabs.types';

@Component({
  selector: 'uw-tabs',
  standalone: true,
  imports: [CommonModule, UwIconComponent],
  templateUrl: './uw-tabs.component.html',
  styleUrl: './uw-tabs.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UwTabsComponent {
  readonly tabs = input.required<UwTab[]>();
  readonly activeTab = model<string>('');

  selectTab(value: string): void {
    this.activeTab.set(value);
  }
}
