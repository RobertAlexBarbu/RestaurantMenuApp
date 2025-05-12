import { ChangeDetectionStrategy, Component, input } from '@angular/core'
import { MatIcon } from '@angular/material/icon'
import { MatRipple } from '@angular/material/core'

@Component({
    selector: 'app-icon-button',
    imports: [
        MatIcon,
        MatRipple,
    ],
    templateUrl: './icon-button.component.html',
    styleUrl: './icon-button.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
})
export class IconButtonComponent {
    icon = input.required<string>()
    label = input.required<string>()

}
