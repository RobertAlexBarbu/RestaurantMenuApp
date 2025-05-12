import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { Router, RouterOutlet } from '@angular/router'
import { AsyncPipe, NgTemplateOutlet } from '@angular/common'
import { MatTabLink, MatTabNav, MatTabNavPanel } from '@angular/material/tabs'
import { fadeInAnimation, pageLoadAnimation, toolbarLoadAnimation } from '../../../app.animations'
import { MatToolbar } from '@angular/material/toolbar'
import { MatIcon } from '@angular/material/icon'
import { MatIconButton } from '@angular/material/button'
import { ToolbarComponent } from '../../../shared/components/toolbar/toolbar.component'
import { ActiveFeaturePipe } from '../../../shared/pipes/active-feature/active-feature.pipe'

@Component({
    selector: 'app-basic-feature',
    standalone: true,
    imports: [
        RouterOutlet,
        AsyncPipe,
        MatTabLink,
        MatTabNav,
        MatTabNavPanel,
        MatToolbar,
        MatIcon,
        MatIconButton,
        ToolbarComponent,
        NgTemplateOutlet,
        ActiveFeaturePipe,
    ],
    templateUrl: './basic-feature.component.html',
    styleUrl: './basic-feature.component.scss',
    animations: [fadeInAnimation, pageLoadAnimation, toolbarLoadAnimation],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicFeatureComponent {
    private readonly router = inject(Router)


    goTo(url: string) {
        return this.router.navigateByUrl(url)
    }
}
