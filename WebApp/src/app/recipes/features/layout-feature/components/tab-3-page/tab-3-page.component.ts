import { ChangeDetectionStrategy, Component } from '@angular/core'

import { fadeInAnimation, pageLoadAnimation } from '../../../../../app.animations'
import { CardComponent } from '../../../../../shared/components/card/card.component'

@Component({
    selector: 'app-tab-3-page',
    imports: [CardComponent],
    templateUrl: './tab-3-page.component.html',
    styleUrl: './tab-3-page.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    animations: [fadeInAnimation, pageLoadAnimation],
})
export class Tab3PageComponent {
}
