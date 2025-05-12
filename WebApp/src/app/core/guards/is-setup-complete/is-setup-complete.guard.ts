import { CanActivateFn, Router } from '@angular/router'
import { inject } from '@angular/core'
import { AppStore } from '../../stores/app.store'

export const isSetupCompleteGuard: CanActivateFn = () => {
    const appStore = inject(AppStore)
    const router = inject(Router)
    const setupComplete = appStore.user.setupComplete()
    if (setupComplete) {
        console.log('[Guard] IsSetupCompleteGuard success')
        return true
    } else {
        console.log('[Guard] IsSetupCompleteGuard failed')
        return router.parseUrl('/setup')
    }
}
