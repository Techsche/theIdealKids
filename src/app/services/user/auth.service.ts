import { Injectable, inject, PLATFORM_ID, signal } from '@angular/core';
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

  readonly isLoggedIn = signal(false);
  readonly userName = signal('');

  private api = environment.base;

  constructor() {
    this.restoreSession();
  }

  private get isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  private restoreSession(): void {
    if (!this.isBrowser) return;

    const token = localStorage.getItem('token');
    const name = localStorage.getItem('name');

    this.isLoggedIn.set(!!token);
    this.userName.set(name ?? '');
  }

  login(payload: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.api}api/user/login`, payload).pipe(
      tap((res) => {
        if (res.success && res.token && this.isBrowser) {
          localStorage.setItem('token', res.token);
          localStorage.setItem('name', res.name ?? '');
          localStorage.setItem('roles', JSON.stringify(res.roles ?? []));

          this.isLoggedIn.set(true);
          this.userName.set(res.name ?? '');
        }
      }),
    );
  }

  logout(): void {
    if (this.isBrowser) {
      localStorage.clear();
      sessionStorage.clear();
    }

    this.isLoggedIn.set(false);
    this.userName.set('');
  }

  forgotPassword(payload: ForgotPasswordRequest): Observable<ForgotPasswordResponse> {
    return this.http.post<ForgotPasswordResponse>(`${this.api}api/user/forgot/password`, payload);
  }

  getToken(): string | null {
    if (!this.isBrowser) return null;

    return localStorage.getItem('token');
  }

  getRoles(): string[] {
    if (!this.isBrowser) return [];

    return JSON.parse(localStorage.getItem('roles') || '[]');
  }
}
