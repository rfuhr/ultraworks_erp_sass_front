import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { UwTimelineComponent } from './uw-timeline.component';
import { UwTimelineItemComponent } from './uw-timeline-item.component';

function createHost(template: string): ComponentFixture<unknown> {
  @Component({
    template,
    imports: [UwTimelineComponent, UwTimelineItemComponent],
    standalone: true,
  })
  class HostComponent {}

  TestBed.resetTestingModule();
  TestBed.configureTestingModule({ imports: [HostComponent] });

  const fixture = TestBed.createComponent(HostComponent);
  fixture.detectChanges();
  return fixture;
}

describe('UwTimelineComponent', () => {
  it('deve renderizar timeline', () => {
    const fixture = createHost(`<uw-timeline>
      <uw-timeline-item title="Evento 1"></uw-timeline-item>
    </uw-timeline>`);
    const timeline = fixture.nativeElement.querySelector('.timeline');
    expect(timeline).toBeTruthy();
  });

  it('deve ter role="list"', () => {
    const fixture = createHost(`<uw-timeline>
      <uw-timeline-item title="Evento 1"></uw-timeline-item>
    </uw-timeline>`);
    const timeline = fixture.nativeElement.querySelector('.timeline');
    expect(timeline?.getAttribute('role')).toBe('list');
  });

  it('deve aplicar classe timeline--centered quando mode="alternate"', () => {
    const fixture = createHost(`<uw-timeline mode="alternate">
      <uw-timeline-item title="Evento 1"></uw-timeline-item>
      <uw-timeline-item title="Evento 2"></uw-timeline-item>
    </uw-timeline>`);
    const timeline = fixture.nativeElement.querySelector('.timeline');
    expect(timeline?.classList.contains('timeline--centered')).toBe(true);
  });
});
