import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
    selector: 'app-form-error-placeholder',
    standalone: true,
    imports: [],
    templateUrl: './form-error-placeholder.component.html',
    styleUrl: './form-error-placeholder.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormErrorPlaceholderComponent {
}
