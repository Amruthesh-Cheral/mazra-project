import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MyInterceptor } from './core/interceptor/token-interceptor';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),

    importProvidersFrom(
      BrowserModule,
      MatNativeDateModule,
      BrowserAnimationsModule ,
      MatSnackBarModule
    ),
    provideClientHydration(),
      {
            provide: HTTP_INTERCEPTORS,
            useClass: MyInterceptor,
            multi: true,
      },
  ]
};
