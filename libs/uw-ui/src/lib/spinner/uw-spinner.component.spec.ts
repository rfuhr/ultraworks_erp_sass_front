import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UwSpinnerComponent } from './uw-spinner.component';

describe('UwSpinnerComponent', () => {
  let fixture: ComponentFixture<UwSpinnerComponent>;
  let component: UwSpinnerComponent;

  beforeEach(() => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({ imports: [UwSpinnerComponent] });
    fixture = TestBed.createComponent(UwSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render indeterminate spinner by default', () => {
    const el = fixture.nativeElement.querySelector('.spinner-indeterminate');
    expect(el).toBeTruthy();
  });

  it('should render determinate SVG when mode is determinate', () => {
    fixture.componentRef.setInput('mode', 'determinate');
    fixture.componentRef.setInput('value', 50);
    fixture.detectChanges();
    const svg = fixture.nativeElement.querySelector('.spinner-svg');
    expect(svg).toBeTruthy();
    const val = fixture.nativeElement.querySelector('.spinner-value');
    expect(val.textContent).toContain('50%');
  });

  it('should render overlay when overlay is true', () => {
    fixture.componentRef.setInput('overlay', true);
    fixture.detectChanges();
    const overlay = fixture.nativeElement.querySelector('.spinner-overlay');
    expect(overlay).toBeTruthy();
  });

  it('should render label when provided', () => {
    fixture.componentRef.setInput('label', 'Loading...');
    fixture.detectChanges();
    const label = fixture.nativeElement.querySelector('.spinner-label');
    expect(label).toBeTruthy();
    expect(label.textContent).toContain('Loading...');
  });
});
