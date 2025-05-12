import { ChangeDetectionStrategy, Component, inject } from '@angular/core'

import { AsyncPipe, NgTemplateOutlet } from '@angular/common'
import { MatTabLink, MatTabNav, MatTabNavPanel } from '@angular/material/tabs'
import { Router, RouterOutlet } from '@angular/router'

import { MatFormField, MatLabel } from '@angular/material/form-field'
import { MatOption, MatSelect } from '@angular/material/select'
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu'
import { MatButton, MatIconButton } from '@angular/material/button'
import { MatIcon } from '@angular/material/icon'
import { MatToolbar } from '@angular/material/toolbar'
import { ToolbarComponent } from '../../shared/components/toolbar/toolbar.component'
import { fadeInAnimation } from '../../app.animations'
import { AuthService } from '../../core/services/auth/auth.service'
import { MatListItem, MatNavList } from '@angular/material/list'
import { NavigationSidebarComponent } from '../../shared/components/navigation-sidebar/navigation-sidebar.component'
import { MatLine } from '@angular/material/core'
import { ActiveFeaturePipe } from '../../shared/pipes/active-feature/active-feature.pipe'

@Component({
    selector: 'app-settings-feature',
    standalone: true,
    imports: [
        AsyncPipe,
        MatTabLink,
        MatTabNav,
        MatTabNavPanel,
        RouterOutlet,
        ToolbarComponent,
        MatFormField,
        MatSelect,
        MatOption,
        MatLabel,
        MatMenuTrigger,
        MatButton,
        MatMenu,
        MatMenuItem,
        MatIcon,
        MatToolbar,
        MatIconButton,
        MatNavList,
        NavigationSidebarComponent,
        MatListItem,
        MatLine,
        NgTemplateOutlet,
        ActiveFeaturePipe,
    ],
    templateUrl: './settings-feature.component.html',
    styleUrl: './settings-feature.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [fadeInAnimation],

})
export class SettingsFeatureComponent {
    private readonly router = inject(Router)
    private readonly auth = inject(AuthService)


    goTo(url: string) {
        return this.router.navigateByUrl(url)
    }

    logout() {
        this.auth.logOut()
        return this.router.navigate(['/auth/login'])
    }
}
