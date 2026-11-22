import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UwOtpInputComponent } from './uw-otp-input.component';

function createHost(template: string): ComponentFixture<unknown> {
  @Component({
    template,
    imports: [UwOtpInputComponent, FormsModule],
    standalone: true,
  })
  class HostComponent {}

  TestBed.resetTestingModule();
  TestBed.configureTestingModule({ imports: [HostComponent] });

  const fixture = TestBed.createComponent(HostComponent);
  fixture.detectChanges();
  return fixture;
}

function getInputs(fixture: ComponentFixture<unknown>): NodeListOf<HTMLInputElement> {
  return fixture.nativeElement.querySelectorAll('.otp-field');
}

describe('UwOtpInputComponent', () => {
  it('should create', () => {
    const fixture = createHost(`<uw-otp-input></uw-otp-input>`);
    expect(fixture.nativeElement.querySelector('uw-otp-input')).toBeTruthy();
  });

  it('should render 6 inputs by default', () => {
    const fixture = createHost(`<uw-otp-input></uw-otp-input>`);
    const inputs = getInputs(fixture);
    expect(inputs.length).toBe(6);
  });

  it('should render custom length', () => {
    const fixture = createHost(`<uw-otp-input [length]="4"></uw-otp-input>`);
    const inputs = getInputs(fixture);
    expect(inputs.length).toBe(4);
  });

  it('should mark field as filled on input', () => {
    const fixture = createHost(`<uw-otp-input></uw-otp-input>`);
    const inputs = getInputs(fixture);
    const event = new InputEvent('input', { bubbles: true });
    Object.defineProperty(event, 'target', { value: { value: '5' } });
    inputs[0].value = '5';
    inputs[0].dispatchEvent(event);
    fixture.detectChanges();
    expect(inputs[0].classList.contains('otp-field-filled')).toBe(true);
  });

  it('should clear on backspace', () => {
    const fixture = createHost(`<uw-otp-input></uw-otp-input>`);
    const component = fixture.debugElement.children[0].componentInstance as UwOtpInputComponent;
    component['digits'].set(['1', '', '', '', '', '']);
    fixture.detectChanges();
    const inputs = getInputs(fixture);
    const event = new KeyboardEvent('keydown', { key: 'Backspace' });
    inputs[0].dispatchEvent(event);
    fixture.detectChanges();
    expect(component['digits']()[0]).toBe('');
  });

  describe('ControlValueAccessor', () => {
    it('should write value', () => {
      const fixture = createHost(`<uw-otp-input></uw-otp-input>`);
      const component = fixture.debugElement.children[0].componentInstance as UwOtpInputComponent;
      component.writeValue('123');
      expect(component['digits']().slice(0, 3).join('')).toBe('123');
    });

    it('should call onChange when value changes', () => {
      const fixture = createHost(`<uw-otp-input></uw-otp-input>`);
      const component = fixture.debugElement.children[0].componentInstance as UwOtpInputComponent;
      const fn = jest.fn();
      component.registerOnChange(fn);
      component['digits'].set(['1', '2', '3', '', '', '']);
      component['onChange']('123');
      expect(fn).toHaveBeenCalledWith('123');
    });
  });
});
