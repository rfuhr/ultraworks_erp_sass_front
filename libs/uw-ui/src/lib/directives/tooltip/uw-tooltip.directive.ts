import {
  Directive,
  ElementRef,
  inject,
  input,
  OnDestroy,
} from '@angular/core';
import { ConnectedPosition, Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { UwTooltipComponent } from './uw-tooltip.component';

@Directive({
  selector: '[uwTooltip]',
  host: {
    '(mouseenter)': 'show()',
    '(mouseleave)': 'hide()',
  },
})
export class UWTooltip implements OnDestroy {
  readonly uwTooltip = input('');
  readonly uwTooltipPosition = input<'above' | 'below' | 'left' | 'right'>(
    'above',
  );

  private overlay = inject(Overlay);
  private host = inject(ElementRef<HTMLElement>);
  private overlayRef: OverlayRef | null = null;

  ngOnDestroy(): void {
    this.dispose();
  }

  show(): void {
    if (this.overlayRef) return;

    const text = this.uwTooltip();
    if (!text) return;

    this.overlayRef = this.overlay.create({
      positionStrategy: this.overlay
        .position()
        .flexibleConnectedTo(this.host)
        .withPositions(this.getPositions()),
      scrollStrategy: this.overlay.scrollStrategies.close(),
      disposeOnNavigation: true,
    });

    const portal = new ComponentPortal(UwTooltipComponent);
    const ref = this.overlayRef.attach(portal);
    ref.instance.text = text;
  }

  hide(): void {
    this.overlayRef?.detach();
    this.overlayRef?.dispose();
    this.overlayRef = null;
  }

  private dispose(): void {
    this.overlayRef?.dispose();
    this.overlayRef = null;
  }

  private getPositions(): ConnectedPosition[] {
    const position = this.uwTooltipPosition();
    const offset = 8;
    const base: ConnectedPosition[] = [];

    switch (position) {
      case 'above':
        base.push({
          originX: 'center',
          originY: 'top',
          overlayX: 'center',
          overlayY: 'bottom',
          offsetY: -offset,
        });
        base.push({
          originX: 'center',
          originY: 'bottom',
          overlayX: 'center',
          overlayY: 'top',
          offsetY: offset,
        });
        break;
      case 'below':
        base.push({
          originX: 'center',
          originY: 'bottom',
          overlayX: 'center',
          overlayY: 'top',
          offsetY: offset,
        });
        base.push({
          originX: 'center',
          originY: 'top',
          overlayX: 'center',
          overlayY: 'bottom',
          offsetY: -offset,
        });
        break;
      case 'left':
        base.push({
          originX: 'start',
          originY: 'center',
          overlayX: 'end',
          overlayY: 'center',
          offsetX: -offset,
        });
        base.push({
          originX: 'end',
          originY: 'center',
          overlayX: 'start',
          overlayY: 'center',
          offsetX: offset,
        });
        break;
      case 'right':
        base.push({
          originX: 'end',
          originY: 'center',
          overlayX: 'start',
          overlayY: 'center',
          offsetX: offset,
        });
        base.push({
          originX: 'start',
          originY: 'center',
          overlayX: 'end',
          overlayY: 'center',
          offsetX: -offset,
        });
        break;
    }

    return base;
  }
}
