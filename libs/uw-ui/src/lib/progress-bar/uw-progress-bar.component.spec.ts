import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { UwProgressBarComponent } from './uw-progress-bar.component';

function createHost(template: string, data?: Record<string, unknown>): ComponentFixture<unknown> {
  @Component({
    template,
    imports: [UwProgressBarComponent],
    standalone: true,
  })
  class HostComponent {}

  TestBed.resetTestingModule();
  TestBed.configureTestingModule({ imports: [HostComponent] });

  const fixture = TestBed.createComponent(HostComponent);
  if (data) Object.assign(fixture.componentInstance, data);
  fixture.detectChanges();
  return fixture;
}

function getTrack(fixture: ComponentFixture<unknown>): HTMLElement | null {
  return fixture.nativeElement.querySelector('.uw-progress-bar');
}

function getFill(fixture: ComponentFixture<unknown>): HTMLElement | null {
  return fixture.nativeElement.querySelector('.uw-progress-bar__fill');
}

function getLabel(fixture: ComponentFixture<unknown>): HTMLElement | null {
  return fixture.nativeElement.querySelector('.uw-progress-bar__label');
}

function getTrackWrapper(fixture: ComponentFixture<unknown>): HTMLElement | null {
  return fixture.nativeElement.querySelector('.uw-progress-bar__wrapper');
}

