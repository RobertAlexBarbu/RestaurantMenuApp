import { ChangeDetectionStrategy, Component } from '@angular/core'
import { MatIcon } from '@angular/material/icon'

@Component({
    selector: 'app-info-text',
    imports: [MatIcon],
    standalone: true,
    templateUrl: './info-text.component.html',
    styleUrl: './info-text.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfoTextComponent {
}
