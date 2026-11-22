import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UwEmptyStateComponent } from './uw-empty-state.component';

describe('UwEmptyStateComponent', () => {
  let fixture: ComponentFixture<UwEmptyStateComponent>;

  beforeEach(() => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({ imports: [UwEmptyStateComponent] });
    fixture = TestBed.createComponent(UwEmptyStateComponent);
    fixture.componentRef.setInput('title', 'Título padrão');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render title', () => {
    const el = fixture.nativeElement.querySelector('.empty-state-title');
    expect(el.textContent).toContain('Título padrão');
    fixture.componentRef.setInput('title', 'No results');
    fixture.detectChanges();
    expect(el.textContent).toContain('No results');
  });

  it('should render description when provided', () => {
    fixture.componentRef.setInput('description', 'Try again');
    fixture.detectChanges();
    const desc = fixture.nativeElement.querySelector('.empty-state-description');
    expect(desc).toBeTruthy();
    expect(desc.textContent).toContain('Try again');
  });

  it('should render action button when actionLabel is provided', () => {
    fixture.componentRef.setInput('actionLabel', 'Create');
    fixture.detectChanges();
    const btn = fixture.nativeElement.querySelector('.empty-state-action');
    expect(btn).toBeTruthy();
    expect(btn.textContent).toContain('Create');
  });

  it('should emit action on button click', () => {
    fixture.componentRef.setInput('actionLabel', 'Go');
    fixture.detectChanges();
    const spy = jest.spyOn(fixture.componentInstance.action, 'emit');
    fixture.nativeElement.querySelector('.empty-state-action').click();
    expect(spy).toHaveBeenCalled();
  });

  it('should apply size class', () => {
    fixture.componentRef.setInput('size', 'lg');
    fixture.detectChanges();
    const host = fixture.nativeElement.querySelector('.empty-state');
    expect(host.classList).toContain('empty-state-lg');
  });
});
