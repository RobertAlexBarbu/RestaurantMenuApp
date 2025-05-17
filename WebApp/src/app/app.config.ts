import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core'
import {
    PreloadAllModules,
    provideRouter,
    withInMemoryScrolling,
    withPreloading,
    withRouterConfig,
} from '@angular/router'
import { routes } from './app.routes'
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'
import { provideHttpClient, withInterceptors } from '@angular/common/http'

import { MAT_AUTOCOMPLETE_SCROLL_STRATEGY } from '@angular/material/autocomplete'
import { MAT_SELECT_SCROLL_STRATEGY } from '@angular/material/select'
import { jwtInterceptor } from './core/http/interceptors/jwt/jwt.interceptor'
import { errorInterceptor } from './core/http/interceptors/error/error.interceptor'
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field'
import { Overlay, ScrollStrategy, ScrollStrategyOptions } from '@angular/cdk/overlay'
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog'
import {MenuFeatureStore} from "./core/stores/menu-feature.store";

export const appConfig: ApplicationConfig = {
    providers: [
        MenuFeatureStore,
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideAnimationsAsync(),
        provideHttpClient(withInterceptors([jwtInterceptor, errorInterceptor])),
        provideRouter(
            routes,
            withRouterConfig({ onSameUrlNavigation: 'reload' }),
            withInMemoryScrolling({
                scrollPositionRestoration: 'top',
                anchorScrolling: 'enabled',
            }),
            withPreloading(PreloadAllModules),
        ),
        {
            provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
            useValue: { appearance: 'outline' },
        },
        {
            provide: MAT_DIALOG_DEFAULT_OPTIONS,
            useValue: {
                autoFocus: false,
                exitAnimationDuration: '0ms',
                enterAnimationDuration: '0ms',
                restoreFocus: false,

            },
        },
    ],
}

const scrollStrategyConfigs = [
    {
        provide: MAT_AUTOCOMPLETE_SCROLL_STRATEGY,
        useFactory: (scrollStrategyOptions: ScrollStrategyOptions) =>
            scrollStrategyOptions.close,
        deps: [ScrollStrategyOptions],
    },
    {
        provide: MAT_SELECT_SCROLL_STRATEGY,
        useFactory: (scrollStrategyOptions: ScrollStrategyOptions) =>
            scrollStrategyOptions.reposition,
        deps: [ScrollStrategyOptions],
    },
    {
        provide: MAT_SELECT_SCROLL_STRATEGY,
        useFactory: customScrollStrategyFactory,
        deps: [Overlay],
    },
]

export function customScrollStrategyFactory(
    overlay: Overlay,
): () => ScrollStrategy {
    return () => overlay.scrollStrategies.reposition()
}
