import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { UwTagComponent } from './uw-tag.component';

function createHost(template: string, data?: Record<string, unknown>): ComponentFixture<unknown> {
  @Component({
    template,
    imports: [UwTagComponent],
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

function getTagElement(fixture: ComponentFixture<unknown>): HTMLElement | null {
  return fixture.nativeElement.querySelector('.uw-tag');
}

function getRemoveButton(fixture: ComponentFixture<unknown>): HTMLButtonElement | null {
  return fixture.nativeElement.querySelector('.uw-tag__remove');
}

describe('UwTagComponent', () => {
  describe('renderização do label', () => {
    it('deve exibir o label fornecido', () => {
      const fixture = createHost(`<uw-tag label="Angular" [value]="'angular'"></uw-tag>`);

      const tag = getTagElement(fixture);
      expect(tag?.textContent?.trim()).toContain('Angular');
    });

    it('deve renderizar com label vazio', () => {
      const fixture = createHost(`<uw-tag label="" [value]="''"></uw-tag>`);

      expect(getTagElement(fixture)).toBeTruthy();
    });
  });

  describe('botão remover', () => {
    it('deve exibir botão X por padrão', () => {
      const fixture = createHost(`<uw-tag label="Angular" [value]="'angular'"></uw-tag>`);

      expect(getRemoveButton(fixture)).toBeTruthy();
    });

    it('deve ocultar botão X quando removable=false', () => {
      const fixture = createHost(`<uw-tag label="Angular" [value]="'angular'" [removable]="false"></uw-tag>`);

      expect(getRemoveButton(fixture)).toBeNull();
    });

    it('deve exibir botão X quando removable=true', () => {
      const fixture = createHost(`<uw-tag label="Angular" [value]="'angular'" [removable]="true"></uw-tag>`);

      expect(getRemoveButton(fixture)).toBeTruthy();
    });
  });

  describe('evento removed', () => {
    it('deve emitir o valor ao clicar no X', () => {
      let emitted: string | undefined;
      const fixture = createHost(`<uw-tag label="TS" [value]="'typescript'" (removed)="onRemoved($event)"></uw-tag>`);
      fixture.componentInstance.onRemoved = (v: string) => { emitted = v; };

      getRemoveButton(fixture)?.click();
      fixture.detectChanges();

      expect(emitted).toBe('typescript');
    });

    it('deve emitir valor numérico', () => {
      let emitted: number | undefined;
      const fixture = createHost(`<uw-tag label="Um" [value]="1" (removed)="onRemoved($event)"></uw-tag>`);
      fixture.componentInstance.onRemoved = (v: number) => { emitted = v; };

      getRemoveButton(fixture)?.click();
      fixture.detectChanges();

      expect(emitted).toBe(1);
    });
  });

  describe('variantes de cor', () => {
    it('deve ter classe primary por padrão', () => {
      const fixture = createHost(`<uw-tag label="Tag" [value]="'tag'"></uw-tag>`);

      expect(getTagElement(fixture)?.classList.contains('uw-tag--primary')).toBe(true);
    });

    it('deve aplicar classe success', () => {
      const fixture = createHost(`<uw-tag label="OK" [value]="'ok'" variant="success"></uw-tag>`);

      expect(getTagElement(fixture)?.classList.contains('uw-tag--success')).toBe(true);
    });

    it('deve aplicar classe danger', () => {
      const fixture = createHost(`<uw-tag label="Erro" [value]="'erro'" variant="danger"></uw-tag>`);

      expect(getTagElement(fixture)?.classList.contains('uw-tag--danger')).toBe(true);
    });

    it('deve aplicar classe warning', () => {
      const fixture = createHost(`<uw-tag label="Atenção" [value]="'atencao'" variant="warning"></uw-tag>`);

      expect(getTagElement(fixture)?.classList.contains('uw-tag--warning')).toBe(true);
    });

    it('deve aplicar classe neutral', () => {
      const fixture = createHost(`<uw-tag label="Neutro" [value]="'neutro'" variant="neutral"></uw-tag>`);

      expect(getTagElement(fixture)?.classList.contains('uw-tag--neutral')).toBe(true);
    });

    it('deve aplicar classe soft', () => {
      const fixture = createHost(`<uw-tag label="Soft" [value]="'soft'" variant="soft"></uw-tag>`);

      expect(getTagElement(fixture)?.classList.contains('uw-tag--soft')).toBe(true);
    });
  });

  describe('tamanhos', () => {
    it('deve aplicar classe sm', () => {
      const fixture = createHost(`<uw-tag label="P" [value]="'p'" size="sm"></uw-tag>`);

      expect(getTagElement(fixture)?.classList.contains('uw-tag--sm')).toBe(true);
    });

    it('deve aplicar classe md por padrão', () => {
      const fixture = createHost(`<uw-tag label="M" [value]="'m'"></uw-tag>`);

      expect(getTagElement(fixture)?.classList.contains('uw-tag--md')).toBe(true);
    });

    it('deve aplicar classe lg', () => {
      const fixture = createHost(`<uw-tag label="G" [value]="'g'" size="lg"></uw-tag>`);

      expect(getTagElement(fixture)?.classList.contains('uw-tag--lg')).toBe(true);
    });
  });
});
