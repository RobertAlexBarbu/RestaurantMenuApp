import { CanActivateFn, Router } from '@angular/router'
import { inject } from '@angular/core'
import { AppStore } from '../../stores/app.store'
import { filter, first, map } from 'rxjs'
import { toObservable } from '@angular/core/rxjs-interop'

export const isAuthGuard: CanActivateFn = () => {
    const appStore = inject(AppStore)
    const router = inject(Router)
    return toObservable(appStore.loggedIn).pipe(
        filter((loggedIn) => loggedIn !== null),
        first(),
        map((loggedIn) => {
            if (loggedIn) {
                console.log('[Guard] IsAuthGuard success')
                return true
            } else {
                console.log('[Guard] IsAuthGuard failed')
                return router.parseUrl('/auth')
            }
        }),
    )
}
