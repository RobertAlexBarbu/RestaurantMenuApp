import { ChangeDetectionStrategy, Component, input } from '@angular/core'
import { MatButton } from '@angular/material/button'
import { MatIcon } from '@angular/material/icon'
import { MatLine } from '@angular/material/core'
import { MatListItem, MatNavList } from '@angular/material/list'
import { slideLeftToRightAnimation } from '../../../app.animations'

@Component({
    selector: 'app-navigation-sidebar',
    imports: [
        MatButton,
        MatIcon,
        MatLine,
        MatListItem,
        MatNavList,
    ],
    templateUrl: './navigation-sidebar.component.html',
    styleUrl: './navigation-sidebar.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    animations: [slideLeftToRightAnimation],
})
export class NavigationSidebarComponent {
    name = input.required<string>()
}
