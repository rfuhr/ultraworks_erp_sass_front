import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { UwAlertComponent } from './uw-alert.component';

function createHost(template: string): ComponentFixture<unknown> {
  @Component({
    template,
    imports: [UwAlertComponent],
    standalone: true,
  })
  class HostComponent {}

  TestBed.resetTestingModule();
  TestBed.configureTestingModule({ imports: [HostComponent] });

  const fixture = TestBed.createComponent(HostComponent);
  fixture.detectChanges();
  return fixture;
}

function getAlert(fixture: ComponentFixture<unknown>): HTMLElement | null {
  return fixture.nativeElement.querySelector('.uw-alert');
}

function getCloseBtn(fixture: ComponentFixture<unknown>): HTMLButtonElement | null {
  return fixture.nativeElement.querySelector('.uw-alert__close');
}

describe('UwAlertComponent', () => {
  describe('renderização com ng-content', () => {
    it('deve exibir conteúdo de texto', () => {
      const fixture = createHost(`<uw-alert>Mensagem de teste</uw-alert>`);

      expect(getAlert(fixture)?.textContent?.trim()).toContain('Mensagem de teste');
    });

    it('deve exibir conteúdo com rich HTML', () => {
      const fixture = createHost(`<uw-alert>Clique <a href="#">aqui</a></uw-alert>`);
      const link = fixture.nativeElement.querySelector('a');

      expect(link).toBeTruthy();
      expect(link?.textContent).toBe('aqui');
    });
  });

  describe('variantes de cor', () => {
    it('deve ter classe info por padrão', () => {
      const fixture = createHost(`<uw-alert>Info</uw-alert>`);

      expect(getAlert(fixture)?.classList.contains('uw-alert--info')).toBe(true);
    });

    it('deve aplicar classe success', () => {
      const fixture = createHost(`<uw-alert variant="success">OK</uw-alert>`);

      expect(getAlert(fixture)?.classList.contains('uw-alert--success')).toBe(true);
    });

    it('deve aplicar classe warning', () => {
      const fixture = createHost(`<uw-alert variant="warning">Aviso</uw-alert>`);

      expect(getAlert(fixture)?.classList.contains('uw-alert--warning')).toBe(true);
    });

    it('deve aplicar classe danger', () => {
      const fixture = createHost(`<uw-alert variant="danger">Erro</uw-alert>`);

      expect(getAlert(fixture)?.classList.contains('uw-alert--danger')).toBe(true);
    });
  });

  describe('botão dismissível', () => {
    it('não deve exibir botão X por padrão', () => {
      const fixture = createHost(`<uw-alert>Mensagem</uw-alert>`);

      expect(getCloseBtn(fixture)).toBeNull();
    });

    it('deve exibir botão X quando dismissible=true', () => {
      const fixture = createHost(`<uw-alert [dismissible]="true">Mensagem</uw-alert>`);

      expect(getCloseBtn(fixture)).toBeTruthy();
    });

    it('deve ocultar alerta ao clicar no X', () => {
      const fixture = createHost(`<uw-alert [dismissible]="true">Mensagem</uw-alert>`);

      getCloseBtn(fixture)?.click();
      fixture.detectChanges();

      expect(getAlert(fixture)).toBeNull();
    });
  });

  describe('evento dismissed', () => {
    it('deve emitir dismissed ao clicar no X', () => {
      let emitted = false;
      const fixture = createHost(`<uw-alert [dismissible]="true" (dismissed)="onDismissed()"></uw-alert>`);
      fixture.componentInstance.onDismissed = () => { emitted = true; };

      getCloseBtn(fixture)?.click();
      fixture.detectChanges();

      expect(emitted).toBe(true);
    });
  });
});
