import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideApiUrl } from '@app/core';
import { ExampleRepository } from './example.repository';

describe('ExampleRepository', () => {
  let repository: ExampleRepository;
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideApiUrl('https://api.example.com/api/v1'),
      ],
    });

    repository = TestBed.inject(ExampleRepository);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpTesting.verify());

  it('deve listar itens a partir de data', () => {
    repository.list().subscribe((items) => {
      expect(items).toHaveLength(1);
      expect(items[0]?.title).toBe('Exemplo');
    });

    const request = httpTesting.expectOne('https://api.example.com/api/v1/examples');
    expect(request.request.method).toBe('GET');
    request.flush({ data: [{ id: '1', title: 'Exemplo' }] });
  });
});
