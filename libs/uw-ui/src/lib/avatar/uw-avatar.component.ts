import { ChangeDetectionStrategy, Component, computed, input, ViewEncapsulation } from '@angular/core';

export type UwAvatarSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'uw-avatar',
  standalone: true,
  imports: [],
  templateUrl: './uw-avatar.component.html',
  styleUrl: './uw-avatar.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UwAvatarComponent {
  readonly src = input<string>();
  readonly initials = input<string>();
  readonly size = input<UwAvatarSize>('md');
  readonly bgColor = input<string>();

  readonly sizeClass = computed(() => `uw-avatar--${this.size()}`);
  readonly hasImage = computed(() => !!this.src());

  readonly avatarBg = computed(() => {
    if (this.bgColor()) return this.bgColor();
    return 'var(--color-primary)';
  });
}
