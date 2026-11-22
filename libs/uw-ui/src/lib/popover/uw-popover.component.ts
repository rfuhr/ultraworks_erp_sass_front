import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  output,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { Overlay, OverlayRef, ConnectedPosition } from '@angular/cdk/overlay';
import { DomPortal } from '@angular/cdk/portal';

export type PopoverPosition =
  | 'bottom-end'
  | 'bottom-start'
  | 'top-end'
  | 'top-start';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector -- prefixo uw- é o padrão da biblioteca interna
  selector: 'uw-popover',
  standalone: true,
  exportAs: 'uwPopover',
  template: `<div #container><ng-content /></div>`,
  styleUrl: './uw-popover.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UwPopoverComponent {
  position: PopoverPosition = 'bottom-end';

  readonly opened = output<void>();

  @ViewChild('container', { read: ElementRef })
  private container!: ElementRef<HTMLElement>;

  private overlay = inject(Overlay);
  private overlayRef: OverlayRef | null = null;

  open(triggerEl: HTMLElement): void {
    if (this.overlayRef) return;

    this.overlayRef = this.overlay.create({
      positionStrategy: this.overlay
        .position()
        .flexibleConnectedTo(triggerEl)
        .withPositions(this.getPositions()),
      scrollStrategy: this.overlay.scrollStrategies.close(),
      disposeOnNavigation: true,
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop',
      panelClass: 'uw-popover-panel',
    });

    this.overlayRef.backdropClick().subscribe(() => this.close());
    this.overlayRef.keydownEvents().subscribe((e) => {
      if (e.key === 'Escape') this.close();
    });

    const portal = new DomPortal(this.container.nativeElement);
    this.overlayRef.attach(portal);
    this.opened.emit();
  }

  close(): void {
    this.overlayRef?.detach();
    this.overlayRef?.dispose();
    this.overlayRef = null;
  }

  toggle(triggerEl: HTMLElement): void {
    if (this.overlayRef) {
      this.close();
    } else {
      this.open(triggerEl);
    }
  }

  private getPositions(): ConnectedPosition[] {
    const offset = 6;
    const base: ConnectedPosition[] = [];

    switch (this.position) {
      case 'bottom-end':
        base.push({ originX: 'end', originY: 'bottom', overlayX: 'end', overlayY: 'top', offsetY: offset });
        base.push({ originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top', offsetY: offset });
        base.push({ originX: 'end', originY: 'top', overlayX: 'end', overlayY: 'bottom', offsetY: -offset });
        break;
      case 'bottom-start':
        base.push({ originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top', offsetY: offset });
        base.push({ originX: 'end', originY: 'bottom', overlayX: 'end', overlayY: 'top', offsetY: offset });
        base.push({ originX: 'start', originY: 'top', overlayX: 'start', overlayY: 'bottom', offsetY: -offset });
        break;
      case 'top-end':
        base.push({ originX: 'end', originY: 'top', overlayX: 'end', overlayY: 'bottom', offsetY: -offset });
        base.push({ originX: 'start', originY: 'top', overlayX: 'start', overlayY: 'bottom', offsetY: -offset });
        base.push({ originX: 'end', originY: 'bottom', overlayX: 'end', overlayY: 'top', offsetY: offset });
        break;
      case 'top-start':
        base.push({ originX: 'start', originY: 'top', overlayX: 'start', overlayY: 'bottom', offsetY: -offset });
        base.push({ originX: 'end', originY: 'top', overlayX: 'end', overlayY: 'bottom', offsetY: -offset });
        base.push({ originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top', offsetY: offset });
        break;
    }

    return base;
  }
}
