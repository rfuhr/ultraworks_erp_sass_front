import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { UwPageHeaderComponent } from './uw-page-header.component';

@Component({
  template: `
    <uw-page-header title="Test" description="Desc">
      <button class="projected-btn">Ação</button>
    </uw-page-header>
  `,
  imports: [UwPageHeaderComponent],
  standalone: true,
})
class TestHostComponent {}

describe('UwPageHeaderComponent', () => {
  let fixture: ComponentFixture<UwPageHeaderComponent>;
  let component: UwPageHeaderComponent;

  beforeEach(() => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [UwPageHeaderComponent],
    });

    fixture = TestBed.createComponent(UwPageHeaderComponent);
    component = fixture.componentInstance;
  });

  function getTitle(): HTMLElement | null {
    return fixture.nativeElement.querySelector('.uw-page-header__title');
  }

  function getDescription(): HTMLElement | null {
    return fixture.nativeElement.querySelector('.uw-page-header__description');
  }

  function getBackButton(): HTMLElement | null {
    return fixture.nativeElement.querySelector('.uw-page-header__back');
  }

  describe('title', () => {
    it('should render title', () => {
      fixture.componentRef.setInput('title', 'Eventos');
      fixture.detectChanges();
      expect(getTitle()?.textContent?.trim()).toBe('Eventos');
    });
  });

  describe('description', () => {
    it('should render description when provided', () => {
      fixture.componentRef.setInput('title', 'Eventos');
      fixture.componentRef.setInput('description', 'Gerencie seus eventos');
      fixture.detectChanges();
      expect(getDescription()?.textContent?.trim()).toBe('Gerencie seus eventos');
    });

    it('should not render description when not provided', () => {
      fixture.componentRef.setInput('title', 'Eventos');
      fixture.detectChanges();
      expect(getDescription()).toBeNull();
    });
  });

  describe('back button', () => {
    it('should not render back button when backLabel is not provided', () => {
      fixture.componentRef.setInput('title', 'Eventos');
      fixture.detectChanges();
      expect(getBackButton()).toBeNull();
    });

    it('should render back button when backLabel is provided', () => {
      fixture.componentRef.setInput('title', 'Eventos');
      fixture.componentRef.setInput('backLabel', 'Voltar');
      fixture.detectChanges();
      expect(getBackButton()).toBeTruthy();
    });

    it('should emit backClick when back button is clicked', () => {
      const spy = jest.fn();
      component.backClick.subscribe(spy);
      fixture.componentRef.setInput('title', 'Eventos');
      fixture.componentRef.setInput('backLabel', 'Voltar');
      fixture.detectChanges();
      const btn = getBackButton()?.querySelector('button');
      btn?.click();
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('content projection', () => {
    it('should project content into actions area', () => {
      const hostFixture = TestBed.createComponent(TestHostComponent);
      hostFixture.detectChanges();
      const btn = hostFixture.nativeElement.querySelector('.projected-btn');
      expect(btn).toBeTruthy();
      expect(btn?.textContent?.trim()).toBe('Ação');
    });
  });

  describe('layout classes', () => {
    it('should have flex layout wrapper', () => {
      fixture.componentRef.setInput('title', 'Eventos');
      fixture.detectChanges();
      const header = fixture.nativeElement.querySelector('.uw-page-header');
      expect(header).toBeTruthy();
    });
  });

  describe('defaults', () => {
    it('should create the component', () => {
      expect(component).toBeTruthy();
    });

    it('should default title to empty string', () => {
      fixture.detectChanges();
      expect(getTitle()?.textContent?.trim()).toBe('');
    });
  });
});
