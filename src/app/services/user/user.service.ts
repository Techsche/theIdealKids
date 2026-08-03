// services/user.service.ts

import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../core/models/apiResponse.model';
import { environment } from '../../../environment/environment.prod';
import { CreateUserRequest } from '../../core/models/user/signup.models';
import { RegisteredEvent } from '../../core/models/user/registered-event.model';
import { IUserProfile } from '../../core/models/user/profile.model';
import { ILocation } from '../../core/models/user/location.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);

  private apiUrl = environment.base;

  constructor() {}

  createUser(request: CreateUserRequest): Observable<ApiResponse<null>> {
    return this.http.post<ApiResponse<null>>(`${this.apiUrl}api/user/create`, request);
  }

  getMyEvents(): Observable<RegisteredEvent[]> {
    return this.http.get<RegisteredEvent[]>(`${this.apiUrl}api/session/user/registered/event`);
  }

  getProfile() {
    return this.http.get<IUserProfile>(`${this.apiUrl}api/session/user`);
  }

  getLocations() {
    return this.http.get<ILocation[]>(`${this.apiUrl}api/locations`);
  }

  updateProfile(payload: any, userId: string) {
    return this.http.put<any>(`${environment.base}api/user/update/${userId}`, payload);
  }
}
