import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
    selector: 'app-divider',
    standalone: true,
    imports: [],
    templateUrl: './divider.component.html',
    styleUrl: './divider.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DividerComponent {
}
