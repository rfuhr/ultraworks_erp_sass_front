import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UwDividerComponent } from './uw-divider.component';

describe('UwDividerComponent', () => {
  let fixture: ComponentFixture<UwDividerComponent>;
  let component: UwDividerComponent;

  beforeEach(() => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({ imports: [UwDividerComponent] });
    fixture = TestBed.createComponent(UwDividerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render horizontal divider by default', () => {
    const el = fixture.nativeElement.querySelector('.divider-horizontal');
    expect(el).toBeTruthy();
    expect(el.getAttribute('role')).toBe('separator');
  });

  it('should render vertical divider', () => {
    fixture.componentRef.setInput('orientation', 'vertical');
    fixture.detectChanges();
    const el = fixture.nativeElement.querySelector('.divider-vertical');
    expect(el).toBeTruthy();
    expect(el.getAttribute('aria-orientation')).toBe('vertical');
  });

  it('should render divider with label', () => {
    fixture.componentRef.setInput('label', 'or');
    fixture.detectChanges();
    const el = fixture.nativeElement.querySelector('.divider-with-label');
    expect(el).toBeTruthy();
    expect(el.textContent).toContain('or');
  });

  it('should render divider with icon', () => {
    fixture.componentRef.setInput('icon', 'star');
    fixture.detectChanges();
    const el = fixture.nativeElement.querySelector('.divider-with-label');
    expect(el).toBeTruthy();
    const icon = fixture.nativeElement.querySelector('.divider-icon');
    expect(icon).toBeTruthy();
    expect(icon.textContent).toContain('star');
  });
});
