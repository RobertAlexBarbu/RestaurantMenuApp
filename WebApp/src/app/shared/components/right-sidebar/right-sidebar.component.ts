import { ChangeDetectionStrategy, Component } from '@angular/core'
import { slideRightToLeftAnimation } from '../../../app.animations'

@Component({
    selector: 'app-right-sidebar',
    imports: [],
    templateUrl: './right-sidebar.component.html',
    styleUrl: './right-sidebar.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    animations: [slideRightToLeftAnimation],
})
export class RightSidebarComponent {

}
