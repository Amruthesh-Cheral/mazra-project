import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, EMPTY } from 'rxjs';

@Injectable()
export class MyInterceptor implements HttpInterceptor {
  constructor(private router: Router) { console.log('Interceptor loaded!');}

intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  const segments = this.router.url.split('/');
  const firstPosition = segments[1];

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : '';

  if (token) {
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  return next.handle(request).pipe(
    catchError((error: any) => {
      if (
        error instanceof HttpErrorResponse &&
        error.status === 401 &&
        firstPosition !== 'auth'
      ) {
        const authorizationReload = typeof window !== 'undefined'
          ? JSON.parse(sessionStorage.getItem('authorizationReload') || 'false')
          : false;

        if (!token) {
          this.logout();
          return EMPTY;
        }

        if (!authorizationReload) {
          if (typeof window !== 'undefined') {
            sessionStorage.setItem('authorizationReload', 'true');
            window.location.reload();
          }
          return EMPTY;
        } else {
          this.logout();
          return EMPTY;
        }
      }

      if (firstPosition !== 'auth' && !token) {
        return EMPTY;
      }

      throw error;
    })
  );
}


  logout() {
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigateByUrl('auth/login').then(() => {
      window.location.reload();
    });
  }
}
