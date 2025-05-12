import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { CardComponent } from '../../../../shared/components/card/card.component'
import { fadeInAnimation, pageLoadAnimation } from '../../../../app.animations'

import { ToolbarComponent } from '../../../../shared/components/toolbar/toolbar.component'


@Component({
    selector: 'app-billing-page',
    standalone: true,
    imports: [
        CardComponent,
        ToolbarComponent,
    ],
    templateUrl: './billing-settings-page.component.html',
    styleUrl: './billing-settings-page.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [fadeInAnimation, pageLoadAnimation],
})
export class BillingSettingsPageComponent {

}
