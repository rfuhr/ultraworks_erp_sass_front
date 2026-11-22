import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { UwRadioOptionComponent } from './uw-radio-option.component';

function createHost(template: string): ComponentFixture<unknown> {
  @Component({
    template,
    imports: [UwRadioOptionComponent],
    standalone: true,
  })
  class HostComponent {}

  TestBed.resetTestingModule();
  TestBed.configureTestingModule({ imports: [HostComponent] });

  const fixture = TestBed.createComponent(HostComponent);
  fixture.detectChanges();
  return fixture;
}

describe('UwRadioOptionComponent', () => {
  it('should create', () => {
    const fixture = createHost(`<uw-radio-option value="a" label="Teste"></uw-radio-option>`);
    expect(fixture.nativeElement.querySelector('uw-radio-option')).toBeTruthy();
  });

  it('should display label', () => {
    const fixture = createHost(`<uw-radio-option value="a" label="Opção A"></uw-radio-option>`);
    const label = fixture.nativeElement.querySelector('.radio-label');
    expect(label?.textContent?.trim()).toBe('Opção A');
  });

  it('should show selected state when checked', () => {
    const fixture = createHost(`<uw-radio-option value="a" label="Teste"></uw-radio-option>`);
    const component = fixture.debugElement.children[0].componentInstance as UwRadioOptionComponent;
    component.checked.set(true);
    fixture.detectChanges();
    const circle = fixture.nativeElement.querySelector('.radio-circle');
    expect(circle?.classList.contains('radio-selected')).toBe(true);
    expect(fixture.nativeElement.querySelector('.radio-dot')).toBeTruthy();
  });

  it('should have disabled class when disabled', () => {
    const fixture = createHost(`<uw-radio-option value="a" label="Teste" [disabled]="true"></uw-radio-option>`);
    const container = fixture.nativeElement.querySelector('.radio-option-container');
    expect(container?.classList.contains('radio-option-disabled')).toBe(true);
  });
});
