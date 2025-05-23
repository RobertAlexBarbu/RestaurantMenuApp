import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
    selector: 'app-form-buttons',
    imports: [],
    templateUrl: './form-buttons.component.html',
    styleUrl: './form-buttons.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
})
export class FormButtonsComponent {
}
