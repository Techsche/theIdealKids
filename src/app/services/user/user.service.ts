// services/user.service.ts

import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../core/models/apiResponse.model';
import { environment } from '../../../environment/environment.prod';
import { CreateUserRequest } from '../../core/models/user/signup.models';
import { IUserProfile } from '../../core/models/user/profile.model';
import { ILocation } from '../../core/models/user/location.model';
import {
  ChangePasswordRequest,
  ChangePasswordResponse,
} from '../../core/models/user/change-password.model';
import { Children } from '../../core/models/user/children.model';

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

  getProfile() {
    return this.http.get<IUserProfile>(`${this.apiUrl}api/session/user`);
  }

  getLocations() {
    return this.http.get<ILocation[]>(`${this.apiUrl}api/locations`);
  }

  updateProfile(payload: any, userId: string) {
    return this.http.put<any>(`${environment.base}api/user/update/${userId}`, payload);
  }

  changePassword(request: ChangePasswordRequest): Observable<ChangePasswordResponse> {
    return this.http.post<ChangePasswordResponse>(
      `${this.apiUrl}api/session/user/change/password`,
      request,
    );
  }
}
