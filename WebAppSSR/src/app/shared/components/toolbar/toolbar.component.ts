import {
    ChangeDetectionStrategy,
    Component,
    DestroyRef,
    HostBinding,
    inject,
    input,
    ViewContainerRef,
} from '@angular/core'
import {
    NavigationDialogComponent,
} from '../../../features/main-feature/components/navigation-dialog/navigation-dialog.component'

import {ActivatedRoute, Router} from '@angular/router'
import { ScrollService } from '../../../core/services/scroll/scroll.service'
import { MatDialog } from '@angular/material/dialog'

import { MatToolbar } from '@angular/material/toolbar'
import { MatIcon } from '@angular/material/icon'
import { MatButton, MatIconButton } from '@angular/material/button'
import { fadeInAnimation, pageLoadAnimation, toolbarLoadAnimation } from '../../../app.animations'
import { sidebarDialogConfig } from '../../configs/dialogs.config'

@Component({
    selector: 'app-toolbar',
    imports: [MatToolbar, MatIcon, MatIconButton, MatButton],
    templateUrl: './toolbar.component.html',
    styleUrl: './toolbar.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    animations: [fadeInAnimation, toolbarLoadAnimation, pageLoadAnimation],
})
export class ToolbarComponent {
    private readonly router = inject(Router)
    private readonly destroyRef = inject(DestroyRef)
    private readonly drawerContentService = inject(ScrollService)
    private readonly dialog = inject(MatDialog)
    private readonly route = inject(ActivatedRoute)
    routeUrl = '/' + this.route.snapshot.url.join('/')
    private readonly viewContainerRef = inject(ViewContainerRef)
    
    constructor(){
        this.route.url.subscribe(routeUrl => {
            
        })
        console.log('toolbar', this.routeUrl);
    }
    
    featureName = input<string>()
    subfeatureName = input<string>()
    navigationVisible = input(false)

    @HostBinding('class') hostClass = 'sidebar-content';

    
    openNavigationDialog() {
        // let routeUrl = '/' + this.route.snapshot.url.join('/')
        document.querySelectorAll('.sidebar-content').forEach(el => el.classList.remove('sidebar-close'));
        document.querySelectorAll('.sidebar-content').forEach(el => el.classList.add('sidebar-open'));
        console.log('aaaa', this.routeUrl);
        this.dialog.open(NavigationDialogComponent, {

            ...sidebarDialogConfig,
            data: {
                routeUrl: this.routeUrl,
            },
            viewContainerRef: this.viewContainerRef,
        })
    }
}
