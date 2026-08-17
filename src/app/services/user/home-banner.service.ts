// src/app/services/banner.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environment/environment';
import { IBanner } from '../../core/models/user/home-banner.model';

@Injectable({
  providedIn: 'root',
})
export class HomeBannerService {
  private apiUrl = environment.base;

  constructor(private http: HttpClient) {}

  // Fetch only enabled banners, sorted by sort_order
  getBanners(): Observable<IBanner[]> {
    return this.http
      .get<IBanner[]>(`${this.apiUrl}api/home-banner`)
      .pipe(
        map((banners) =>
          banners.filter((b) => b.is_enable).sort((a, b) => a.sort_order - b.sort_order),
        ),
      );
  }

  getAllBanners(): Observable<IBanner[]> {
    return this.http.get<IBanner[]>(`${this.apiUrl}api/home-banner`);
  }

  updateBanner(bannerId: string, banner: IBanner) {
    return this.http.put(`${this.apiUrl}api/admin/session/home-banner/update/${bannerId}`, banner);
  }

  deleteBanner(bannerId: string) {
    return this.http.delete(`${this.apiUrl}api/admin/session/home-banner/delete/${bannerId}`);
  }

  addBanner(formData: FormData) {
    return this.http.post(`${this.apiUrl}api/admin/session/home-banner/create`, formData);
  }
}
