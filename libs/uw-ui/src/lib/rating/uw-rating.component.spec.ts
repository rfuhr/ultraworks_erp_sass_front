import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UwRatingComponent } from './uw-rating.component';

function createHost(template: string): ComponentFixture<unknown> {
  @Component({
    template,
    imports: [UwRatingComponent, FormsModule],
    standalone: true,
  })
  class HostComponent {}

  TestBed.resetTestingModule();
  TestBed.configureTestingModule({ imports: [HostComponent] });

  const fixture = TestBed.createComponent(HostComponent);
  fixture.detectChanges();
  return fixture;
}

function getStars(fixture: ComponentFixture<unknown>): NodeListOf<Element> {
  return fixture.nativeElement.querySelectorAll('.rating-star');
}

describe('UwRatingComponent', () => {
  it('should create', () => {
    const fixture = createHost(`<uw-rating></uw-rating>`);
    expect(fixture.nativeElement.querySelector('uw-rating')).toBeTruthy();
  });

  it('should render 5 stars by default', () => {
    const fixture = createHost(`<uw-rating></uw-rating>`);
    const stars = getStars(fixture);
    expect(stars.length).toBe(5);
  });

  it('should render custom max stars', () => {
    const fixture = createHost(`<uw-rating [max]="3"></uw-rating>`);
    const stars = getStars(fixture);
    expect(stars.length).toBe(3);
  });

  it('should set value on star click', () => {
    const fixture = createHost(`<uw-rating></uw-rating>`);
    const stars = getStars(fixture);
    (stars[2] as HTMLElement).click();
    fixture.detectChanges();
    const component = fixture.debugElement.children[0].componentInstance as UwRatingComponent;
    expect(component['innerValue']()).toBe(3);
  });

  it('should show label when showLabel is true', () => {
    const fixture = createHost(`<uw-rating [showLabel]="true"></uw-rating>`);
    fixture.detectChanges();
    const label = fixture.nativeElement.querySelector('.rating-value');
    expect(label).toBeTruthy();
  });

  it('should not react to click when readonly', () => {
    const fixture = createHost(`<uw-rating [readonly]="true"></uw-rating>`);
    const stars = getStars(fixture);
    (stars[2] as HTMLElement).click();
    fixture.detectChanges();
    const component = fixture.debugElement.children[0].componentInstance as UwRatingComponent;
    expect(component['innerValue']()).toBe(0);
  });

  describe('ControlValueAccessor', () => {
    it('should write value', () => {
      const fixture = createHost(`<uw-rating></uw-rating>`);
      const component = fixture.debugElement.children[0].componentInstance as UwRatingComponent;
      component.writeValue(4);
      expect(component['innerValue']()).toBe(4);
    });

    it('should call onChange when value changes', () => {
      const fixture = createHost(`<uw-rating></uw-rating>`);
      const component = fixture.debugElement.children[0].componentInstance as UwRatingComponent;
      const fn = jest.fn();
      component.registerOnChange(fn);
      component['innerValue'].set(3);
      component['onChange'](3);
      expect(fn).toHaveBeenCalledWith(3);
    });
  });
});
