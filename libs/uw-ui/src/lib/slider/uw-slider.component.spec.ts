import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UwSliderComponent } from './uw-slider.component';

function createHost(template: string): ComponentFixture<unknown> {
  @Component({
    template,
    imports: [UwSliderComponent, FormsModule],
    standalone: true,
  })
  class HostComponent {}

  TestBed.resetTestingModule();
  TestBed.configureTestingModule({ imports: [HostComponent] });

  const fixture = TestBed.createComponent(HostComponent);
  fixture.detectChanges();
  return fixture;
}

describe('UwSliderComponent', () => {
  it('should create', () => {
    const fixture = createHost(`<uw-slider></uw-slider>`);
    expect(fixture.nativeElement.querySelector('uw-slider')).toBeTruthy();
  });

  it('should render single handle by default', () => {
    const fixture = createHost(`<uw-slider></uw-slider>`);
    const handles = fixture.nativeElement.querySelectorAll('.slider-handle');
    expect(handles.length).toBe(1);
  });

  it('should render two handles in range mode', () => {
    const fixture = createHost(`<uw-slider [range]="true"></uw-slider>`);
    const handles = fixture.nativeElement.querySelectorAll('.slider-handle');
    expect(handles.length).toBe(2);
  });

  it('should have disabled class when disabled', () => {
    const fixture = createHost(`<uw-slider [disabled]="true"></uw-slider>`);
    const container = fixture.nativeElement.querySelector('.slider-container');
    expect(container.classList.contains('slider-disabled')).toBe(true);
  });

  describe('ControlValueAccessor', () => {
    it('should write value', () => {
      const fixture = createHost(`<uw-slider></uw-slider>`);
      const component = fixture.debugElement.children[0].componentInstance as UwSliderComponent;
      component.writeValue(50);
      expect(component['innerValue']()).toBe(50);
    });

    it('should write range value', () => {
      const fixture = createHost(`<uw-slider [range]="true"></uw-slider>`);
      const component = fixture.debugElement.children[0].componentInstance as UwSliderComponent;
      component.writeValue([20, 80]);
      expect(component['innerValue']()).toEqual([20, 80]);
    });

    it('should call onChange when value changes', () => {
      const fixture = createHost(`<uw-slider></uw-slider>`);
      const component = fixture.debugElement.children[0].componentInstance as UwSliderComponent;
      const fn = jest.fn();
      component.registerOnChange(fn);
      component['innerValue'].set(42);
      component['onChange'](42);
      expect(fn).toHaveBeenCalledWith(42);
    });
  });
});
