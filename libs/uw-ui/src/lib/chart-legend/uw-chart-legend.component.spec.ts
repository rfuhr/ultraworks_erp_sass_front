import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UwChartLegendComponent } from './uw-chart-legend.component';

describe('UwChartLegendComponent', () => {
  let fixture: ComponentFixture<UwChartLegendComponent>;

  beforeEach(() => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({ imports: [UwChartLegendComponent] });
    fixture = TestBed.createComponent(UwChartLegendComponent);
  });

  it('renderiza um item por entrada com rótulo e valor', () => {
    fixture.componentRef.setInput('items', [
      { label: 'Pagas', value: 642, color: '#10b981' },
      { label: 'Pendentes', value: 87, color: '#f59e0b' },
    ]);
    fixture.detectChanges();

    const rows = fixture.nativeElement.querySelectorAll('.uw-chart-legend__row');
    expect(rows.length).toBe(2);
    expect(rows[0].textContent).toContain('Pagas');
    expect(rows[0].textContent).toContain('642');
  });

  it('aplica a cor em cada indicador', () => {
    fixture.componentRef.setInput('items', [{ label: 'PIX', value: 'R$ 1,00', color: '#7c3aed' }]);
    fixture.detectChanges();

    const dot: HTMLElement = fixture.nativeElement.querySelector('.uw-chart-legend__dot');
    expect(dot.style.background).toBe('rgb(124, 58, 237)');
  });
});
