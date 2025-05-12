import { HttpInterceptorFn } from '@angular/common/http'
import { switchMap } from 'rxjs'
import { inject } from '@angular/core'
import { AuthService } from '../../../services/auth/auth.service'


export const jwtInterceptor: HttpInterceptorFn = (request, next) => {
    const authService = inject(AuthService)
    return authService.getIdToken().pipe(
        switchMap((token) => {
            if (token) {
                console.log(
                    '[JWT Interceptor] Successfully retrieved Id Token: Sending Request',
                )
                request = request.clone({
                    setHeaders: { Authorization: `Bearer ${token}` },
                })
                return next(request)
            } else {
                console.log(
                    '[JWT Interceptor] Couldn\'t get Id Token: Sending Request',
                )
                return next(request)
            }
        }),
    )
}
