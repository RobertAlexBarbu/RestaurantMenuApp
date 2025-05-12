import { CanActivateFn, Router } from '@angular/router'
import { inject } from '@angular/core'
import { AppStore } from '../../stores/app.store'
import { filter, first, map } from 'rxjs'
import { toObservable } from '@angular/core/rxjs-interop'

export const isNotAuthGuard: CanActivateFn = () => {
    const appStore = inject(AppStore)
    const router = inject(Router)
    return toObservable(appStore.loggedIn).pipe(
        filter((loggedIn) => loggedIn !== null),
        first(),
        map((loggedIn) => {
            if (loggedIn) {
                console.log('[Guard] IsNotAuthGuard fail')
                return router.parseUrl('')
            } else {
                console.log('[Guard] IsNotAuthGuard success')
                return true
            }
        }),
    )
}
