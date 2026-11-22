import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { UwModalComponent } from './uw-modal.component';

function createHost(template: string): ComponentFixture<unknown> {
  @Component({
    template,
    imports: [UwModalComponent],
    standalone: true,
  })
  class HostComponent {}

  TestBed.resetTestingModule();
  TestBed.configureTestingModule({ imports: [HostComponent] });

  const fixture = TestBed.createComponent(HostComponent);
  fixture.detectChanges();
  return fixture;
}

function getOverlay(fixture: ComponentFixture<unknown>): HTMLElement | null {
  return fixture.nativeElement.querySelector('.modal-overlay');
}

function getContainer(fixture: ComponentFixture<unknown>): HTMLElement | null {
  return fixture.nativeElement.querySelector('.modal-container');
}

function getCloseBtn(fixture: ComponentFixture<unknown>): HTMLButtonElement | null {
  return fixture.nativeElement.querySelector('.modal-close');
}

describe('UwModalComponent', () => {
  describe('abertura e fechamento', () => {
    it('não deve renderizar quando fechado', () => {
      const fixture = createHost(`<uw-modal [open]="false">Conteúdo</uw-modal>`);
      expect(getOverlay(fixture)).toBeNull();
    });

    it('deve renderizar quando aberto', () => {
      const fixture = createHost(`<uw-modal [open]="true">Conteúdo</uw-modal>`);
      expect(getOverlay(fixture)).toBeTruthy();
    });

    it('deve exibir título', () => {
      const fixture = createHost(`<uw-modal [open]="true" title="Meu Modal">Conteúdo</uw-modal>`);
      expect(getContainer(fixture)?.textContent).toContain('Meu Modal');
    });
  });

  describe('fechamento', () => {
    it('deve emitir close ao clicar no X', () => {
      let emitted = false;
      const fixture = createHost(`<uw-modal [open]="true" (close)="onClose()">Conteúdo</uw-modal>`);
      fixture.componentInstance.onClose = () => { emitted = true; };
      getCloseBtn(fixture)?.click();
      fixture.detectChanges();
      expect(emitted).toBe(true);
    });

    it('deve emitir close ao clicar no overlay quando closeOnOverlay=true', () => {
      let emitted = false;
      const fixture = createHost(
        `<uw-modal [open]="true" [closeOnOverlay]="true" (close)="onClose()">Conteúdo</uw-modal>`
      );
      fixture.componentInstance.onClose = () => { emitted = true; };
      getOverlay(fixture)?.click();
      fixture.detectChanges();
      expect(emitted).toBe(true);
    });
  });

  describe('tamanhos', () => {
    it('deve ter classe modal-md por padrão', () => {
      const fixture = createHost(`<uw-modal [open]="true">Conteúdo</uw-modal>`);
      expect(getContainer(fixture)?.classList.contains('modal-md')).toBe(true);
    });

    it('deve aplicar classe modal-lg', () => {
      const fixture = createHost(`<uw-modal [open]="true" size="lg">Conteúdo</uw-modal>`);
      expect(getContainer(fixture)?.classList.contains('modal-lg')).toBe(true);
    });
  });

  describe('acessibilidade', () => {
    it('deve ter role="dialog" e aria-modal="true"', () => {
      const fixture = createHost(`<uw-modal [open]="true" title="Teste">Conteúdo</uw-modal>`);
      const container = getContainer(fixture);
      expect(container?.getAttribute('role')).toBe('dialog');
      expect(container?.getAttribute('aria-modal')).toBe('true');
    });
  });
});
