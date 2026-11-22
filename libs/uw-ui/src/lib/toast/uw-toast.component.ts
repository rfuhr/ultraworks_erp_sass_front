import { Component, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkOverlayOrigin, CdkConnectedOverlay, ConnectedPosition } from '@angular/cdk/overlay';
import { ToastService } from './toast.service';
import { ToastType } from './uw-toast.types';

@Component({
  selector: 'uw-toast',
  standalone: true,
  imports: [CommonModule, CdkOverlayOrigin, CdkConnectedOverlay],
  templateUrl: './uw-toast.component.html',
  styleUrl: './uw-toast.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class UwToastComponent {
  readonly icons: Record<ToastType, string> = {
    success: 'check_circle',
    error: 'error',
    warning: 'warning',
    info: 'info',
  };

  readonly overlayPositions: ConnectedPosition[] = [
    { originX: 'end', originY: 'top', overlayX: 'end', overlayY: 'top' },
  ];

  constructor(readonly service: ToastService) {}
}
