import { ChangeDetectionStrategy, Component, inject } from '@angular/core'

import { fadeInAnimation, pageLoadAnimation } from '../../../../../app.animations'
import { ImageComponent } from '../../../../../shared/components/image/image.component'
import { CardComponent } from '../../../../../shared/components/card/card.component'

@Component({
    selector: 'app-tab-1-page',
    imports: [ImageComponent, CardComponent],
    templateUrl: './tab-1-page.component.html',
    styleUrl: './tab-1-page.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    animations: [fadeInAnimation, pageLoadAnimation],
})
export class Tab1PageComponent {


}
