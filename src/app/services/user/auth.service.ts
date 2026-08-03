import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { Observable, tap } from 'rxjs';

import { environment } from '../../../environment/environment';
import { LoginRequest, LoginResponse } from '../../core/models/user/login.model';
import {
  ForgotPasswordRequest,
  ForgotPasswordResponse,
} from '../../core/models/user/forgot-password.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private platformId = inject(PLATFORM_ID);

  private api = environment.base;

  private get isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  login(payload: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.api}api/user/login`, payload).pipe(
      tap((res) => {
        if (res.success && res.token && this.isBrowser) {
          localStorage.setItem('token', res.token);
          localStorage.setItem('name', res.name ?? '');
          localStorage.setItem('roles', JSON.stringify(res.roles ?? []));
        }
      }),
    );
  }

  logout(): void {
    if (this.isBrowser) {
      localStorage.clear();
      sessionStorage.clear(); // optional
    }
  }

  forgotPassword(payload: ForgotPasswordRequest): Observable<ForgotPasswordResponse> {
    return this.http.post<ForgotPasswordResponse>(`${this.api}api/user/forgot/password`, payload);
  }

  getToken(): string | null {
    if (!this.isBrowser) {
      return null;
    }

    return localStorage.getItem('token');
  }

  getRoles(): string[] {
    if (!this.isBrowser) {
      return [];
    }

    return JSON.parse(localStorage.getItem('roles') || '[]');
  }

  getName(): string {
    if (!this.isBrowser) {
      return '';
    }

    return localStorage.getItem('name') || '';
  }

  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }
}
