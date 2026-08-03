import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../../services/user/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  // Public APIs - Skip Authorization header
  const publicUrls = [
    '/api/home-banner', // <-- change to your actual banner endpoint
    '/api/user/login',
    '/api/user/register',
    '/api/user/forgot/password',
    '/api/categories',
  ];

  const isPublic = publicUrls.some((url) => req.url.includes(url));

  if (isPublic) {
    return next(req);
  }

  const token = authService.getToken();
  if (token) {
    req = req.clone({
      setHeaders: {
        'x-auth-token': token,
      },
    });
  }

  return next(req);
};
