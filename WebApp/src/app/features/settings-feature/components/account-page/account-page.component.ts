import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core'
import { fadeInAnimation, pageLoadAnimation } from '../../../../app.animations'

import { AppStore } from '../../../../core/stores/app.store'
import { AsyncPipe } from '@angular/common'

import { BehaviorSubject } from 'rxjs'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { MatCard } from '@angular/material/card'
import { MatButton, MatIconButton } from '@angular/material/button'
import { MatIcon } from '@angular/material/icon'
import { MatSlideToggle } from '@angular/material/slide-toggle'
import { MatListOption, MatSelectionList } from '@angular/material/list'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatDialog } from '@angular/material/dialog'
import {
    ConfigureEmailAndPasswordDialogComponent,
} from '../configure-email-and-password-dialog/configure-email-and-password-dialog.component'
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu'

import { UpdateEmailDialogComponent } from '../update-email-dialog/update-email-dialog.component'
import { DeleteAccountDialogComponent } from '../delete-account-dialog/delete-account-dialog.component'
import { UpdatePasswordDialogComponent } from '../update-password-dialog/update-password-dialog.component'
import { MatProgressSpinner } from '@angular/material/progress-spinner'

import { MatError, MatFormField, MatLabel } from '@angular/material/form-field'
import { MatInput } from '@angular/material/input'
import { CardComponent } from '../../../../shared/components/card/card.component'
import { AuthService } from '../../../../core/services/auth/auth.service'
import { NotificationService } from '../../../../core/services/notification/notification.service'
import { ErrorService } from '../../../../core/services/error/error.service'
import { EnvironmentService } from '../../../../core/services/environment/environment.service'
import { ScrollService } from '../../../../core/services/scroll/scroll.service'
import { ThemeService } from '../../../../core/services/theme/theme.service'
import {
    EditableImageComponent,
} from '../../../../shared/components/editable-image/editable-image/editable-image.component'
import { ToolbarComponent } from '../../../../shared/components/toolbar/toolbar.component'

@Component({
    selector: 'app-account-page',
    standalone: true,
    imports: [
        EditableImageComponent,
        AsyncPipe,
        MatCard,
        MatIconButton,
        MatIcon,
        MatButton,
        MatSlideToggle,
        MatSelectionList,
        MatListOption,
        FormsModule,
        ReactiveFormsModule,
        MatMenu,
        MatMenuItem,
        MatMenuTrigger,
        MatProgressSpinner,
        CardComponent,
        MatError,
        MatFormField,
        MatInput,
        MatLabel,
        ToolbarComponent,
    ],
    templateUrl: './account-page.component.html',
    styleUrl: './account-page.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [fadeInAnimation, pageLoadAnimation],
})
export class AccountPageComponent {
    private readonly appStore = inject(AppStore)

    private readonly dialog = inject(MatDialog)
    private readonly auth = inject(AuthService)
    private readonly destroyRef = inject(DestroyRef)
    private readonly notificationService = inject(NotificationService)
    private readonly errorService = inject(ErrorService)
    private readonly environmentService = inject(EnvironmentService)
    private readonly drawerContentService = inject(ScrollService)
    private readonly themeService = inject(ThemeService)
    user = this.appStore.user

    loadingGoogleButton$ = new BehaviorSubject<boolean>(false)
    theme$ = new BehaviorSubject('')
    unlinking$ = new BehaviorSubject<boolean>(false)


    constructor() {
        if (this.themeService.isLightTheme()) {
            this.theme$.next('light')
        } else {
            this.theme$.next('dark')
        }


        // Google Account Linking
        const redirectLink = sessionStorage.getItem('redirectLink')
        if (redirectLink) {
            console.log('Linking with Redirect')
            const scrollPosition = sessionStorage.getItem('scrollPosition')
            this.loadingGoogleButton$.next(true)
            this.auth
                .getRedirectLinkResult()
                .pipe(takeUntilDestroyed())
                .subscribe({
                    next: () => {
                        // Scroll to the saved position if available
                        if (scrollPosition !== null) {
                            this.drawerContentService.scrollTo(
                                Number(scrollPosition),
                            )
                        }
                        sessionStorage.removeItem('redirectLink')
                        this.loadingGoogleButton$.next(false)
                    },
                    error: (err) => {
                        // Handle errors, show error message, and clean up sessionStorage
                        if (scrollPosition !== null) {
                            this.drawerContentService.scrollTo(
                                Number(scrollPosition),
                            )
                        }

                        this.errorService.handleError(err)
                        this.loadingGoogleButton$.next(false)
                        sessionStorage.removeItem('redirectLink')
                    },
                })
        }
    }

    configureEmailAndPassword(): void {
        this.dialog.open(ConfigureEmailAndPasswordDialogComponent, {
            autoFocus: false,
        })
    }


    openChangePasswordDialog(email: string) {
        this.dialog.open(UpdatePasswordDialogComponent, {
            autoFocus: false,
            data: { email },
        })
    }

    openChangeEmailDialog(email: string) {
        this.dialog.open(UpdateEmailDialogComponent, {
            autoFocus: false,
            data: {
                email,
            },
        })
    }

    openDeleteAccountDialog() {
        this.dialog.open(DeleteAccountDialogComponent, {
            autoFocus: false,
        })
    }

    unlinkGoogleAccount(): void {
        this.unlinking$.next(true)
        this.auth
            .unlinkGoogleAccount()
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
                next: () => {
                    this.notificationService.notify(
                        'Google Account Unlinked Successfully.',
                    )
                    this.unlinking$.next(false)
                },
                error: (err) => {
                    this.errorService.handleError(err)
                    this.unlinking$.next(false)
                },
            })
    }

    linkGoogleAccount() {
        if (this.environmentService.getRedirectAuth()) {
            sessionStorage.setItem('redirectLink', 'true')
            sessionStorage.setItem(
                'scrollPosition',
                '' + this.drawerContentService.getCurrentScrollPosition(),
            )
            this.auth.linkGoogleAccountWithRedirect()
        } else {
            this.auth
                .linkGoogleAccountWithPopup()
                .pipe(takeUntilDestroyed(this.destroyRef))
                .subscribe({
                    next: () => {
                        this.notificationService.notify(
                            'Google Account Linked Successfully.',
                        )
                    },
                    error: (err) => {
                        console.log(err)
                        this.errorService.handleError(err)
                    },
                })
        }
    }


}
