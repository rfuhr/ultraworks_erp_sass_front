import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API_URL } from '@app/core';
import { map, type Observable } from 'rxjs';
import type { ExampleItem, ListResponse } from '../models/example-item.model';

@Injectable({ providedIn: 'root' })
export class ExampleRepository {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = inject(API_URL);

  list(): Observable<readonly ExampleItem[]> {
    return this.http
      .get<ListResponse<ExampleItem>>(`${this.apiUrl}/examples`)
      .pipe(map((response) => response.data));
  }
}
