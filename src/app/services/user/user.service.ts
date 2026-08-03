// services/user.service.ts

import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../core/models/apiResponse.model';
import { environment } from '../../../environment/environment.prod';
import { CreateUserRequest } from '../../core/models/user/signup.models';

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
}
