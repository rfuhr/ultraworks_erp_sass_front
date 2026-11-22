import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { UwSelectButtonGroupComponent } from './uw-select-button-group.component';
import type { SelectButtonOption } from './uw-select-button-group.types';

function createHost(
  template: string,
  data?: Record<string, unknown>,
): ComponentFixture<unknown> {
  @Component({
    template,
    imports: [UwSelectButtonGroupComponent, ReactiveFormsModule],
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

function getButtons(fixture: ComponentFixture<unknown>): HTMLButtonElement[] {
  return Array.from(fixture.nativeElement.querySelectorAll('.uw-btn-option'));
}

function getActiveButtons(fixture: ComponentFixture<unknown>): HTMLButtonElement[] {
  return Array.from(fixture.nativeElement.querySelectorAll('.uw-btn-option--active'));
}

function getContainer(fixture: ComponentFixture<unknown>): HTMLElement | null {
  return fixture.nativeElement.querySelector('.uw-select-button-group');
}

describe('UwSelectButtonGroupComponent', () => {
  const options: SelectButtonOption<string>[] = [
    { label: 'Presencial', value: 'presencial' },
    { label: 'Online', value: 'online' },
    { label: 'Híbrido', value: 'hibrido' },
  ];

  describe('renderização', () => {
    it('deve renderizar todas as options como botões', () => {
      const fixture = createHost(
        `<uw-select-button-group [options]="options"></uw-select-button-group>`,
        { options },
      );

      const buttons = getButtons(fixture);
      expect(buttons.length).toBe(3);
      expect(buttons[0].textContent?.trim()).toBe('Presencial');
      expect(buttons[1].textContent?.trim()).toBe('Online');
      expect(buttons[2].textContent?.trim()).toBe('Híbrido');
    });

    it('deve iniciar com nenhum botão ativo quando não há valor inicial', () => {
      const fixture = createHost(
        `<uw-select-button-group [options]="options"></uw-select-button-group>`,
        { options },
      );

      expect(getActiveButtons(fixture).length).toBe(0);
    });
  });

  describe('seleção única (single)', () => {
    it('deve marcar option como ativa ao clicar', () => {
      const fixture = createHost(
        `<uw-select-button-group [options]="options"></uw-select-button-group>`,
        { options },
      );

      getButtons(fixture)[1].click();
      fixture.detectChanges();

      const active = getActiveButtons(fixture);
      expect(active.length).toBe(1);
      expect(active[0].textContent?.trim()).toBe('Online');
    });

    it('deve trocar seleção ao clicar em outra option', () => {
      const fixture = createHost(
        `<uw-select-button-group [options]="options"></uw-select-button-group>`,
        { options },
      );

      getButtons(fixture)[0].click();
      fixture.detectChanges();
      expect(getActiveButtons(fixture)[0].textContent?.trim()).toBe('Presencial');

      getButtons(fixture)[2].click();
      fixture.detectChanges();

      const active = getActiveButtons(fixture);
      expect(active.length).toBe(1);
      expect(active[0].textContent?.trim()).toBe('Híbrido');
    });

    it('deve manter seleção ao clicar na mesma option', () => {
      const fixture = createHost(
        `<uw-select-button-group [options]="options"></uw-select-button-group>`,
        { options },
      );

      getButtons(fixture)[1].click();
      fixture.detectChanges();
      expect(getActiveButtons(fixture).length).toBe(1);

      getButtons(fixture)[1].click();
      fixture.detectChanges();

      expect(getActiveButtons(fixture).length).toBe(1);
    });
  });

  describe('seleção múltipla (multiple)', () => {
    it('deve permitir selecionar múltiplas options', () => {
      const fixture = createHost(
        `<uw-select-button-group [options]="options" [multiple]="multiple"></uw-select-button-group>`,
        { options, multiple: true },
      );

      getButtons(fixture)[0].click();
      getButtons(fixture)[1].click();
      fixture.detectChanges();

      expect(getActiveButtons(fixture).length).toBe(2);
    });

    it('deve desselecionar uma option sem afetar as demais', () => {
      const fixture = createHost(
        `<uw-select-button-group [options]="options" [multiple]="multiple"></uw-select-button-group>`,
        { options, multiple: true },
      );

      getButtons(fixture)[0].click();
      getButtons(fixture)[1].click();
      fixture.detectChanges();
      expect(getActiveButtons(fixture).length).toBe(2);

      getButtons(fixture)[0].click();
      fixture.detectChanges();

      const active = getActiveButtons(fixture);
      expect(active.length).toBe(1);
    });
  });

  describe('ControlValueAccessor', () => {
    it('deve escrever valor via formControl (single)', () => {
      const control = new FormControl('online');
      const fixture = createHost(
        `<uw-select-button-group [options]="options" [formControl]="control"></uw-select-button-group>`,
        { options, control },
      );

      const active = getActiveButtons(fixture);
      expect(active.length).toBe(1);
      expect(active[0].textContent?.trim()).toBe('Online');
    });

    it('deve propagar alteração para o formControl (single)', () => {
      const control = new FormControl<string | null>(null);
      const fixture = createHost(
        `<uw-select-button-group [options]="options" [formControl]="control"></uw-select-button-group>`,
        { options, control },
      );

      getButtons(fixture)[2].click();
      fixture.detectChanges();

      expect(control.value).toBe('hibrido');
    });

    it('deve escrever valor via formControl (multiple)', () => {
      const control = new FormControl(['presencial', 'online']);
      const fixture = createHost(
        `<uw-select-button-group [options]="options" [multiple]="true" [formControl]="control"></uw-select-button-group>`,
        { options, control },
      );

      expect(getActiveButtons(fixture).length).toBe(2);
    });

    it('deve propagar alteração para o formControl (multiple)', () => {
      const control = new FormControl<string[]>([]);
      const fixture = createHost(
        `<uw-select-button-group [options]="options" [multiple]="true" [formControl]="control"></uw-select-button-group>`,
        { options, control },
      );

      getButtons(fixture)[0].click();
      getButtons(fixture)[1].click();
      fixture.detectChanges();

      expect(control.value).toEqual(['presencial', 'online']);
    });

    it('deve marcar touched ao clicar em uma option', () => {
      const control = new FormControl<string | null>(null);
      const fixture = createHost(
        `<uw-select-button-group [options]="options" [formControl]="control"></uw-select-button-group>`,
        { options, control },
      );

      expect(control.touched).toBe(false);

      getButtons(fixture)[0].click();
      fixture.detectChanges();

      expect(control.touched).toBe(true);
    });
  });

  describe('setDisabledState', () => {
    it('deve desabilitar botões via formControl.disable()', () => {
      const control = new FormControl<string | null>(null);
      const fixture = createHost(
        `<uw-select-button-group [options]="options" [formControl]="control"></uw-select-button-group>`,
        { options, control },
      );

      control.disable();
      fixture.detectChanges();

      const buttons = getButtons(fixture);
      buttons.forEach(btn => {
        expect(btn.disabled).toBe(true);
      });
    });

    it('não deve permitir clique quando desabilitado', () => {
      const control = new FormControl<string | null>(null);
      const fixture = createHost(
        `<uw-select-button-group [options]="options" [formControl]="control"></uw-select-button-group>`,
        { options, control },
      );

      control.disable();
      fixture.detectChanges();

      getButtons(fixture)[1].click();
      fixture.detectChanges();

      expect(getActiveButtons(fixture).length).toBe(0);
    });
  });

  describe('variantes visuais', () => {
    it('deve ter classe primary por padrão', () => {
      const fixture = createHost(
        `<uw-select-button-group [options]="options"></uw-select-button-group>`,
        { options },
      );

      expect(getContainer(fixture)?.classList.contains('uw-select-button-group--primary')).toBe(true);
    });

    it('deve aplicar classe secondary', () => {
      const fixture = createHost(
        `<uw-select-button-group [options]="options" variant="secondary"></uw-select-button-group>`,
        { options },
      );

      expect(getContainer(fixture)?.classList.contains('uw-select-button-group--secondary')).toBe(true);
    });

    it('deve aplicar classe danger', () => {
      const fixture = createHost(
        `<uw-select-button-group [options]="options" variant="danger"></uw-select-button-group>`,
        { options },
      );

      expect(getContainer(fixture)?.classList.contains('uw-select-button-group--danger')).toBe(true);
    });
  });

  describe('tamanhos', () => {
    it('deve aplicar classe sm', () => {
      const fixture = createHost(
        `<uw-select-button-group [options]="options" size="sm"></uw-select-button-group>`,
        { options },
      );

      expect(getContainer(fixture)?.classList.contains('uw-select-button-group--sm')).toBe(true);
    });

    it('deve aplicar classe md por padrão', () => {
      const fixture = createHost(
        `<uw-select-button-group [options]="options"></uw-select-button-group>`,
        { options },
      );

      expect(getContainer(fixture)?.classList.contains('uw-select-button-group--md')).toBe(true);
    });

    it('deve aplicar classe lg', () => {
      const fixture = createHost(
        `<uw-select-button-group [options]="options" size="lg"></uw-select-button-group>`,
        { options },
      );

      expect(getContainer(fixture)?.classList.contains('uw-select-button-group--lg')).toBe(true);
    });
  });

  describe('options genéricas', () => {
    it('deve funcionar com value numérico', () => {
      const numOptions: SelectButtonOption<number>[] = [
        { label: 'Um', value: 1 },
        { label: 'Dois', value: 2 },
      ];
      const fixture = createHost(
        `<uw-select-button-group [options]="options"></uw-select-button-group>`,
        { options: numOptions },
      );

      getButtons(fixture)[1].click();
      fixture.detectChanges();

      expect(getActiveButtons(fixture)[0].textContent?.trim()).toBe('Dois');
    });

    it('deve funcionar com value de objeto', () => {
      const objOptions: SelectButtonOption<{ id: number }>[] = [
        { label: 'A', value: { id: 1 } },
        { label: 'B', value: { id: 2 } },
      ];
      const fixture = createHost(
        `<uw-select-button-group [options]="options"></uw-select-button-group>`,
        { options: objOptions },
      );

      getButtons(fixture)[0].click();
      fixture.detectChanges();

      expect(getActiveButtons(fixture).length).toBe(1);
    });
  });
});
