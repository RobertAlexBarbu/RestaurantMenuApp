import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core'
import { NavigationEnd, NavigationError, Router, RouterOutlet } from '@angular/router'
import { AsyncPipe } from '@angular/common'
import { LoadingPageComponent } from './shared/components/loading-page/loading-page.component'
import { UserService } from './core/http/services/user/user.service'
import { AppStore } from './core/stores/app.store'
import { AuthService } from './core/services/auth/auth.service'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { catchError, race, switchMap, take, throwError, timer } from 'rxjs'
import { fadeInAnimation } from './app.animations'
import { MatIconRegistry } from '@angular/material/icon'
import { EnvironmentService } from './core/services/environment/environment.service'
import { ScrollService } from './core/services/scroll/scroll.service'
import { ActiveFeatureStore } from './core/stores/active-feature.store'

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, AsyncPipe, LoadingPageComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    animations: [fadeInAnimation],
    providers: [ActiveFeatureStore],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
    private readonly userService = inject(UserService)
    private readonly appStore = inject(AppStore)
    private readonly authService = inject(AuthService)
    private readonly iconRegistry = inject(MatIconRegistry)
    private readonly environmentService = inject(EnvironmentService)
    private readonly router = inject(Router)
    private readonly destroyRef = inject(DestroyRef)
    private readonly drawerContentService = inject(ScrollService)
    private readonly activeFeatureStore = inject(ActiveFeatureStore)
    loading = signal(true)

    constructor() {
        const startTime = Date.now()
        this.authService
            .isLoggedIn()
            .pipe(
                take(1),
                switchMap((loggedIn) => {
                    if (loggedIn) {
                        return race(
                            this.userService.get(),
                            timer(5000).pipe(
                                switchMap(() =>
                                    throwError(() => new Error('Timeout')),
                                ),
                            ),
                        ).pipe(
                            catchError((err) => {
                                console.log(err)
                                if (err.message === 'Timeout') {
                                    return this.userService.get() // Retry once
                                } else {
                                    return throwError(() => err)
                                }
                            }),
                        )
                    } else {
                        this.authService.logOut()
                        return this.authService.getRedirectResult()
                    }
                }),
                takeUntilDestroyed(),
            )
            .subscribe({
                next: (userDto) => {
                    const timeElapsed = Date.now() - startTime
                    this.appStore.logIn(userDto)
                    if (timeElapsed < 1000) {
                        setTimeout(() => {
                            this.loading.set(false)
                        }, 1000 - timeElapsed)
                    } else {
                        this.loading.set(false)
                    }
                },
                error: (err) => {
                    console.log(err)
                    const timeElapsed = Date.now() - startTime
                    if (timeElapsed < 1000) {
                        setTimeout(() => {
                            this.loading.set(false)
                        }, 1000 - timeElapsed)
                    } else {
                        this.loading.set(false)
                    }
                },
            })

        if (!this.environmentService.isDevelopment()) {
            this.router.events.subscribe((event) => {
                if (event instanceof NavigationError) {
                    console.error('Navigation Error:', event.error)
                    location.reload()
                }
            })
        }

        let previousUrl: string | null = null
        this.router.events
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe((event) => {
                const currentRoute = this.router.url
                if (event instanceof NavigationEnd) {
                    this.activeFeatureStore.setActiveFeatures(currentRoute)
                }

                if (event instanceof NavigationEnd) {
                    if (previousUrl === currentRoute) {
                        this.drawerContentService.scrollTop(true)
                    } else {
                        this.drawerContentService.scrollTop()
                    }
                    previousUrl = currentRoute
                }
            })

        const defaultFontSetClasses = this.iconRegistry.getDefaultFontSetClass()
        const outlinedFontSetClasses = defaultFontSetClasses
            .filter((fontSetClass) => fontSetClass !== 'material-icons')
            .concat(['material-symbols-rounded'])
        this.iconRegistry.setDefaultFontSetClass(...outlinedFontSetClasses)
    }
}