describe('UwProgressBarComponent', () => {
  describe('modo determinate', () => {
    it('deve exibir progresso proporcional ao valor 50', () => {
      const fixture = createHost(`<uw-progress-bar [value]="50"></uw-progress-bar>`);
      const fill = getFill(fixture);
      expect(fill?.style.width).toBe('50%');
    });

    it('deve exibir largura 0% para valor 0', () => {
      const fixture = createHost(`<uw-progress-bar [value]="0"></uw-progress-bar>`);
      const fill = getFill(fixture);
      expect(fill?.style.width).toBe('0%');
    });

    it('deve exibir largura 100% para valor 100', () => {
      const fixture = createHost(`<uw-progress-bar [value]="100"></uw-progress-bar>`);
      const fill = getFill(fixture);
      expect(fill?.style.width).toBe('100%');
    });

    it('deve clampar valor -10 para 0', () => {
      const fixture = createHost(`<uw-progress-bar [value]="-10"></uw-progress-bar>`);
      const fill = getFill(fixture);
      expect(fill?.style.width).toBe('0%');
    });

    it('deve clampar valor 150 para 100', () => {
      const fixture = createHost(`<uw-progress-bar [value]="150"></uw-progress-bar>`);
      const fill = getFill(fixture);
      expect(fill?.style.width).toBe('100%');
    });
  });

  describe('modo indeterminate', () => {
    it('deve ter classe --indeterminate', () => {
      const fixture = createHost(`<uw-progress-bar mode="indeterminate"></uw-progress-bar>`);
      const track = getTrack(fixture);
      expect(track?.classList.contains('uw-progress-bar--indeterminate')).toBe(true);
    });

    it('deve ignorar valor e usar largura 40%', () => {
      const fixture = createHost(`<uw-progress-bar mode="indeterminate" [value]="50"></uw-progress-bar>`);
      const fill = getFill(fixture);
      expect(fill?.style.width).toBe('40%');
    });
  });

  describe('tamanhos', () => {
    it('deve aplicar classe h-1 para size sm', () => {
      const fixture = createHost(`<uw-progress-bar size="sm"></uw-progress-bar>`);
      const track = getTrack(fixture);
      expect(track?.classList.contains('h-1')).toBe(true);
    });

    it('deve aplicar classe h-2 para size md (padrão)', () => {
      const fixture = createHost(`<uw-progress-bar></uw-progress-bar>`);
      const track = getTrack(fixture);
      expect(track?.classList.contains('h-2')).toBe(true);
    });

    it('deve aplicar classe h-3 para size lg', () => {
      const fixture = createHost(`<uw-progress-bar size="lg"></uw-progress-bar>`);
      const track = getTrack(fixture);
      expect(track?.classList.contains('h-3')).toBe(true);
    });
  });

  describe('cores fixas', () => {
    it('deve usar primary (#6750a4) por padrão', () => {
      const fixture = createHost(`<uw-progress-bar [value]="50"></uw-progress-bar>`);
      const fill = getFill(fixture);
      expect(fill?.style.background).toBe('var(--color-primary)');
    });

    it('deve usar success (#34d399)', () => {
      const fixture = createHost(`<uw-progress-bar [value]="50" color="success"></uw-progress-bar>`);
      const fill = getFill(fixture);
      expect(fill?.style.background).toBe('var(--color-emerald-400)');
    });

    it('deve usar warning (#f59e0b)', () => {
      const fixture = createHost(`<uw-progress-bar [value]="50" color="warning"></uw-progress-bar>`);
      const fill = getFill(fixture);
      expect(fill?.style.background).toBe('var(--color-amber-500)');
    });

    it('deve usar error (#ba1a1a)', () => {
      const fixture = createHost(`<uw-progress-bar [value]="50" color="error"></uw-progress-bar>`);
      const fill = getFill(fixture);
      expect(fill?.style.background).toBe('var(--color-error)');
    });
  });

  describe('gradiente progressivo', () => {
    it('deve exibir primeira cor em 0% com 2 cores', () => {
      const fixture = createHost(
        `<uw-progress-bar [value]="0" [colorProgress]="['#ba1a1a', '#34d399']"></uw-progress-bar>`,
      );
      const fill = getFill(fixture);
      expect(fill?.style.background).toBe('rgb(186, 26, 26)');
    });

    it('deve exibir cor intermediária em 50% com 2 cores', () => {
      const fixture = createHost(
        `<uw-progress-bar [value]="50" [colorProgress]="['#ba1a1a', '#34d399']"></uw-progress-bar>`,
      );
      const fill = getFill(fixture);
      expect(fill?.style.background).toBe('rgb(119, 119, 90)');
    });

    it('deve exibir última cor em 100% com 2 cores', () => {
      const fixture = createHost(
        `<uw-progress-bar [value]="100" [colorProgress]="['#ba1a1a', '#34d399']"></uw-progress-bar>`,
      );
      const fill = getFill(fixture);
      expect(fill?.style.background).toBe('rgb(52, 211, 153)');
    });

    it('deve usar fallback para color quando colorProgress vazio', () => {
      const fixture = createHost(
        `<uw-progress-bar [value]="50" color="warning" [colorProgress]="[]"></uw-progress-bar>`,
      );
      const fill = getFill(fixture);
      expect(fill?.style.background).toBe('var(--color-amber-500)');
    });

    it('deve exibir cor do meio em 50% com 3 cores', () => {
      const fixture = createHost(
        `<uw-progress-bar [value]="50" [colorProgress]="['#ba1a1a', '#f59e0b', '#34d399']"></uw-progress-bar>`,
      );
      const fill = getFill(fixture);
      expect(fill?.style.background).toBe('rgb(245, 158, 11)');
    });
  });

  describe('rótulo showLabel', () => {
    it('deve exibir porcentagem quando showLabel true', () => {
      const fixture = createHost(`<uw-progress-bar [value]="75" [showLabel]="true"></uw-progress-bar>`);
      const label = getLabel(fixture);
      expect(label).toBeTruthy();
      expect(label?.textContent?.trim()).toBe('75%');
    });

    it('deve ocultar label quando showLabel false (padrão)', () => {
      const fixture = createHost(`<uw-progress-bar [value]="75"></uw-progress-bar>`);
      expect(getLabel(fixture)).toBeNull();
    });

    it('deve ocultar label em modo indeterminate mesmo com showLabel true', () => {
      const fixture = createHost(
        `<uw-progress-bar mode="indeterminate" [value]="50" [showLabel]="true"></uw-progress-bar>`,
      );
      expect(getLabel(fixture)).toBeNull();
    });
  });

  describe('estilos inline', () => {
    it('deve aplicar width e background como inline styles', () => {
      const fixture = createHost(`<uw-progress-bar [value]="50" color="primary"></uw-progress-bar>`);
      const fill = getFill(fixture);
      expect(fill?.style.width).toBe('50%');
      expect(fill?.style.background).toBe('var(--color-primary)');
    });
  });

  describe('modo padrão', () => {
    it('deve ser determinate quando nenhum mode informado', () => {
      const fixture = createHost(`<uw-progress-bar [value]="50"></uw-progress-bar>`);
      const fill = getFill(fixture);
      expect(fill?.style.width).toBe('50%');
      expect(getTrack(fixture)?.classList.contains('uw-progress-bar--indeterminate')).toBe(false);
    });
  });
});
