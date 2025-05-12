import { ChangeDetectionStrategy, Component, input, ViewEncapsulation } from '@angular/core'

@Component({
    selector: 'app-card',
    imports: [],
    templateUrl: './card.component.html',
    styleUrl: './card.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    standalone: true,
})
export class CardComponent {
    title = input.required<string>()
    titleCard = input<boolean>(false)
    mobile = input<boolean>(true)
    desktop = input<boolean>(true)
    titleBorder = input<boolean>(false)
    appearance = input<string>('stroked')
    customHeight = input<boolean>(false)
}
