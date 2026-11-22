import { TestBed, ComponentFixture } from '@angular/core/testing';
import { UwProfileBadgeComponent } from './uw-profile-badge.component';

describe('UwProfileBadgeComponent', () => {
  let fixture: ComponentFixture<UwProfileBadgeComponent>;

  beforeEach(() => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [UwProfileBadgeComponent],
    });
    fixture = TestBed.createComponent(UwProfileBadgeComponent);
  });

  it('deve criar o componente', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('deve renderizar "Avaliador" para tipo avaliador', () => {
    fixture.componentRef.setInput('tipo', 'avaliador');
    fixture.detectChanges();

    const el = fixture.nativeElement as HTMLElement;
    const badge = el.querySelector('.uw-profile-badge');
    expect(badge).toBeTruthy();
    expect(badge!.textContent).toContain('Avaliador');
    expect(badge!.classList.contains('uw-profile-badge--avaliador')).toBe(true);
  });

  it('deve renderizar "Administrativo" para tipo administrativo', () => {
    fixture.componentRef.setInput('tipo', 'administrativo');
    fixture.detectChanges();

    const el = fixture.nativeElement as HTMLElement;
    const badge = el.querySelector('.uw-profile-badge');
    expect(badge).toBeTruthy();
    expect(badge!.textContent).toContain('Administrativo');
    expect(badge!.classList.contains('uw-profile-badge--administrativo')).toBe(true);
  });
});
