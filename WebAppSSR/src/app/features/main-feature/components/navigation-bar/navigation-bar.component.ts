import { ChangeDetectionStrategy, Component, inject, input, output } from '@angular/core'
import { Roles } from '../../../../shared/configs/Roles'
import { MatIcon } from '@angular/material/icon'
import { MatButton, MatIconButton } from '@angular/material/button'
import {ActivatedRoute, Router} from '@angular/router'
import { ActiveFeatureStore } from '../../../../core/stores/active-feature.store'
import { AsyncPipe, NgIf } from '@angular/common'
import { IsRolePipe } from '../../../../shared/pipes/is-role/is-role.pipe'
import { MatList, MatListItem, MatNavList } from '@angular/material/list'
import { MatRipple } from '@angular/material/core'
import { IconButtonComponent } from '../../../../shared/components/icon-button/icon-button.component'
import { ActiveFeaturePipe } from '../../../../shared/pipes/active-feature/active-feature.pipe'

@Component({
    selector: 'app-navigation-bar',
    standalone: true,
    imports: [MatIcon, MatButton, AsyncPipe, IsRolePipe, MatListItem, MatList, MatNavList, MatIconButton, MatRipple, IconButtonComponent, NgIf, ActiveFeaturePipe],
    templateUrl: './navigation-bar.component.html',
    styleUrl: './navigation-bar.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationBarComponent {

    private readonly activeFeatureStore = inject(ActiveFeatureStore)
    private readonly router = inject(Router)
    protected readonly Roles = Roles
    appearance = input('drawer')
    private readonly route = inject(ActivatedRoute)
    readonly navigate = output<boolean>()
    routeUrl = '/' + this.route.snapshot.url.join('/')
    features = this.activeFeatureStore.features
    
    constructor() {
        console.log('sidebar', this.routeUrl);
    }

    goTo(path: string) {
        console.log('bbbb', this.route.snapshot.url)
        this.router.navigate([path]).then(() => {
            this.navigate.emit(true)
        })
    }


}
