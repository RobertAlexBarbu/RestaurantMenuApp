import { CanActivateFn, Router } from '@angular/router'
import { Role } from '../../../shared/configs/Role'
import { inject } from '@angular/core'
import { AppStore } from '../../stores/app.store'

export const isRoleGuard = (role: Role, redirectUrl: string): CanActivateFn => {
    return () => {
        console.log(`[Guard] IsRoleGuard(${role}) runs`)
        const appStore = inject(AppStore)
        const router = inject(Router)
        const currentRole = appStore.user.role()
        if (currentRole === role) {
            console.log(`[Guard] IsRoleGuard(${role}) success`)
            return true
        } else {
            console.log(`[Guard] IsRoleGuard(${role}) failed`)
            return router.parseUrl(redirectUrl)
        }
    }
}
