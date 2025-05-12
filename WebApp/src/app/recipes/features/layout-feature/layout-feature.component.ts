import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { ToolbarComponent } from '../../../shared/components/toolbar/toolbar.component'
import { Router, RouterOutlet } from '@angular/router'
import { fadeInAnimation, slideLeftToRightAnimation, slideRightToLeftAnimation } from '../../../app.animations'
import { LogoComponent } from '../../../shared/components/logo/logo.component'

import { MatButton, MatFabButton, MatIconButton, MatMiniFabButton } from '@angular/material/button'
import { MatIcon } from '@angular/material/icon'
import { AppStore } from '../../../core/stores/app.store'
import { MatTooltip } from '@angular/material/tooltip'
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu'
import { DividerComponent } from '../../../shared/components/divider/divider.component'
import { MatSuffix } from '@angular/material/form-field'
import {
    NavigationBarComponent,
} from '../../../features/main-feature/components/navigation-bar/navigation-bar.component'
import { MatListItem, MatListItemIcon, MatNavList } from '@angular/material/list'
import { MatLine } from '@angular/material/core'
import { NavigationSidebarComponent } from '../../../shared/components/navigation-sidebar/navigation-sidebar.component'
import { ActiveFeaturePipe } from '../../../shared/pipes/active-feature/active-feature.pipe'

@Component({
    selector: 'app-layout-feature',
    imports: [
        ToolbarComponent,
        RouterOutlet,
        LogoComponent,
        NavigationBarComponent,
        MatButton,
        MatIcon,
        MatIconButton,
        MatTooltip,
        MatMenu,
        MatMenuItem,
        MatMenuTrigger,
        DividerComponent,
        MatSuffix,
        MatListItem,
        MatNavList,
        MatLine,
        MatListItemIcon,
        NavigationSidebarComponent,
        MatMiniFabButton,
        MatFabButton,
        ActiveFeaturePipe,
    ],
    templateUrl: './layout-feature.component.html',
    styleUrl: './layout-feature.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    animations: [fadeInAnimation, slideLeftToRightAnimation, slideRightToLeftAnimation],
})
export class LayoutFeatureComponent {
    private readonly appStore = inject(AppStore)
    private readonly router = inject(Router)


    user = this.appStore.user


    goTo(path: string, featureName: string) {
        this.router.navigate([path])
    }
}
