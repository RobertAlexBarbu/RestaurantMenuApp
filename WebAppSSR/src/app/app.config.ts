import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import {provideRouter, withRouterConfig} from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import {provideHttpClient} from "@angular/common/http";
import {provideAnimationsAsync} from "@angular/platform-browser/animations/async";

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes,
      withRouterConfig({ onSameUrlNavigation: 'reload' })), provideClientHydration(withEventReplay()), provideHttpClient(),         provideAnimationsAsync(),
  ],
};
