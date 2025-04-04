// src/app/app.config.ts
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes'; // Make sure this exists

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes)
  ]
};
