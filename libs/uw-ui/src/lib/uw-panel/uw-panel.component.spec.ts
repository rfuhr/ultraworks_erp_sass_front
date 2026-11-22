import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { UwPanelComponent } from './uw-panel.component';
import { UwPanelFooterDirective } from './uw-panel-footer.directive';

function createHost(
  template: string,
): { fixture: ComponentFixture<HostComponent>; host: HostComponent } {
  @Component({
    template,
    imports: [UwPanelComponent, UwPanelFooterDirective],
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

describe('UwPanelComponent', () => {
  function getPanel(fixture: ComponentFixture<unknown>): HTMLElement | null {
    return fixture.nativeElement.querySelector('.uw-panel');
  }

  function getHeader(fixture: ComponentFixture<unknown>): HTMLElement | null {
    return fixture.nativeElement.querySelector('.uw-panel__header');
  }

  function getTitle(fixture: ComponentFixture<unknown>): HTMLElement | null {
    return fixture.nativeElement.querySelector('.uw-panel__title');
  }

  function getIcon(fixture: ComponentFixture<unknown>): HTMLElement | null {
    return fixture.nativeElement.querySelector('.uw-panel__icon');
  }

  function getBody(fixture: ComponentFixture<unknown>): HTMLElement | null {
    return fixture.nativeElement.querySelector('.uw-panel__body');
  }

  function getFooter(fixture: ComponentFixture<unknown>): HTMLElement | null {
    return fixture.nativeElement.querySelector('.uw-panel__footer');
  }

  describe('renderização com header, body e footer', () => {
    it('deve renderizar header com título, body e footer', () => {
      const { fixture } = createHost(`
        <uw-panel title="Informações" icon="info">
          <div uw-panel-body>Conteúdo</div>
          <div uwPanelFooter>Ações</div>
        </uw-panel>
      `);

      expect(getPanel(fixture)).toBeTruthy();
      expect(getHeader(fixture)).toBeTruthy();
      expect(getTitle(fixture)?.textContent?.trim()).toBe('Informações');
      expect(getIcon(fixture)).toBeTruthy();
      expect(getBody(fixture)?.textContent?.trim()).toBe('Conteúdo');
      expect(getFooter(fixture)?.textContent?.trim()).toBe('Ações');
    });
  });

  describe('panel sem header', () => {
    it('deve omitir o header quando não há title, icon nem ng-content header', () => {
      const { fixture } = createHost(`
        <uw-panel>
          <div uw-panel-body>Conteúdo</div>
        </uw-panel>
      `);

      expect(getHeader(fixture)).toBeNull();
      expect(getBody(fixture)?.textContent?.trim()).toBe('Conteúdo');
    });
  });

  describe('variant', () => {
    it('deve ter fundo branco na variant default', () => {
      const { fixture } = createHost(`
        <uw-panel>
          <div uw-panel-body>Conteúdo</div>
        </uw-panel>
      `);

      const panel = getPanel(fixture);
      expect(panel?.classList.contains('uw-panel--default')).toBe(true);
    });

    it('deve aplicar variant secondary', () => {
      const { fixture } = createHost(`
        <uw-panel variant="secondary">
          <div uw-panel-body>Conteúdo</div>
        </uw-panel>
      `);

      const panel = getPanel(fixture);
      expect(panel?.classList.contains('uw-panel--secondary')).toBe(true);
    });

    it('deve aplicar variant primary', () => {
      const { fixture } = createHost(`
        <uw-panel variant="primary">
          <div uw-panel-body>Conteúdo</div>
        </uw-panel>
      `);

      const panel = getPanel(fixture);
      expect(panel?.classList.contains('uw-panel--primary')).toBe(true);
    });
  });

  describe('cor personalizada', () => {
    it('deve sobrescrever a cor de fundo via customColor', () => {
      const { fixture } = createHost(`
        <uw-panel customColor="#ffebee">
          <div uw-panel-body>Conteúdo</div>
        </uw-panel>
      `);

      const panel = getPanel(fixture);
      expect(panel?.style.backgroundColor).toBe('rgb(255, 235, 238)');
    });
  });

  describe('título', () => {
    it('deve exibir o título via input', () => {
      const { fixture } = createHost(`
        <uw-panel title="Endereço do Evento">
          <div uw-panel-body>Conteúdo</div>
        </uw-panel>
      `);

      expect(getTitle(fixture)?.textContent?.trim()).toBe('Endereço do Evento');
    });
  });

  describe('ícone', () => {
    it('deve exibir ícone antes do título', () => {
      const { fixture } = createHost(`
        <uw-panel title="Endereço" icon="location_on">
          <div uw-panel-body>Conteúdo</div>
        </uw-panel>
      `);

      expect(getIcon(fixture)?.textContent?.trim()).toBe('location_on');
    });
  });
});
