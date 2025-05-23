import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
    selector: 'app-or-divider',
    standalone: true,
    imports: [],
    templateUrl: './or-divider.component.html',
    styleUrl: './or-divider.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrDividerComponent {
}
