import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { UwTimelineItemComponent } from './uw-timeline-item.component';

function createHost(template: string): ComponentFixture<unknown> {
  @Component({
    template,
    imports: [UwTimelineItemComponent],
    standalone: true,
  })
  class HostComponent {}

  TestBed.resetTestingModule();
  TestBed.configureTestingModule({ imports: [HostComponent] });

  const fixture = TestBed.createComponent(HostComponent);
  fixture.detectChanges();
  return fixture;
}

describe('UwTimelineItemComponent', () => {
  it('deve renderizar título', () => {
    const fixture = createHost(`<uw-timeline-item title="Meu Evento"></uw-timeline-item>`);
    const title = fixture.nativeElement.querySelector('.timeline-title');
    expect(title?.textContent).toContain('Meu Evento');
  });

  it('deve renderizar descrição', () => {
    const fixture = createHost(`<uw-timeline-item title="Evento" description="Descrição aqui"></uw-timeline-item>`);
    const desc = fixture.nativeElement.querySelector('.timeline-description');
    expect(desc?.textContent).toContain('Descrição aqui');
  });

  it('deve renderizar timestamp', () => {
    const fixture = createHost(`<uw-timeline-item title="Evento" timestamp="10/06/2026"></uw-timeline-item>`);
    const ts = fixture.nativeElement.querySelector('.timeline-timestamp');
    expect(ts?.textContent).toContain('10/06/2026');
  });

  it('deve ter role="listitem"', () => {
    const fixture = createHost(`<uw-timeline-item title="Evento"></uw-timeline-item>`);
    const item = fixture.nativeElement.querySelector('.timeline-item');
    expect(item?.getAttribute('role')).toBe('listitem');
  });

  it('deve projetar conteúdo adicional no item', () => {
    const fixture = createHost(`
      <uw-timeline-item title="Evento">
        <button class="acao-projetada">Visualizar</button>
      </uw-timeline-item>
    `);
    const acao = fixture.nativeElement.querySelector('.acao-projetada');
    expect(acao?.textContent).toContain('Visualizar');
  });
});
