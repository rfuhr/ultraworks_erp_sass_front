import { ChangeDetectionStrategy, Component, input, signal, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'uw-image',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './uw-image.component.html',
  styleUrl: './uw-image.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UwImageComponent {
  readonly src = input<string>();
  readonly alt = input.required<string>();
  readonly fallbackUrl = input<string>();
  readonly lazy = input(true);
  readonly objectFit = input<'cover' | 'contain' | 'fill' | 'none' | 'scale-down'>('cover');
  readonly width = input<string>();
  readonly height = input<string>();
  readonly borderRadius = input<string>();

  readonly state = signal<'loading' | 'loaded' | 'error'>('loading');

  onLoad(): void {
    this.state.set('loaded');
  }

  onError(): void {
    this.state.set('error');
  }
}
