import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { UwDrawerComponent } from './uw-drawer.component';

function createHost(template: string): ComponentFixture<unknown> {
  @Component({
    template,
    imports: [UwDrawerComponent],
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
  return fixture.nativeElement.querySelector('.drawer-overlay');
}

function getPanel(fixture: ComponentFixture<unknown>): HTMLElement | null {
  return fixture.nativeElement.querySelector('.drawer-panel');
}

describe('UwDrawerComponent', () => {
  describe('abertura e fechamento', () => {
    it('não deve renderizar quando fechado', () => {
      const fixture = createHost(`<uw-drawer [open]="false">Conteúdo</uw-drawer>`);
      expect(getOverlay(fixture)).toBeNull();
      expect(getPanel(fixture)).toBeNull();
    });

    it('deve renderizar quando aberto', () => {
      const fixture = createHost(`<uw-drawer [open]="true">Conteúdo</uw-drawer>`);
      expect(getOverlay(fixture)).toBeTruthy();
      expect(getPanel(fixture)).toBeTruthy();
    });

    it('deve exibir título', () => {
      const fixture = createHost(`<uw-drawer [open]="true" title="Meu Drawer">Conteúdo</uw-drawer>`);
      const titleEl = fixture.nativeElement.querySelector('.drawer-title');
      expect(titleEl?.textContent).toContain('Meu Drawer');
    });
  });

  describe('cabeçalho customizado', () => {
    it('deve renderizar o template de header no lugar do título padrão', () => {
      const fixture = createHost(`
        <uw-drawer [open]="true" title="TRB-0091">
          <ng-template #header>
            <div class="header-customizado">
              <span class="codigo">TRB-0091</span>
              <h3 class="titulo">Meu trabalho</h3>
            </div>
          </ng-template>
          Conteúdo
        </uw-drawer>
      `);

      const header = fixture.nativeElement.querySelector('.drawer-header') as HTMLElement | null;
      expect(header?.querySelector('.header-customizado')).toBeTruthy();
      expect(header?.textContent).toContain('Meu trabalho');
      expect(header?.querySelector('.drawer-title')).toBeNull();
      expect(getPanel(fixture)?.getAttribute('aria-label')).toBe('TRB-0091');
      expect(header?.querySelector('.drawer-close')).toBeTruthy();
    });

    it('deve manter o fechamento pelo botão ao usar cabeçalho customizado', () => {
      let emitted = false;
      const fixture = createHost(`
        <uw-drawer [open]="true" (close)="onClose()">
          <ng-template #header>
            <div class="header-customizado">Meu trabalho</div>
          </ng-template>
          Conteúdo
        </uw-drawer>
      `);
      fixture.componentInstance.onClose = () => { emitted = true; };

      (fixture.nativeElement.querySelector('.drawer-close') as HTMLElement)?.click();
      fixture.detectChanges();

      expect(emitted).toBe(true);
    });

    it('deve manter o fechamento por ESC ao usar cabeçalho customizado', () => {
      let emitted = false;
      const fixture = createHost(`
        <uw-drawer [open]="true" (close)="onClose()">
          <ng-template #header>
            <div class="header-customizado">Meu trabalho</div>
          </ng-template>
          Conteúdo
        </uw-drawer>
      `);
      fixture.componentInstance.onClose = () => { emitted = true; };

      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
      fixture.detectChanges();

      expect(emitted).toBe(true);
    });
  });

  describe('fechamento', () => {
    it('deve emitir close ao clicar no X', () => {
      let emitted = false;
      const fixture = createHost(`<uw-drawer [open]="true" (close)="onClose()">Conteúdo</uw-drawer>`);
      fixture.componentInstance.onClose = () => { emitted = true; };
      const closeBtn = fixture.nativeElement.querySelector('.drawer-close');
      closeBtn?.click();
      fixture.detectChanges();
      expect(emitted).toBe(true);
    });

    it('deve emitir close ao clicar no overlay', () => {
      let emitted = false;
      const fixture = createHost(`<uw-drawer [open]="true" (close)="onClose()">Conteúdo</uw-drawer>`);
      fixture.componentInstance.onClose = () => { emitted = true; };
      getOverlay(fixture)?.click();
      fixture.detectChanges();
      expect(emitted).toBe(true);
    });
  });

  describe('posições', () => {
    it('deve ter classe drawer-right por padrão', () => {
      const fixture = createHost(`<uw-drawer [open]="true">Conteúdo</uw-drawer>`);
      expect(getPanel(fixture)?.classList.contains('drawer-right')).toBe(true);
    });

    it('deve aplicar classe drawer-left', () => {
      const fixture = createHost(`<uw-drawer [open]="true" position="left">Conteúdo</uw-drawer>`);
      expect(getPanel(fixture)?.classList.contains('drawer-left')).toBe(true);
    });
  });

  describe('tamanhos', () => {
    it('deve ter classe drawer-size-md por padrão', () => {
      const fixture = createHost(`<uw-drawer [open]="true">Conteúdo</uw-drawer>`);
      expect(getPanel(fixture)?.classList.contains('drawer-size-md')).toBe(true);
    });

    it('deve aplicar classe drawer-size-lg', () => {
      const fixture = createHost(`<uw-drawer [open]="true" size="lg">Conteúdo</uw-drawer>`);
      expect(getPanel(fixture)?.classList.contains('drawer-size-lg')).toBe(true);
    });

    it('deve aplicar classe drawer-size-xl', () => {
      const fixture = createHost(`<uw-drawer [open]="true" size="xl">Conteúdo</uw-drawer>`);
      expect(getPanel(fixture)?.classList.contains('drawer-size-xl')).toBe(true);
    });
  });

  describe('acessibilidade', () => {
    it('deve ter role="dialog" e aria-modal="true"', () => {
      const fixture = createHost(`<uw-drawer [open]="true" title="Teste">Conteúdo</uw-drawer>`);
      const panel = getPanel(fixture);
      expect(panel?.getAttribute('role')).toBe('dialog');
      expect(panel?.getAttribute('aria-modal')).toBe('true');
    });
  });
});
