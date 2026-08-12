import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environment/environment.prod';
import { ApiResponse } from '../../core/models/apiResponse.model';
import { VolunteerCategory } from '../../core/models/user/volunteer.model';
import { HighSchoolVolunteerRequest } from '../../core/models/user/high-school-volunteer.model';

@Injectable({
  providedIn: 'root',
})
export class VolunteerService {
  private readonly http = inject(HttpClient);

  private readonly apiUrl = environment.base;

  /**
   * Get all volunteer categories
   */
  getAllCategories(): Observable<ApiResponse<VolunteerCategory[]>> {
    return this.http.get<ApiResponse<VolunteerCategory[]>>(`${this.apiUrl}api/categories`);
  }

  //   /**
  //    * Get volunteer by id
  //    */
  getById(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}api/session/highschool/volunteer`);
  }

  //   /**
  //    * Get volunteer by page url
  //    */
  //   getByPageUrl(pageUrl: string): Observable<ApiResponse<Volunteer>> {
  //     return this.http.get<ApiResponse<Volunteer>>(`${this.apiUrl}/page/${pageUrl}`);
  //   }

  //   /**
  //    * Get by display location
  //    * Example : Header, Footer
  //    */
  //   getByDisplay(displayAt: string): Observable<ApiResponse<Volunteer[]>> {
  //     const params = new HttpParams().set('displayAt', displayAt);

  //     return this.http.get<ApiResponse<Volunteer[]>>(this.apiUrl, {
  //       params,
  //     });
  //   }

  //   /**
  //    * Search volunteer pages
  //    */
  //   search(keyword: string): Observable<ApiResponse<Volunteer[]>> {
  //     const params = new HttpParams().set('search', keyword);

  //     return this.http.get<ApiResponse<Volunteer[]>>(`${this.apiUrl}/search`, {
  //       params,
  //     });
  //   }

  /**
   * Create Volunteer
   */
  createHighSchoolVolunteer(request: HighSchoolVolunteerRequest): Observable<ApiResponse<null>> {
    return this.http.post<ApiResponse<null>>(
      `${this.apiUrl}api/user/high/school/volunteer/create`,
      request,
    );
  }

  //   /**
  //    * Update Volunteer
  //    */
  updateVolunteer(id: string, payload: HighSchoolVolunteerRequest): Observable<ApiResponse<null>> {
    return this.http.put<ApiResponse<null>>(
      `${this.apiUrl}api/user/high/school/volunteer/update/${id}`,
      payload,
    );
  }

  //   /**
  //    * Delete Volunteer
  //    */
  //   delete(id: string): Observable<ApiResponse<void>> {
  //     return this.http.delete<ApiResponse<void>>(`${this.apiUrl}/${id}`);
  //   }
}
