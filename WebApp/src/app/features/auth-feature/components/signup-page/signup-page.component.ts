import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core'
import { AuthService } from '../../../../core/services/auth/auth.service'
import { ErrorService } from '../../../../core/services/error/error.service'
import { AppStore } from '../../../../core/stores/app.store'
import { Router, RouterLink } from '@angular/router'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { DividerComponent } from '../../../../shared/components/divider/divider.component'
import { OrDividerComponent } from '../../../../shared/components/or-divider/or-divider.component'
import { AsyncPipe } from '@angular/common'
import { MatButton, MatIconButton } from '@angular/material/button'
import { MatIcon } from '@angular/material/icon'
import { MatError, MatFormField, MatLabel, MatSuffix } from '@angular/material/form-field'
import { MatInput } from '@angular/material/input'
import { emailValidator } from '../../../../shared/validators/emailValidator'
import { EnvironmentService } from '../../../../core/services/environment/environment.service'
import { LogoComponent } from '../../../../shared/components/logo/logo.component'
import { AppData } from '../../../../shared/configs/AppData'

@Component({
    selector: 'app-signup-page',
    standalone: true,
    imports: [
        DividerComponent,
        RouterLink,
        OrDividerComponent,
        AsyncPipe,
        MatButton,
        MatIcon,
        MatError,
        MatIconButton,
        MatSuffix,
        MatLabel,
        MatFormField,
        ReactiveFormsModule,
        MatInput,
        LogoComponent,
    ],
    templateUrl: './signup-page.component.html',
    styleUrl: './signup-page.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignupPageComponent {
    private readonly authService = inject(AuthService)
    private readonly errorService = inject(ErrorService)
    private readonly appStore = inject(AppStore)
    private readonly environmentService = inject(EnvironmentService)
    private readonly router = inject(Router)
    private readonly destroyRef = inject(DestroyRef)
    protected readonly AppData = AppData
    visiblePassword = signal(false)
    disabled = signal(false)
    googleDisabled = signal(false)
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
        this.visiblePassword.update((value) => !value)
    }

    submit() {
        if (this.form.invalid) {
            return
        }
        this.disabled.set(true)
        const rawForm = this.form.getRawValue()
        this.authService
            .signupWithEmail(rawForm.email, rawForm.password)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
                next: (userDto) => {
                    this.disabled.set(false)
                    this.appStore.logIn(userDto)
                    this.router.navigateByUrl('/private/main')
                },
                error: (error) => {
                    this.disabled.set(false)
                    this.errorService.handleError(error)
                },
            })
    }

    signUpWithGoogle() {
        if (this.environmentService.getRedirectAuth()) {
            this.authService.loginWithGoogleRedirect()
            return
        }
        this.authService
            .signupWithGoogle()
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
                next: (userDto) => {
                    this.appStore.logIn(userDto)
                    this.router.navigateByUrl('/private/main')
                },
                error: (error) => {
                    this.errorService.handleError(error)
                },
            })
    }
}
