import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UwToggleComponent } from './uw-toggle.component';

function createHost(template: string): ComponentFixture<unknown> {
  @Component({
    template,
    imports: [UwToggleComponent, FormsModule],
    standalone: true,
  })
  class HostComponent {}

  TestBed.resetTestingModule();
  TestBed.configureTestingModule({ imports: [HostComponent] });

  const fixture = TestBed.createComponent(HostComponent);
  fixture.detectChanges();
  return fixture;
}

function getTrack(fixture: ComponentFixture<unknown>): HTMLElement | null {
  return fixture.nativeElement.querySelector('.toggle-track');
}

function getLabel(fixture: ComponentFixture<unknown>): HTMLElement | null {
  return fixture.nativeElement.querySelector('.toggle-label');
}

describe('UwToggleComponent', () => {
  it('should create', () => {
    const fixture = createHost(`<uw-toggle></uw-toggle>`);
    expect(fixture.nativeElement.querySelector('uw-toggle')).toBeTruthy();
  });

  it('should toggle on click', () => {
    const fixture = createHost(`<uw-toggle></uw-toggle>`);
    const track = getTrack(fixture);
    track?.click();
    fixture.detectChanges();
    expect(track?.classList.contains('toggle-checked')).toBe(true);
  });

  it('should toggle off on second click', () => {
    const fixture = createHost(`<uw-toggle></uw-toggle>`);
    const track = getTrack(fixture);
    track?.click();
    fixture.detectChanges();
    track?.click();
    fixture.detectChanges();
    expect(track?.classList.contains('toggle-checked')).toBe(false);
  });

  it('should not toggle when disabled', () => {
    const fixture = createHost(`<uw-toggle [disabled]="true"></uw-toggle>`);
    const track = getTrack(fixture);
    track?.click();
    fixture.detectChanges();
    expect(track?.classList.contains('toggle-checked')).toBe(false);
  });

  it('should display label on the right by default', () => {
    const fixture = createHost(`<uw-toggle label="Teste"></uw-toggle>`);
    const label = getLabel(fixture);
    expect(label).toBeTruthy();
    expect(label?.textContent?.trim()).toBe('Teste');
  });

  it('should display label on the left when labelPosition is left', () => {
    const fixture = createHost(`<uw-toggle label="Teste" labelPosition="left"></uw-toggle>`);
    const container = fixture.nativeElement.querySelector('.toggle-container');
    const children = container?.children;
    expect(children?.[0]?.classList.contains('toggle-label')).toBe(true);
  });

  it('should use sm size class', () => {
    const fixture = createHost(`<uw-toggle size="sm"></uw-toggle>`);
    const track = getTrack(fixture);
    expect(track?.classList.contains('toggle-sm')).toBe(true);
  });

  it('should set aria-checked', () => {
    const fixture = createHost(`<uw-toggle></uw-toggle>`);
    const toggle = fixture.nativeElement.querySelector('uw-toggle');
    expect(toggle?.getAttribute('role')).toBe('switch');
    expect(toggle?.getAttribute('aria-checked')).toBe('false');
  });

  it('should toggle via keyboard Enter', () => {
    const fixture = createHost(`<uw-toggle></uw-toggle>`);
    const toggle = fixture.nativeElement.querySelector('uw-toggle');
    const event = new KeyboardEvent('keydown', { key: 'Enter' });
    toggle?.dispatchEvent(event);
    fixture.detectChanges();
    const track = getTrack(fixture);
    expect(track?.classList.contains('toggle-checked')).toBe(true);
  });

  describe('ControlValueAccessor', () => {
    it('should write value', () => {
      const fixture = createHost(`<uw-toggle [(ngModel)]="value"></uw-toggle>`);
      const component = fixture.debugElement.children[0].componentInstance as UwToggleComponent;
      component.writeValue(true);
      expect(component['innerValue']()).toBe(true);
    });

    it('should call onChange when toggled', () => {
      const fixture = createHost(`<uw-toggle></uw-toggle>`);
      const component = fixture.debugElement.children[0].componentInstance as UwToggleComponent;
      const fn = jest.fn();
      component.registerOnChange(fn);
      component.toggle();
      expect(fn).toHaveBeenCalledWith(true);
    });

    it('should call onTouched when toggled', () => {
      const fixture = createHost(`<uw-toggle></uw-toggle>`);
      const component = fixture.debugElement.children[0].componentInstance as UwToggleComponent;
      const fn = jest.fn();
      component.registerOnTouched(fn);
      component.toggle();
      expect(fn).toHaveBeenCalled();
    });
  });
});
