import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { Router, RouterOutlet } from '@angular/router'
import { ActiveTabStore } from '../../../../core/stores/active-tab.store'
import { MatTabLink, MatTabNav, MatTabNavPanel } from '@angular/material/tabs'
import { AsyncPipe } from '@angular/common'
import { fadeInAnimation } from '../../../../app.animations'
import { ToolbarComponent } from '../../../components/toolbar/toolbar.component'

@Component({
    selector: 'app-tabs-navigation-page',
    standalone: true,
    imports: [
        MatTabNav,
        MatTabLink,
        MatTabNavPanel,
        RouterOutlet,
        AsyncPipe,
        ToolbarComponent,
    ],
    templateUrl: './tabs-navigation-page.component.html',
    styleUrl: './tabs-navigation-page.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [fadeInAnimation],
    providers: [ActiveTabStore],
})
export class TabsNavigationPageComponent {
    private readonly router = inject(Router)
    private readonly activeTabStore = inject(ActiveTabStore)

    activeTab = this.activeTabStore.name

    goTo(url: string, activeTab: string) {
        this.activeTabStore.setActiveTab(activeTab)
        return this.router.navigateByUrl(url)
    }
}
