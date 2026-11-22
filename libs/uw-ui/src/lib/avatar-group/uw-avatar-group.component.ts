import { ChangeDetectionStrategy, Component, input, ViewEncapsulation } from '@angular/core';
import { UwAvatarComponent, UwAvatarSize } from '../avatar/uw-avatar.component';

export interface AvatarItem {
  src?: string;
  initials?: string;
  alt?: string;
}

const GROUP_COLORS = [
  'var(--color-violet-500)',
  'var(--color-teal-500)',
  'var(--color-emerald-500)',
  'var(--color-amber-500)',
  'var(--color-sky-500)',
  'var(--color-rose-500)',
  'var(--color-indigo-500)',
  'var(--color-cyan-500)',
  'var(--color-orange-500)',
  'var(--color-pink-500)',
];

function hashStr(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

@Component({
  selector: 'uw-avatar-group',
  standalone: true,
  imports: [UwAvatarComponent],
  templateUrl: './uw-avatar-group.component.html',
  styleUrl: './uw-avatar-group.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UwAvatarGroupComponent {
  readonly items = input.required<AvatarItem[]>();
  readonly maxVisible = input<number>(3);
  readonly size = input<UwAvatarSize>('md');
  readonly dynamicColor = input(false);

  protected visibleItems(): AvatarItem[] {
    return this.items().slice(0, this.maxVisible());
  }

  protected remainingCount(): number {
    const remaining = this.items().length - this.maxVisible();
    return remaining > 0 ? remaining : 0;
  }

  protected avatarColor(item: AvatarItem, index: number): string | undefined {
    if (!this.dynamicColor()) return undefined;
    const key = item.initials || String(index);
    return GROUP_COLORS[hashStr(key) % GROUP_COLORS.length];
  }
}
