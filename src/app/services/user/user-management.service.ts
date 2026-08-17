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
import { User } from '../../core/models/user/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserManagementService {
  private http = inject(HttpClient);

  private apiUrl = environment.base;

  constructor() {}
}
