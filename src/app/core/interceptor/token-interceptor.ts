import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, EMPTY, Observable, tap } from "rxjs";

@Injectable()
export class MyInterceptor implements HttpInterceptor {
  constructor( private router: Router) { }
  //function which will be called for all http calls
  intercept(request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const segments = this.router.url.split('/');
    const firstPosition = segments[1];
    const userData = JSON.parse(localStorage.getItem("user") || 'false');
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    if (userData) {
      const commonHeaders = {
        'Authorization': `Bearer ${userData.token}`,
        'user': `${userData}`,
      };
        request = request.clone({
          setHeaders: commonHeaders
        });
    }



    return next.handle(request).pipe(
      tap(() => { }
        , error => {

          //logging the http response to browser's console in case of a failuer
          if (error instanceof HttpErrorResponse && error.status === 401 && firstPosition !== 'auth') {
            if (!userData.token) {
              this.logout();
              return;
            }

            const authorizationReload = JSON.parse(sessionStorage.getItem('authorizationReload') || 'false');
            if (!authorizationReload) {
              sessionStorage.setItem('authorizationReload', 'true');
              window.location.reload();
            } else {
              this.logout();
            }
          }

        }
      ),

      catchError((err: any) => {
        if (firstPosition != 'auth' && !userData) {
          return EMPTY;
        }
        else {
          throw err;
        }
      })
    )
  }

    logout() {
    this.router.navigateByUrl('auth/login').then(() => {
      window.location.reload();
    });
    localStorage.clear();
    sessionStorage.clear()
    // this.dataService.customSnackBar(' Please log in again', 'Session Expired', 'error');
  }
}
