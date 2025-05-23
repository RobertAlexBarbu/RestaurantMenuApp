import { ChangeDetectionStrategy, Component, input } from '@angular/core'

@Component({
    selector: 'app-form-section',
    imports: [],
    templateUrl: './form-section.component.html',
    styleUrl: './form-section.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
})
export class FormSectionComponent {
    title = input.required<string>()
}
