import { TestBed, ComponentFixture } from '@angular/core/testing';
import { UwStatusBadgeComponent } from './status-badge.component';

describe('UwStatusBadgeComponent', () => {
  let fixture: ComponentFixture<UwStatusBadgeComponent>;

  beforeEach(() => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [UwStatusBadgeComponent],
    });
    fixture = TestBed.createComponent(UwStatusBadgeComponent);
  });

  it('deve criar o componente', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('deve renderizar "Ativo" para status ativo', () => {
    fixture.componentRef.setInput('status', 'ativo');
    fixture.detectChanges();

    const el = fixture.nativeElement as HTMLElement;
    const badge = el.querySelector('.uw-status-badge');
    expect(badge).toBeTruthy();
    expect(badge!.textContent).toContain('Ativo');
    expect(badge!.classList.contains('uw-status-badge--ativo')).toBe(true);
  });

  it('deve renderizar "Inativo" para status inativo', () => {
    fixture.componentRef.setInput('status', 'inativo');
    fixture.detectChanges();

    const el = fixture.nativeElement as HTMLElement;
    const badge = el.querySelector('.uw-status-badge');
    expect(badge).toBeTruthy();
    expect(badge!.textContent).toContain('Inativo');
    expect(badge!.classList.contains('uw-status-badge--inativo')).toBe(true);
  });
});
