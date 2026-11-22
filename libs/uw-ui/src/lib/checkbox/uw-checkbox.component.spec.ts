import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UwCheckboxComponent } from './uw-checkbox.component';

function createHost(template: string): ComponentFixture<unknown> {
  @Component({
    template,
    imports: [UwCheckboxComponent, FormsModule],
    standalone: true,
  })
  class HostComponent {}

  TestBed.resetTestingModule();
  TestBed.configureTestingModule({ imports: [HostComponent] });

  const fixture = TestBed.createComponent(HostComponent);
  fixture.detectChanges();
  return fixture;
}

function getBox(fixture: ComponentFixture<unknown>): HTMLElement | null {
  return fixture.nativeElement.querySelector('.checkbox-box');
}

function getLabel(fixture: ComponentFixture<unknown>): HTMLElement | null {
  return fixture.nativeElement.querySelector('.checkbox-label');
}

function getIcon(fixture: ComponentFixture<unknown>): HTMLElement | null {
  return fixture.nativeElement.querySelector('.checkbox-icon');
}

describe('UwCheckboxComponent', () => {
  it('should create', () => {
    const fixture = createHost(`<uw-checkbox></uw-checkbox>`);
    expect(fixture.nativeElement.querySelector('uw-checkbox')).toBeTruthy();
  });

  it('should toggle on click', () => {
    const fixture = createHost(`<uw-checkbox></uw-checkbox>`);
    const box = getBox(fixture);
    box?.click();
    fixture.detectChanges();
    expect(box?.classList.contains('checkbox-checked')).toBe(true);
    expect(getIcon(fixture)?.textContent?.trim()).toBe('check');
  });

  it('should toggle off on second click', () => {
    const fixture = createHost(`<uw-checkbox></uw-checkbox>`);
    const box = getBox(fixture);
    box?.click();
    fixture.detectChanges();
    box?.click();
    fixture.detectChanges();
    expect(box?.classList.contains('checkbox-checked')).toBe(false);
  });

  it('should not toggle when disabled', () => {
    const fixture = createHost(`<uw-checkbox [disabled]="true"></uw-checkbox>`);
    const box = getBox(fixture);
    box?.click();
    fixture.detectChanges();
    expect(box?.classList.contains('checkbox-checked')).toBe(false);
  });

  it('should not toggle when disabled via form control state', () => {
    const fixture = createHost(`<uw-checkbox></uw-checkbox>`);
    const component = fixture.debugElement.children[0].componentInstance as UwCheckboxComponent;
    component.setDisabledState(true);
    fixture.detectChanges();

    const box = getBox(fixture);
    box?.click();
    fixture.detectChanges();

    expect(box?.classList.contains('checkbox-checked')).toBe(false);
    expect(
      fixture.nativeElement.querySelector('.checkbox-container')?.classList.contains('checkbox-disabled'),
    ).toBe(true);
  });

  it('should display label on the right by default', () => {
    const fixture = createHost(`<uw-checkbox label="Teste"></uw-checkbox>`);
    expect(getLabel(fixture)?.textContent?.trim()).toBe('Teste');
  });

  it('should display label on the left', () => {
    const fixture = createHost(`<uw-checkbox label="Teste" labelPosition="left"></uw-checkbox>`);
    const container = fixture.nativeElement.querySelector('.checkbox-container');
    expect(container?.children[0]?.classList.contains('checkbox-label')).toBe(true);
  });

  it('should show indeterminate state', () => {
    const fixture = createHost(`<uw-checkbox [indeterminate]="true"></uw-checkbox>`);
    fixture.detectChanges();
    const box = getBox(fixture);
    expect(box?.classList.contains('checkbox-indeterminate')).toBe(true);
    expect(getIcon(fixture)?.textContent?.trim()).toBe('remove');
  });

  it('should use sm size class', () => {
    const fixture = createHost(`<uw-checkbox size="sm"></uw-checkbox>`);
    const box = getBox(fixture);
    expect(box?.classList.contains('checkbox-sm')).toBe(true);
  });

  describe('ControlValueAccessor', () => {
    it('should write value', () => {
      const fixture = createHost(`<uw-checkbox></uw-checkbox>`);
      const component = fixture.debugElement.children[0].componentInstance as UwCheckboxComponent;
      component.writeValue(true);
      expect(component['innerValue']()).toBe(true);
    });

    it('should call onChange when toggled', () => {
      const fixture = createHost(`<uw-checkbox></uw-checkbox>`);
      const component = fixture.debugElement.children[0].componentInstance as UwCheckboxComponent;
      const fn = jest.fn();
      component.registerOnChange(fn);
      component.toggle();
      expect(fn).toHaveBeenCalledWith(true);
    });

    it('should call onTouched when toggled', () => {
      const fixture = createHost(`<uw-checkbox></uw-checkbox>`);
      const component = fixture.debugElement.children[0].componentInstance as UwCheckboxComponent;
      const fn = jest.fn();
      component.registerOnTouched(fn);
      component.toggle();
      expect(fn).toHaveBeenCalled();
    });
  });
});
