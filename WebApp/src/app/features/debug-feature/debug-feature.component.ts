import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { AsyncPipe, DatePipe, JsonPipe } from '@angular/common'
import { MatButton, MatIconButton } from '@angular/material/button'
import { BehaviorSubject } from 'rxjs'
import { AppStore } from '../../core/stores/app.store'
import { DebugService } from '../../core/http/services/debug/debug.service'
import { MatCard, MatCardHeader, MatCardSubtitle } from '@angular/material/card'
import { CdkCopyToClipboard } from '@angular/cdk/clipboard'
import { MatTooltip } from '@angular/material/tooltip'
import { NotificationService } from '../../core/services/notification/notification.service'
import { AuthService } from '../../core/services/auth/auth.service'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { MatIcon } from '@angular/material/icon'
import { fadeInAnimation, pageLoadAnimation } from '../../app.animations'
import { ToolbarComponent } from '../../shared/components/toolbar/toolbar.component'
import { CardComponent } from '../../shared/components/card/card.component'

@Component({
    selector: 'app-debug-feature',
    standalone: true,
    imports: [
        AsyncPipe,
        MatButton,
        MatCard,
        MatCardHeader,
        MatCardSubtitle,
        CdkCopyToClipboard,
        MatTooltip,
        MatIconButton,
        MatIcon,
        ToolbarComponent,
        CardComponent,
        JsonPipe,
        DatePipe,
    ],
    templateUrl: './debug-feature.component.html',
    styleUrl: './debug-feature.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [fadeInAnimation, pageLoadAnimation],
})
export class DebugFeatureComponent {
    private readonly appStore = inject(AppStore)
    private readonly testService = inject(DebugService)

    private readonly notificationService = inject(NotificationService)
    private readonly auth = inject(AuthService)
    protected readonly localStorage = localStorage
    unprotectedResult$ = new BehaviorSubject<string>('')
    protectedResult$ = new BehaviorSubject<string>('')
    adminProtectedResult$ = new BehaviorSubject<string>('')
    longRequestResult$ = new BehaviorSubject<string>('')
    user = this.appStore.user
    accessToken$ = new BehaviorSubject<string>('')

    constructor() {
        this.auth
            .getIdToken()
            .pipe(takeUntilDestroyed())
            .subscribe((token) => {
                this.accessToken$.next(token!)
            })
    }


    copyToClipboard() {
        this.notificationService.notify('Content copied.')
    }

    removeAccessToken() {
        localStorage.removeItem('access')
    }

    removeRefreshToken() {
        localStorage.removeItem('refresh')
    }

    makeLongRequest() {
        this.longRequestResult$.next('Pending...')
        this.testService.longRequest().subscribe({
            next: () => {
                this.longRequestResult$.next('Success')
            },
            error: (err) => {
                this.longRequestResult$.next('Error')
                console.log(err)
            },
        })
    }

    makeProtectedRequest() {
        this.protectedResult$.next('Pending...')
        this.testService.getProtected().subscribe({
            next: () => {
                this.protectedResult$.next('Success')
            },
            error: (err) => {
                this.protectedResult$.next('Error')
                console.log(err)
            },
        })
    }

    makeAdminProtectedRequest() {
        this.adminProtectedResult$.next('Pending...')
        this.testService.getAdminProtected().subscribe({
            next: () => {
                this.adminProtectedResult$.next('Success')
            },
            error: (err) => {
                this.adminProtectedResult$.next('Error')
                console.log(err)
            },
        })
    }

    makeUnprotectedRequest() {
        this.unprotectedResult$.next('Pending...')
        this.testService.getUnprotected().subscribe({
            next: () => {
                this.unprotectedResult$.next('Success')
            },
            error: () => {
                this.unprotectedResult$.next('Error')
            },
        })
    }
}
