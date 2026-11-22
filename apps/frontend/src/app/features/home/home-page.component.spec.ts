import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideTranslateService } from '@ngx-translate/core';
import { HomePageComponent } from './home-page.component';

describe('HomePageComponent', () => {
  let fixture: ComponentFixture<HomePageComponent>;
  let component: HomePageComponent;

  const waitForDemo = () => new Promise((resolve) => setTimeout(resolve, 350));

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomePageComponent],
      providers: [provideRouter([]), provideTranslateService()],
    }).compileComponents();

    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.componentInstance;
  });

  it('deve exibir carregamento e depois o conteudo', async () => {
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('home.loading');

    await waitForDemo();
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('home.items.design.title');
    expect(component.state()).toBe('success');
  });

  it('deve exibir erro e permitir tentar novamente', async () => {
    fixture.detectChanges();

    component.load('error');
    await waitForDemo();
    fixture.detectChanges();

    expect(component.state()).toBe('error');
    expect(fixture.nativeElement.textContent).toContain('home.error.title');
    expect(fixture.nativeElement.textContent).toContain('home.error.retry');
  });

  it('deve exibir estado vazio', async () => {
    fixture.detectChanges();

    component.load('empty');
    await waitForDemo();
    fixture.detectChanges();

    expect(component.state()).toBe('empty');
    expect(fixture.nativeElement.textContent).toContain('home.empty.title');
  });
});
