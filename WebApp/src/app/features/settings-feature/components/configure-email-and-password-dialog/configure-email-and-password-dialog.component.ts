import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core'
import { MatButton, MatIconButton } from '@angular/material/button'
import { MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog'
import { AsyncPipe } from '@angular/common'
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'
import { MatError, MatFormField, MatLabel, MatSuffix } from '@angular/material/form-field'
import { MatIcon } from '@angular/material/icon'
import { MatInput } from '@angular/material/input'

import { BehaviorSubject } from 'rxjs'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { AuthService } from '../../../../core/services/auth/auth.service'
import { ErrorService } from '../../../../core/services/error/error.service'
import { NotificationService } from '../../../../core/services/notification/notification.service'
import { emailValidator } from '../../../../shared/validators/emailValidator'

@Component({
    selector: 'app-configure-email-and-password-dialog',
    standalone: true,
    imports: [
        MatButton,
        MatDialogActions,
        MatDialogContent,
        MatDialogTitle,
        AsyncPipe,
        FormsModule,
        MatError,
        MatFormField,
        MatIcon,
        MatIconButton,
        MatInput,
        MatLabel,
        MatSuffix,
        ReactiveFormsModule,
    ],
    templateUrl: './configure-email-and-password-dialog.component.html',
    styleUrl: './configure-email-and-password-dialog.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfigureEmailAndPasswordDialogComponent {
    private readonly destroyRef = inject(DestroyRef)
    private readonly auth = inject(AuthService)
    private readonly errorService = inject(ErrorService)
    private readonly notificationService = inject(NotificationService)
    readonly dialogRef = inject(
        MatDialogRef<ConfigureEmailAndPasswordDialogComponent>,
    )
    visiblePassword$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
        false,
    )
    loading$ = new BehaviorSubject<boolean>(false)
    visiblePassword = false
    form = new FormGroup({
        email: new FormControl<string>('', {
            validators: [Validators.required, emailValidator],
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

    onNoClick(): void {
        this.dialogRef.close()
    }

    submit() {
        if (this.form.valid) {
            const rawForm = this.form.getRawValue()
            this.loading$.next(true)
            this.auth
                .configureEmailAndPassword(rawForm.email, rawForm.password)
                .pipe(takeUntilDestroyed(this.destroyRef))
                .subscribe({
                    next: () => {
                        this.notificationService.notify(
                            'Email & Password configured successfully.',
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
        } else {
            this.form.markAllAsTouched()
            return
        }
    }
}
