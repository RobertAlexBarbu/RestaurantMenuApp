import { ChangeDetectionStrategy, Component } from '@angular/core'

import { ToolbarComponent } from '../../../../shared/components/toolbar/toolbar.component'
import { pageLoadAnimation } from '../../../../app.animations'

@Component({
    selector: 'app-home-page',
    standalone: true,
    imports: [ToolbarComponent],
    templateUrl: './home-page.component.html',
    styleUrl: './home-page.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [pageLoadAnimation],
})
export class HomePageComponent {

}
