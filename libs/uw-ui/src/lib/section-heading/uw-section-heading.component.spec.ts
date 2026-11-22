import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { UwSectionHeadingComponent } from './uw-section-heading.component';

function createHost(
  template: string,
): { fixture: ComponentFixture<HostComponent>; host: HostComponent } {
  @Component({
    template,
    imports: [UwSectionHeadingComponent],
    standalone: true,
  })
  class HostComponent {}

  TestBed.resetTestingModule();
  TestBed.configureTestingModule({ imports: [HostComponent] });

  const fixture = TestBed.createComponent(HostComponent);
  const host = fixture.componentInstance;
  fixture.detectChanges();
  return { fixture, host };
}

describe('UwSectionHeadingComponent', () => {
  function getRoot(fixture: ComponentFixture<unknown>): HTMLElement | null {
    return fixture.nativeElement.querySelector('.uw-section-heading');
  }

  function getIcon(fixture: ComponentFixture<unknown>): HTMLElement | null {
    return fixture.nativeElement.querySelector('.uw-section-heading__icon');
  }

  function getText(fixture: ComponentFixture<unknown>): HTMLElement | null {
    return fixture.nativeElement.querySelector('.uw-section-heading__text');
  }

  describe('texto e ícone', () => {
    it('deve renderizar texto e ícone', () => {
      const { fixture } = createHost(`
        <uw-section-heading text="Data & Local" icon="calendar_month" />
      `);

      expect(getText(fixture)?.textContent?.trim()).toBe('Data & Local');
      expect(getIcon(fixture)?.textContent?.trim()).toBe('calendar_month');
    });

    it('deve renderizar apenas o texto quando não tem ícone', () => {
      const { fixture } = createHost(`
        <uw-section-heading text="Data & Local" />
      `);

      expect(getText(fixture)?.textContent?.trim()).toBe('Data & Local');
      expect(getIcon(fixture)).toBeNull();
    });
  });

  describe('variants de cor', () => {
    it('deve aplicar variant default', () => {
      const { fixture } = createHost(`
        <uw-section-heading text="Título" variant="default" />
      `);

      const root = getRoot(fixture);
      expect(root?.classList.contains('uw-section-heading--default')).toBe(true);
    });

    it('deve aplicar variant primary', () => {
      const { fixture } = createHost(`
        <uw-section-heading text="Título" variant="primary" />
      `);

      const root = getRoot(fixture);
      expect(root?.classList.contains('uw-section-heading--primary')).toBe(true);
    });

    it('deve aplicar variant secondary', () => {
      const { fixture } = createHost(`
        <uw-section-heading text="Título" variant="secondary" />
      `);

      const root = getRoot(fixture);
      expect(root?.classList.contains('uw-section-heading--secondary')).toBe(true);
    });

    it('deve aplicar variant success', () => {
      const { fixture } = createHost(`
        <uw-section-heading text="Título" variant="success" />
      `);

      const root = getRoot(fixture);
      expect(root?.classList.contains('uw-section-heading--success')).toBe(true);
    });

    it('deve aplicar variant danger', () => {
      const { fixture } = createHost(`
        <uw-section-heading text="Título" variant="danger" />
      `);

      const root = getRoot(fixture);
      expect(root?.classList.contains('uw-section-heading--danger')).toBe(true);
    });
  });
});
