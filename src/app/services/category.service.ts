import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private readonly http: HttpClient) { }

  getCategories(userId: string): Observable<Category[]> {

    const params = new HttpParams()
      .set('userId', userId);

    return this.http.get<Category[]>(`${environment.apiUrl}/categories`, { params });
  }

  addCategory(category: Category): Observable<any> {

    return this.http.post<any>(`${environment.apiUrl}/categories`, category);
  }
}
