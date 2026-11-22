import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UwChartCardComponent } from './uw-chart-card.component';

describe('UwChartCardComponent', () => {
  let fixture: ComponentFixture<UwChartCardComponent>;

  beforeEach(() => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({ imports: [UwChartCardComponent] });
    fixture = TestBed.createComponent(UwChartCardComponent);
  });

  it('exibe título, subtítulo e badge', () => {
    fixture.componentRef.setInput('title', 'Recebimentos');
    fixture.componentRef.setInput('subtitle', 'Por forma de pagamento');
    fixture.componentRef.setInput('badge', 'R$ 10,00');
    fixture.detectChanges();

    const text = fixture.nativeElement.textContent;
    expect(text).toContain('Recebimentos');
    expect(text).toContain('Por forma de pagamento');
    expect(text).toContain('R$ 10,00');
  });

  it('omite subtítulo e badge quando vazios', () => {
    fixture.componentRef.setInput('title', 'Recebimentos');
    fixture.detectChanges();

    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelector('.uw-chart-card__subtitle')).toBeNull();
    expect(el.querySelector('.uw-chart-card__badge')).toBeNull();
  });
});
