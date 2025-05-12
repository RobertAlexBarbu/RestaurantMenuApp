import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core'
import { MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog'
import { MatButton } from '@angular/material/button'

import { Router } from '@angular/router'

import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { BehaviorSubject } from 'rxjs'
import { AsyncPipe } from '@angular/common'
import { AuthService } from '../../../../core/services/auth/auth.service'
import { AppStore } from '../../../../core/stores/app.store'
import { NotificationService } from '../../../../core/services/notification/notification.service'
import { ErrorService } from '../../../../core/services/error/error.service'

@Component({
    selector: 'app-delete-account-dialog',
    standalone: true,
    imports: [
        MatButton,
        MatDialogTitle,
        MatDialogContent,
        MatDialogActions,
        AsyncPipe,
    ],
    templateUrl: './delete-account-dialog.component.html',
    styleUrl: './delete-account-dialog.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteAccountDialogComponent {
    private readonly authService = inject(AuthService)
    private readonly appStore = inject(AppStore)
    private readonly destroyRef = inject(DestroyRef)
    private readonly router: Router = inject(Router)
    private readonly notificationService = inject(NotificationService)
    private readonly errorService = inject(ErrorService)
    readonly dialogRef = inject(MatDialogRef<DeleteAccountDialogComponent>)
    loading$ = new BehaviorSubject(false)

    onNoClick(): void {
        this.dialogRef.close()
    }

    delete() {
        this.loading$.next(true)
        this.authService
            .deleteAccount()
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
                next: () => {
                    this.loading$.next(false)
                    this.notificationService.notify(
                        'Account Deleted Successfully.',
                    )
                    this.appStore.logOut()
                    this.router.navigate(['/auth/login'])
                    this.dialogRef.close()
                },
                error: (err) => {
                    this.loading$.next(false)
                    this.errorService.handleError(err)
                    this.dialogRef.close()
                },
            })
    }
}
