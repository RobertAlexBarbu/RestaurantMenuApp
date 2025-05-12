import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core'

import { BehaviorSubject } from 'rxjs'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'

import { MatSlideToggle, MatSlideToggleChange } from '@angular/material/slide-toggle'
import { MatListOption, MatSelectionList, MatSelectionListChange } from '@angular/material/list'
import { AsyncPipe } from '@angular/common'

import { MatButton } from '@angular/material/button'
import { MatFormField, MatLabel } from '@angular/material/form-field'
import { MatIcon } from '@angular/material/icon'
import { MatInput } from '@angular/material/input'
import { MatProgressSpinner } from '@angular/material/progress-spinner'
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { CardComponent } from '../../../../shared/components/card/card.component'
import { fadeInAnimation, pageLoadAnimation } from '../../../../app.animations'
import { AppStore } from '../../../../core/stores/app.store'
import { UserService } from '../../../../core/http/services/user/user.service'
import { NotificationService } from '../../../../core/services/notification/notification.service'
import { ErrorService } from '../../../../core/services/error/error.service'
import { ThemeService } from '../../../../core/services/theme/theme.service'
import { ToolbarComponent } from '../../../../shared/components/toolbar/toolbar.component'


@Component({
    selector: 'app-preferences-page',
    imports: [
        AsyncPipe,
        CardComponent,
        MatButton,
        MatFormField,
        MatIcon,
        MatInput,
        MatLabel,
        MatListOption,
        MatProgressSpinner,
        MatSelectionList,
        MatSlideToggle,
        ReactiveFormsModule,
        ToolbarComponent,
    ],
    templateUrl: './preferences-page.component.html',
    styleUrl: './preferences-page.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    animations: [fadeInAnimation, pageLoadAnimation],
})
export class PreferencesPageComponent {
    private readonly appStore = inject(AppStore)
    private readonly userService = inject(UserService)
    private readonly destroyRef = inject(DestroyRef)
    private readonly notificationService = inject(NotificationService)
    private readonly errorService = inject(ErrorService)
    private readonly themeService = inject(ThemeService)
    disabledSave = signal(true)
    updateProfileLoading = signal(false)
    user = this.appStore.user
    theme$ = new BehaviorSubject('')
    loadingSlider$ = new BehaviorSubject<boolean>(false)
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
        this.form.setValue({
            firstName: this.user.firstName(),
            lastName: this.user.lastName(),
            username: this.user.username(),
        })
        if (this.themeService.isLightTheme()) {
            this.theme$.next('light')
        } else {
            this.theme$.next('dark')
        }
    }

    updateProfile() {
        this.updateProfileLoading.set(true)
        this.userService.updateProfile(this.form.getRawValue())
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
                next: () => {
                    this.appStore.updateProfile(this.form.getRawValue())
                    this.updateProfileLoading.set(false)
                    this.disabledSave.set(true)
                    this.notificationService.notify('Profile Updated Successfully.')
                },
            })
    }

    enableUpdateProfileSave() {
        this.disabledSave.set(false)
    }

    setEmailNotifications(event: MatSlideToggleChange): void {
        this.loadingSlider$.next(true)
        this.userService
            .updateEmailNotifications({
                emailNotifications: event.checked,
            })
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
                next: () => {
                    this.appStore.updateEmailNotifications({ emailNotifications: event.checked })
                    this.notificationService.notify(
                        'Notification Preferences Updated Successfully.',
                    )
                    this.loadingSlider$.next(false)
                },
                error: (err) => {
                    this.errorService.handleError(err)
                    this.loadingSlider$.next(false)
                },
            })
    }

    changeTheme(event: MatSelectionListChange): void {
        if (event.options[0].value === 'light') {
            this.themeService.setLightTheme()
        } else {
            this.themeService.setDarkTheme()
        }
    }

}
