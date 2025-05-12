import { ChangeDetectionStrategy, Component } from '@angular/core'

import { fadeInAnimation, pageLoadAnimation } from '../../../../../app.animations'
import { CardComponent } from '../../../../../shared/components/card/card.component'

@Component({
    selector: 'app-tab-2-page',
    imports: [CardComponent],
    templateUrl: './tab-2-page.component.html',
    styleUrl: './tab-2-page.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    animations: [fadeInAnimation, pageLoadAnimation],
})
export class Tab2PageComponent {

}
