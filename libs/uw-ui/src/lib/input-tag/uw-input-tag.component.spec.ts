import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { UwInputTagComponent } from './uw-input-tag.component';

function createHost(template: string, data?: Record<string, unknown>): ComponentFixture<unknown> {
  @Component({
    template,
    imports: [UwInputTagComponent, ReactiveFormsModule],
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

function getInput(fixture: ComponentFixture<unknown>): HTMLInputElement | null {
  return fixture.nativeElement.querySelector('.uw-input-tag__input');
}

function getTags(fixture: ComponentFixture<unknown>): HTMLElement[] {
  return Array.from(fixture.nativeElement.querySelectorAll('uw-tag'));
}

function dispatchEnter(input: HTMLInputElement): void {
  input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
}

describe('UwInputTagComponent', () => {
  describe('adicionar tag via Enter', () => {
    it('deve adicionar tag ao pressionar Enter', () => {
      const fixture = createHost(`<uw-input-tag />`);

      const input = getInput(fixture)!;
      input.value = 'Angular';
      input.dispatchEvent(new Event('input'));
      dispatchEnter(input);
      fixture.detectChanges();

      expect(getTags(fixture).length).toBe(1);
      expect(getTags(fixture)[0].textContent?.trim()).toContain('Angular');
    });

    it('deve estar apto a adicionar nova tag após a primeira', () => {
      const fixture = createHost(`<uw-input-tag />`);

      const input = getInput(fixture)!;
      input.value = 'Angular';
      input.dispatchEvent(new Event('input'));
      dispatchEnter(input);
      fixture.detectChanges();

      input.value = 'NestJS';
      input.dispatchEvent(new Event('input'));
      dispatchEnter(input);
      fixture.detectChanges();

      expect(getTags(fixture).length).toBe(2);
    });
  });

  describe('prevenir duplicatas case-insensitive', () => {
    it('não deve adicionar tag duplicata com mesma capitalização', () => {
      const fixture = createHost(`<uw-input-tag />`);

      const input = getInput(fixture)!;
      input.value = 'Angular';
      input.dispatchEvent(new Event('input'));
      dispatchEnter(input);
      fixture.detectChanges();

      input.value = 'Angular';
      input.dispatchEvent(new Event('input'));
      dispatchEnter(input);
      fixture.detectChanges();

      expect(getTags(fixture).length).toBe(1);
    });

    it('não deve adicionar tag duplicata com capitalização diferente', () => {
      const fixture = createHost(`<uw-input-tag />`);

      const input = getInput(fixture)!;
      input.value = 'Angular';
      input.dispatchEvent(new Event('input'));
      dispatchEnter(input);
      fixture.detectChanges();

      input.value = 'angular';
      input.dispatchEvent(new Event('input'));
      dispatchEnter(input);
      fixture.detectChanges();

      expect(getTags(fixture).length).toBe(1);
    });
  });

  describe('Enter com input vazio', () => {
    it('não deve adicionar tag quando input está vazio', () => {
      const fixture = createHost(`<uw-input-tag />`);

      const input = getInput(fixture)!;
      input.value = '';
      input.dispatchEvent(new Event('input'));
      dispatchEnter(input);
      fixture.detectChanges();

      expect(getTags(fixture).length).toBe(0);
    });

    it('não deve adicionar tag quando input tem apenas espaços', () => {
      const fixture = createHost(`<uw-input-tag />`);

      const input = getInput(fixture)!;
      input.value = '   ';
      input.dispatchEvent(new Event('input'));
      dispatchEnter(input);
      fixture.detectChanges();

      expect(getTags(fixture).length).toBe(0);
    });
  });

  describe('remover tag', () => {
    it('deve remover tag ao clicar no X', () => {
      const fixture = createHost(`<uw-input-tag />`);

      const input = getInput(fixture)!;
      input.value = 'Angular';
      input.dispatchEvent(new Event('input'));
      dispatchEnter(input);
      input.value = 'NestJS';
      input.dispatchEvent(new Event('input'));
      dispatchEnter(input);
      fixture.detectChanges();
      expect(getTags(fixture).length).toBe(2);

      const removeBtn = fixture.nativeElement.querySelector('uw-tag .uw-tag__remove');
      removeBtn?.click();
      fixture.detectChanges();

      expect(getTags(fixture).length).toBe(1);
      expect(getTags(fixture)[0].textContent?.trim()).toContain('NestJS');
    });
  });

  describe('limite de tags', () => {
    it('não deve exceder o limite configurado', () => {
      const fixture = createHost(`<uw-input-tag [maxTags]="2" />`);

      const input = getInput(fixture)!;
      input.value = 'A';
      input.dispatchEvent(new Event('input'));
      dispatchEnter(input);
      input.value = 'B';
      input.dispatchEvent(new Event('input'));
      dispatchEnter(input);
      input.value = 'C';
      input.dispatchEvent(new Event('input'));
      dispatchEnter(input);
      fixture.detectChanges();

      expect(getTags(fixture).length).toBe(2);
    });
  });

  describe('placeholder condicional', () => {
    it('deve exibir placeholder quando não há tags', () => {
      const fixture = createHost(`<uw-input-tag />`);

      const input = getInput(fixture)!;
      expect(input.placeholder).toBe('Adicionar tag e pressionar Enter...');
    });

    it('deve ocultar placeholder quando há tags', () => {
      const fixture = createHost(`<uw-input-tag />`);

      const input = getInput(fixture)!;
      input.value = 'Angular';
      input.dispatchEvent(new Event('input'));
      dispatchEnter(input);
      fixture.detectChanges();

      expect(input.placeholder).toBe('');
    });
  });

  describe('ControlValueAccessor', () => {
    it('deve escrever valor via formControl', () => {
      const fixture = createHost(
        `<uw-input-tag [formControl]="control" />`,
        { control: new FormControl(['Angular', 'NestJS']) },
      );

      expect(getTags(fixture).length).toBe(2);
    });

    it('deve propagar adição para o formControl', () => {
      const control = new FormControl<string[]>([]);
      const fixture = createHost(
        `<uw-input-tag [formControl]="control" />`,
        { control },
      );

      const input = getInput(fixture)!;
      input.value = 'Docker';
      input.dispatchEvent(new Event('input'));
      dispatchEnter(input);
      fixture.detectChanges();

      expect(control.value).toEqual(['Docker']);
    });

    it('deve propagar remoção para o formControl', () => {
      const control = new FormControl(['Angular', 'Docker']);
      const fixture = createHost(
        `<uw-input-tag [formControl]="control" />`,
        { control },
      );

      const removeBtn = fixture.nativeElement.querySelector('uw-tag .uw-tag__remove');
      removeBtn?.click();
      fixture.detectChanges();

      expect(control.value).toEqual(['Docker']);
    });

    it('deve desabilitar via formControl.disable()', () => {
      const control = new FormControl<string[]>([]);
      const fixture = createHost(
        `<uw-input-tag [formControl]="control" />`,
        { control },
      );

      control.disable();
      fixture.detectChanges();

      expect(getInput(fixture)?.disabled).toBe(true);
    });
  });
});
