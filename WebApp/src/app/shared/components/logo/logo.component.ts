import { ChangeDetectionStrategy, Component, Input } from '@angular/core'

@Component({
    selector: 'app-logo',
    standalone: true,
    imports: [],
    templateUrl: './logo.component.html',
    styleUrl: './logo.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LogoComponent {
    widthPx = '24px'
    heightPx = '24px'

    @Input()
    set width(value: number) {
        this.widthPx = value + 'px'
    }

    @Input()
    set heigth(value: number) {
        this.heightPx = value + 'px'
    }

    @Input()
    set size(value: number) {
        this.widthPx = value + 'px'
        this.heightPx = value + 'px'
    }
}
