import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core'
import { AsyncPipe } from '@angular/common'
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'
import { MatButton, MatIconButton } from '@angular/material/button'
import {
    MAT_DIALOG_DATA,
    MatDialogActions,
    MatDialogContent,
    MatDialogRef,
    MatDialogTitle,
} from '@angular/material/dialog'
import { MatError, MatFormField, MatLabel, MatSuffix } from '@angular/material/form-field'
import { MatInput } from '@angular/material/input'
import { MatIcon } from '@angular/material/icon'
import { BehaviorSubject } from 'rxjs'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { AuthService } from '../../../../core/services/auth/auth.service'
import { ErrorService } from '../../../../core/services/error/error.service'
import { NotificationService } from '../../../../core/services/notification/notification.service'

@Component({
    selector: 'app-update-password-dialog',
    standalone: true,
    imports: [
        AsyncPipe,
        FormsModule,
        MatButton,
        MatDialogActions,
        MatDialogContent,
        MatDialogTitle,
        ReactiveFormsModule,
        MatFormField,
        MatInput,
        MatIconButton,
        MatIcon,
        MatLabel,
        MatError,
        MatIcon,
        MatIconButton,
        MatSuffix,
    ],
    templateUrl: './update-password-dialog.component.html',
    styleUrl: './update-password-dialog.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdatePasswordDialogComponent {
    private readonly data = inject<{ email: string }>(MAT_DIALOG_DATA)
    private readonly destroyRef = inject(DestroyRef)
    private readonly auth = inject(AuthService)
    private readonly errorService = inject(ErrorService)
    private readonly notificationService = inject(NotificationService)
    readonly dialogRef = inject(MatDialogRef<UpdatePasswordDialogComponent>)
    visiblePassword$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
        false,
    )
    visibleNewPassword$: BehaviorSubject<boolean> =
        new BehaviorSubject<boolean>(false)
    loading$ = new BehaviorSubject<boolean>(false)
    visiblePassword = false
    visibleNewPassword = false
    form = new FormGroup({
        newPassword: new FormControl<string>('', {
            validators: [Validators.required, Validators.minLength(6)],
            nonNullable: true,
        }),
        password: new FormControl<string>('', {
            validators: [Validators.required, Validators.minLength(6)],
            nonNullable: true,
        }),
    })

    togglePasswordVisibility() {
        this.visiblePassword = !this.visiblePassword
        this.visiblePassword$.next(this.visiblePassword)
    }

    toggleNewPasswordVisibility() {
        this.visibleNewPassword = !this.visibleNewPassword
        this.visibleNewPassword$.next(this.visibleNewPassword)
    }

    onNoClick(): void {
        this.dialogRef.close()
    }

    submit() {
        if (this.form.valid) {
            const rawForm = this.form.getRawValue()
            this.loading$.next(true)
            this.auth
                .changePassword(
                    this.data.email,
                    rawForm.password,
                    rawForm.newPassword,
                )
                .pipe(takeUntilDestroyed(this.destroyRef))
                .subscribe({
                    next: () => {
                        this.notificationService.notify(
                            'Password Changed Successfully',
                        )
                        this.loading$.next(false)
                        this.dialogRef.close()
                    },
                    error: (err) => {
                        this.errorService.handleError(err)
                        this.loading$.next(false)
                        this.dialogRef.close()
                    },
                })
        }
    }
}
