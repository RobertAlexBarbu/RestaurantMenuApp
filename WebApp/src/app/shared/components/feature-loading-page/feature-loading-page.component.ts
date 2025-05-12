import { ChangeDetectionStrategy, Component } from '@angular/core'
import { MatProgressSpinner } from '@angular/material/progress-spinner'

@Component({
    selector: 'app-feature-loading-page',
    imports: [MatProgressSpinner],
    templateUrl: './feature-loading-page.component.html',
    styleUrl: './feature-loading-page.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
})
export class FeatureLoadingPageComponent {
}
