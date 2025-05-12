import { ChangeDetectionStrategy, Component } from '@angular/core'
import { ToolbarComponent } from '../../../shared/components/toolbar/toolbar.component'

@Component({
    selector: 'app-admin-feature',
    standalone: true,
    imports: [ToolbarComponent],
    templateUrl: './admin-feature.component.html',
    styleUrl: './admin-feature.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminFeatureComponent {
}
