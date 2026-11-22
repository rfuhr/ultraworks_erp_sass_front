import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideTranslateService } from '@ngx-translate/core';
import { NotFoundComponent } from './not-found.component';

describe('NotFoundComponent', () => {
  it('deve exibir a mensagem e o link de retorno', async () => {
    await TestBed.configureTestingModule({
      imports: [NotFoundComponent],
      providers: [provideRouter([]), provideTranslateService()],
    }).compileComponents();

    const fixture = TestBed.createComponent(NotFoundComponent);
    fixture.detectChanges();

    const text = fixture.nativeElement.textContent as string;
    expect(text).toContain('404');
    expect(text).toContain('notFound.title');
    expect(text).toContain('notFound.back');
  });
});
