import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { MatTabLink, MatTabNav, MatTabNavPanel } from '@angular/material/tabs'
import { Router, RouterOutlet } from '@angular/router'

import { fadeInAnimation } from '../../../../../app.animations'
import { MatButton, MatIconButton } from '@angular/material/button'
import { MatIcon } from '@angular/material/icon'
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu'
import { RepositionOverlayComponent } from '../../../../components/reposition-overlay/reposition-overlay.component'
import { NgTemplateOutlet } from '@angular/common'
import { ToolbarComponent } from '../../../../../shared/components/toolbar/toolbar.component'
import { ActiveFeaturePipe } from '../../../../../shared/pipes/active-feature/active-feature.pipe'

@Component({
    selector: 'app-tabs-page',
    imports: [
        MatTabLink,
        MatTabNav,
        MatTabNavPanel,
        RouterOutlet,
        MatButton,
        MatIcon,
        MatIconButton,
        MatMenu,
        MatMenuItem,
        MatMenuTrigger,
        RepositionOverlayComponent,
        NgTemplateOutlet,
        ToolbarComponent,
        ActiveFeaturePipe,
    ],
    templateUrl: './tabs-page.component.html',
    styleUrl: './tabs-page.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    animations: [fadeInAnimation],
})
export class TabsPageComponent {
    private readonly router = inject(Router)


    goTo(url: string) {

        return this.router.navigateByUrl(url)
    }
}
