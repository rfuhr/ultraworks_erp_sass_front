import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UwRadioGroupComponent } from './uw-radio-group.component';
import { UwRadioOptionComponent } from './uw-radio-option.component';

function createHost(template: string): ComponentFixture<unknown> {
  @Component({
    template,
    imports: [UwRadioGroupComponent, UwRadioOptionComponent, FormsModule],
    standalone: true,
  })
  class HostComponent {}

  TestBed.resetTestingModule();
  TestBed.configureTestingModule({ imports: [HostComponent] });

  const fixture = TestBed.createComponent(HostComponent);
  fixture.detectChanges();
  return fixture;
}

describe('UwRadioGroupComponent', () => {
  it('should create', () => {
    const fixture = createHost(`
      <uw-radio-group>
        <uw-radio-option value="a" label="Opção A"></uw-radio-option>
        <uw-radio-option value="b" label="Opção B"></uw-radio-option>
      </uw-radio-group>
    `);
    expect(fixture.nativeElement.querySelector('uw-radio-group')).toBeTruthy();
  });

  it('should select option on click', () => {
    const fixture = createHost(`
      <uw-radio-group>
        <uw-radio-option value="a" label="Opção A"></uw-radio-option>
        <uw-radio-option value="b" label="Opção B"></uw-radio-option>
      </uw-radio-group>
    `);
    const circles = fixture.nativeElement.querySelectorAll('.radio-circle');
    circles[1]?.click();
    fixture.detectChanges();
    expect(circles[1]?.classList.contains('radio-selected')).toBe(true);
    expect(circles[0]?.classList.contains('radio-selected')).toBe(false);
  });

  it('should deselect previous when new option selected', () => {
    const fixture = createHost(`
      <uw-radio-group>
        <uw-radio-option value="a" label="Opção A"></uw-radio-option>
        <uw-radio-option value="b" label="Opção B"></uw-radio-option>
      </uw-radio-group>
    `);
    const circles = fixture.nativeElement.querySelectorAll('.radio-circle');
    circles[0]?.click();
    fixture.detectChanges();
    circles[1]?.click();
    fixture.detectChanges();
    expect(circles[0]?.classList.contains('radio-selected')).toBe(false);
    expect(circles[1]?.classList.contains('radio-selected')).toBe(true);
  });

  it('should have vertical orientation by default', () => {
    const fixture = createHost(`
      <uw-radio-group>
        <uw-radio-option value="a" label="Opção A"></uw-radio-option>
      </uw-radio-group>
    `);
    const container = fixture.nativeElement.querySelector('.radio-group-container');
    expect(container?.classList.contains('radio-group-vertical')).toBe(true);
  });

  it('should support horizontal orientation', () => {
    const fixture = createHost(`
      <uw-radio-group orientation="horizontal">
        <uw-radio-option value="a" label="Opção A"></uw-radio-option>
      </uw-radio-group>
    `);
    const container = fixture.nativeElement.querySelector('.radio-group-container');
    expect(container?.classList.contains('radio-group-horizontal')).toBe(true);
  });

  describe('ControlValueAccessor', () => {
    it('should write value', () => {
      const fixture = createHost(`
        <uw-radio-group>
          <uw-radio-option value="a" label="Opção A"></uw-radio-option>
          <uw-radio-option value="b" label="Opção B"></uw-radio-option>
        </uw-radio-group>
      `);
      const component = fixture.debugElement.children[0].componentInstance as UwRadioGroupComponent;
      component.writeValue('a');
      fixture.detectChanges();
      expect(component['innerValue']()).toBe('a');
    });

    it('should call onChange when option selected', () => {
      const fixture = createHost(`
        <uw-radio-group>
          <uw-radio-option value="a" label="Opção A"></uw-radio-option>
          <uw-radio-option value="b" label="Opção B"></uw-radio-option>
        </uw-radio-group>
      `);
      const component = fixture.debugElement.children[0].componentInstance as UwRadioGroupComponent;
      const fn = jest.fn();
      component.registerOnChange(fn);
      const options = component.options.toArray();
      component.selectOption(options[1]);
      expect(fn).toHaveBeenCalledWith('b');
    });

    it('should call onTouched when option selected', () => {
      const fixture = createHost(`
        <uw-radio-group>
          <uw-radio-option value="a" label="Opção A"></uw-radio-option>
          <uw-radio-option value="b" label="Opção B"></uw-radio-option>
        </uw-radio-group>
      `);
      const component = fixture.debugElement.children[0].componentInstance as UwRadioGroupComponent;
      const fn = jest.fn();
      component.registerOnTouched(fn);
      const options = component.options.toArray();
      component.selectOption(options[0]);
      expect(fn).toHaveBeenCalled();
    });
  });
});
