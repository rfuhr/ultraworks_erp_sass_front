import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { provideRouter } from '@angular/router';
import { provideTranslateService } from '@ngx-translate/core';
import { ToastService } from '@app/uw-ui';
import { HomePageComponent } from './home-page.component';
import { HomeDashboardService } from './home-dashboard.service';

describe('HomePageComponent', () => {
  let fixture: ComponentFixture<HomePageComponent>;
  let component: HomePageComponent;
  let dashboard: HomeDashboardService;
  let queryState: string | null;

  const flush = () => new Promise((resolve) => setTimeout(resolve, 0));

  beforeEach(async () => {
    queryState = null;

    await TestBed.configureTestingModule({
      imports: [HomePageComponent],
      providers: [
        provideRouter([]),
        provideTranslateService(),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              queryParamMap: {
                get: (key: string) => (key === 'state' ? queryState : null),
              },
            },
          },
        },
      ],
    }).compileComponents();

    dashboard = TestBed.inject(HomeDashboardService);
    dashboard.latencyMs = 0;
  });

  function createComponent(): void {
    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }

  it('inicia no estado de carregamento', () => {
    createComponent();

    expect(component.state()).toBe('loading');
    expect(fixture.nativeElement.textContent).toContain('home.states.loading');
  });

  it('renderiza os indicadores no sucesso', async () => {
    createComponent();
    await flush();
    fixture.detectChanges();

    expect(component.state()).toBe('success');
    expect(fixture.nativeElement.textContent).toContain('home.metrics.projects');
    expect(fixture.nativeElement.textContent).toContain('home.activity.report.title');
  });

  it('renderiza o estado vazio via query param', async () => {
    queryState = 'empty';
    createComponent();
    await flush();
    fixture.detectChanges();

    expect(component.state()).toBe('empty');
    expect(fixture.nativeElement.textContent).toContain('home.activities.empty.title');
  });

  it('renderiza o erro e permite tentar novamente', async () => {
    queryState = 'error';
    createComponent();
    await flush();
    fixture.detectChanges();

    expect(component.state()).toBe('error');
    expect(fixture.nativeElement.textContent).toContain('home.error.description');

    component.retry();
    await flush();
    fixture.detectChanges();

    expect(component.state()).toBe('success');
  });

  it('exibe toast nas ações demonstrativas', () => {
    createComponent();

    component.onDemoAction();

    expect(TestBed.inject(ToastService).toasts()[0]?.message).toBe('home.demo.action');
  });
});
