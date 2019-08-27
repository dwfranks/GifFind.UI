import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { GifImage } from '../models/GifImage.model';

@Injectable({
  providedIn: 'root'
})
export class SavedimageService {

  constructor(private readonly http: HttpClient) { }

  saveImage(image: GifImage): Observable<GifImage> {
    return this.http.post<GifImage>(`${environment.apiUrl}/categories/${image.categoryid}/savedimages`, image);
  }

  deleteImage(categoryID: string, savedImageID: string): Observable<any> {
    return this.http.delete<any>(`${environment.apiUrl}/categories/${categoryID}/savedimages/${savedImageID}`);
  }
}
