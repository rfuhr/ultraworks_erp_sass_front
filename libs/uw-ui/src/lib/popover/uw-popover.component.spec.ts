import { TestBed } from '@angular/core/testing';
import { Overlay } from '@angular/cdk/overlay';
import { of } from 'rxjs';
import { UwPopoverComponent } from './uw-popover.component';

describe('UwPopoverComponent', () => {
  it('deve emitir opened após anexar o overlay', () => {
    const overlayRef = {
      backdropClick: jest.fn().mockReturnValue(of()),
      keydownEvents: jest.fn().mockReturnValue(of()),
      attach: jest.fn(),
      detach: jest.fn(),
      dispose: jest.fn(),
    };
    const scrollStrategy = {};
    const overlay = {
      create: jest.fn().mockReturnValue(overlayRef),
      position: jest.fn().mockReturnValue({
        flexibleConnectedTo: jest.fn().mockReturnValue({
          withPositions: jest.fn().mockReturnValue({}),
        }),
      }),
      scrollStrategies: {
        close: jest.fn().mockReturnValue({}),
        reposition: jest.fn().mockReturnValue(scrollStrategy),
      },
    };

    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [{ provide: Overlay, useValue: overlay }],
    });
    const fixture = TestBed.createComponent(UwPopoverComponent);
    fixture.detectChanges();

    const opened = jest.fn();
    fixture.componentInstance.opened.subscribe(opened);

    fixture.componentInstance.open(document.createElement('button'));

    expect(overlay.create).toHaveBeenCalled();
    expect(overlay.create).toHaveBeenCalledWith(
      expect.objectContaining({ scrollStrategy }),
    );
    expect(overlayRef.attach).toHaveBeenCalled();
    expect(opened).toHaveBeenCalledTimes(1);
  });
});
