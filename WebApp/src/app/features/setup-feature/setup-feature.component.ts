import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core'
import { MatStep, MatStepLabel, MatStepper, MatStepperNext, MatStepperPrevious } from '@angular/material/stepper'
import { MatButton } from '@angular/material/button'
import { CardComponent } from '../../shared/components/card/card.component'
import { UtilityService } from '../../core/services/utility/utility.service'
import { MatIcon } from '@angular/material/icon'
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatFormField, MatLabel } from '@angular/material/form-field'
import { MatInput } from '@angular/material/input'
import { AsyncPipe } from '@angular/common'
import { MatProgressSpinner } from '@angular/material/progress-spinner'
import { MatSlideToggle, MatSlideToggleChange } from '@angular/material/slide-toggle'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { UserService } from '../../core/http/services/user/user.service'
import { AppStore } from '../../core/stores/app.store'
import { MatListOption, MatSelectionList, MatSelectionListChange } from '@angular/material/list'
import { ThemeService } from '../../core/services/theme/theme.service'
import { zip } from 'rxjs'
import { Router } from '@angular/router'
import { ErrorService } from '../../core/services/error/error.service'

@Component({
    selector: 'app-setup-feature',
    imports: [
        MatStepper,
        MatStep,
        MatButton,
        MatStepperNext,
        MatStepperPrevious,
        MatStepLabel,
        CardComponent,
        MatIcon,
        FormsModule,
        MatFormField,
        MatInput,
        MatLabel,
        ReactiveFormsModule,
        AsyncPipe,
        MatProgressSpinner,
        MatSlideToggle,
        MatListOption,
        MatSelectionList,
    ],
    templateUrl: './setup-feature.component.html',
    styleUrl: './setup-feature.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
})
export class SetupFeatureComponent {
    private readonly utilityService = inject(UtilityService)
    private readonly userService = inject(UserService)
    private readonly appStore = inject(AppStore)
    private readonly themeService = inject(ThemeService)
    private readonly errorService = inject(ErrorService)
    private readonly destroyRef = inject(DestroyRef)
    private readonly router = inject(Router)
    isMobile = this.utilityService.isMobile()
    user = this.appStore.user
    emailNotifications = true
    theme = signal('')
    loadingGoToAppButton = signal(false)
    form = new FormGroup({
        firstName: new FormControl<string>('', {
            nonNullable: true,
        }),
        lastName: new FormControl<string>('',
            {
                nonNullable: true,
            },
        ),
        username: new FormControl<string>('',
            {
                nonNullable: true,
            }),
    })

    constructor() {
        if (this.themeService.isLightTheme()) {
            this.theme.set('light')
        } else {
            this.theme.set('dark')
        }
        this.form.controls.username.setValue(this.user.username())
    }

    setEmailNotifications(event: MatSlideToggleChange): void {
        this.emailNotifications = event.checked
    }

    changeTheme(event: MatSelectionListChange): void {
        if (event.options[0].value === 'light') {
            this.themeService.setLightTheme()
        } else {
            this.themeService.setDarkTheme()
        }
    }

    completeSetup() {
        this.loadingGoToAppButton.set(true)
        zip(this.userService.updateProfile(this.form.getRawValue()),
            this.userService.updateEmailNotifications({ emailNotifications: this.emailNotifications }),
            this.userService.updateSetupComplete({ setupComplete: true }),
        ).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
            next: () => {
                this.loadingGoToAppButton.set(false)
                this.appStore.updateSetupComplete({ setupComplete: true })
                this.appStore.updateProfile(this.form.getRawValue())
                this.appStore.updateEmailNotifications({ emailNotifications: this.emailNotifications })
                this.router.navigate([''])
            },
            error: err => {
                this.errorService.handleError(err)
                this.loadingGoToAppButton.set(false)
            },
        })

    }
}
