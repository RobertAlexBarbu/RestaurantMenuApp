import { ChangeDetectionStrategy, Component } from '@angular/core'
import { MatRipple } from '@angular/material/core'
import { MatIcon } from '@angular/material/icon'

@Component({
    selector: 'app-scroll-navigation-button',
    imports: [
        MatRipple,
        MatIcon,
    ],
    templateUrl: './scroll-navigation-button.component.html',
    styleUrl: './scroll-navigation-button.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
})
export class ScrollNavigationButtonComponent {

}
